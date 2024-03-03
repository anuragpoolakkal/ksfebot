import axios from "axios";
import { OpenAI } from "openai";
import { Translate } from "@google-cloud/translate/build/src/v2/index.js";
import "dotenv/config";
import {
    faqListMalayalam,
    faqListMlOptions,
    faqMalayalam,
    showProductList,
    showMenu,
} from "../constants/malayalam.js";

import {
    basePrompt,
    showChangeLanguageMenu,
    sendText,
    sendButton,
} from "../constants/english.js";

import { handleRequestCall } from "./handleRequestCall.js";

const history = new Map();
const callbackReq = new Map();

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

const translate = new Translate({
    credentials: CREDENTIALS,
    projectId: CREDENTIALS.projectId,
});

const detectLanguage = async (text) => {
    try {
        let response = await translate.detect(text);
        return response[0].language;
    } catch (error) {
        console.error(error);
        return 0;
    }
};

const translateText = async (text, targetLanguage) => {
    try {
        let [response] = await translate.translate(text, targetLanguage);
        return response;
    } catch (error) {
        console.error(error);
        return 0;
    }
};

export const handleMalayalam = async (msg, access_token, phone_no_id, from) => {
    const askAI = async (prompt, conversation, lastUserMsg, lastAIMsg) => {
        var promptLang = await detectLanguage(prompt);

        if (promptLang == "ml") {
            var promptInEn = await translateText(prompt, "en");
        } else {
            var promptInEn = prompt;
        }

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
            dangerouslyAllowBrowser: true,
        });

        const completion = await openai.chat.completions.create({
            model: process.env.MODEL,
            messages: [
                { role: "system", content: basePrompt },
                { role: "user", content: conversation },
                { role: "user", content: lastUserMsg },
                { role: "assistant", content: lastAIMsg },
                { role: "user", content: promptInEn },
            ],
        });

        var gptReply = completion.choices[0].message.content;

        if (promptLang == "ml") {
            var reply = await translateText(gptReply, "ml");
        } else {
            var reply = gptReply;
        }

        return reply;
    };

    if (
        msg?.interactive?.button_reply?.id === "request_call" ||
        callbackReq.set(from, true)
    ) {
        let status = await handleRequestCall(
            msg,
            access_token,
            phone_no_id,
            from,
            "താങ്കളുടെ പേര് എന്താണ്?",
            "താങ്കളുടെ ഇമെയിൽ വിലാസം എന്താണ്?",
            "താങ്കളുടെ ജില്ല ഏതാണ്?"
        );

        if (status === "SUCCESS") {
            await sendText(
                phone_no_id,
                access_token,
                from,
                "കോൾ അഭ്യർഥന വിജയകരമായി പൂർത്തീകരിച്ചു."
            );
            callbackReq.set(from, false);
            await showMenu(phone_no_id, access_token, from);
            return;
        } else if (status === "FAIL") {
            await sendText(
                phone_no_id,
                access_token,
                from,
                "കോൾ അഭ്യർഥന പരാജയപ്പെട്ടു!"
            );
            callbackReq.set(from, false);
            await showMenu(phone_no_id, access_token, from);
            return;
        }
    }

    if (callbackReq.get(from) !== true && msg?.type === "text") {
        // Bot commands
        if (msg?.text?.body === "/menu") {
            await showMenu(phone_no_id, access_token, from);
        } else if (msg?.text?.body === "/products") {
            await showProductList(phone_no_id, access_token, from);
        } else if (msg?.text?.body === "/language") {
            await showChangeLanguageMenu(phone_no_id, access_token, from);

            // AI reply
        } else {
            // If a user is sending message for first time (if his history is empty), initialize an array to store chat history of the user
            if (history.get(from) == null) {
                history.set(from, []);
            }

            // Fetch the chat history array of user and store it a temporary chatHistory array
            const chatHistory = await history.get(from);

            // Fetch last conversation between user and AI
            const lastAIMsg = chatHistory?.length ? chatHistory?.pop() : "";
            const lastUserMsg = chatHistory?.length ? chatHistory?.pop() : "";

            // Pass previous conversation and last conversation seperately to AI
            const answer = await askAI(
                msg?.text?.body,
                chatHistory.toString(),
                lastUserMsg,
                lastAIMsg
            );

            // Store last conversation back to chat history
            await chatHistory.push(lastUserMsg);
            await chatHistory.push(lastAIMsg);

            // Store current user message to chat history
            await chatHistory.push(msg?.text.body);

            // Store current assistant response to chat history
            await chatHistory.push(answer);

            // Store temporary array chatHistory to the history Map
            history.set(from, chatHistory);

            // If chat history is more than 10 messages long, remove old message
            if (chatHistory.length > 10) await chatHistory.shift();

            await sendText(phone_no_id, access_token, from, answer);
        }
    }

    if (msg?.interactive?.button_reply?.id === "malayalam") {
        await sendButton(
            phone_no_id,
            access_token,
            from,
            "ഞാൻ നിങ്ങളെ എങ്ങനെയാണ് സഹായിക്കേണ്ടത്?\n\n\n_പ്രധാനപ്പെട്ട ബോട് കമാൻഡുകൾ:_\n_*/menu* മെനു ലഭിക്കുന്നതിന്_\n_*/products* സേവനങ്ങളുടെ വിവരങ്ങൾക്ക്_\n_*/language* ഭാഷ മാറ്റുന്നതിന്_",
            "faq",
            "ചോദ്യങ്ങൾ",
            "branch_locator",
            "ബ്രാഞ്ച് ലൊക്കേറ്റർ",
            "contact",
            "ഞങ്ങളെ ബന്ധപ്പെടുക"
        );

        await sendButton(
            phone_no_id,
            access_token,
            from,
            "ㅤㅤㅤ",
            "request_call",
            "കോൾ അഭ്യർഥിക്കുക",
            "products",
            "സേവനങ്ങൾ",
            "pravasi_chitty",
            "പ്രവാസി ചിട്ടി"
        );

        await axios({
            method: "POST",
            url:
                "https://graph.facebook.com/v13.0/" +
                phone_no_id +
                "/messages?access_token=" +
                access_token,
            data: {
                messaging_product: "whatsapp",
                to: from,
                type: "interactive",
                interactive: {
                    type: "button",
                    body: {
                        text: "ㅤㅤㅤ",
                    },
                    action: {
                        buttons: [
                            {
                                type: "reply",
                                reply: {
                                    id: "about_ksfe",
                                    title: "കെഎസ്എഫ്ഇയെ അറിയുക",
                                },
                            },
                            {
                                type: "reply",
                                reply: {
                                    id: "change_language",
                                    title: "ഭാഷ മാറ്റുക",
                                },
                            },
                        ],
                    },
                },
            },

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
            },
        });

        await sendText(
            phone_no_id,
            access_token,
            from,
            "മെനുവിൽ നിന്ന് ഒരു ഓപ്ഷൻ തിരഞ്ഞെടുക്കുക അല്ലെങ്കിൽ എന്നോട് ഒരു ചോദ്യം ചോദിക്കുക."
        );
    }

    //------------------FAQ------------------
    else if (msg?.interactive?.button_reply?.id === "faq") {
        await sendText(phone_no_id, access_token, from, faqMalayalam);

        await axios({
            method: "POST",
            url:
                "https://graph.facebook.com/v13.0/" +
                phone_no_id +
                "/messages?access_token=" +
                access_token,
            data: {
                messaging_product: "whatsapp",
                to: from,
                type: "interactive",
                interactive: {
                    type: "list",
                    header: {
                        text: "നിങ്ങളുടെ ചോദ്യം തിരഞ്ഞെടുക്കുക",
                    },
                    body: {
                        text: "ചോദ്യം തിരഞ്ഞെടുക്കുക",
                    },
                    // footer: {
                    //     text: "<FOOTER_TEXT>",
                    // },
                    action: {
                        button: "ചോദ്യങ്ങൾ ",
                        sections: [
                            {
                                rows: faqListMlOptions,
                            },
                        ],
                    },
                },
            },

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
            },
        });
    }

    // ------------------Contact us------------------
    else if (msg?.interactive?.button_reply?.id === "contact") {
        await sendText(
            phone_no_id,
            access_token,
            from,
            "*Registered Office*\nThe Kerala State Financial Enterprises Ltd.\n“bhadratha”, Museum Road,\nP.b. No.510,Thrissur – 680 020\nPhone No: 0487 2332255\nToll Free No: 1800 425 3455\nFax: 0487 – 2336232\nE-Mail : mail@ksfe.com\n\nനിങ്ങളുടെ ചോദ്യങ്ങൾ ചോദിക്കുന്നതിന്, സന്ദർശിക്കുക https://ksfe.com/contact-us"
        );
    }

    // ------------------Branch Locator------------------
    else if (msg?.interactive?.button_reply?.id === "branch_locator") {
        await sendText(
            phone_no_id,
            access_token,
            from,
            "നിങ്ങളുടെ ഏറ്റവും അടുത്തുള്ള ശാഖ കണ്ടെത്തുക\n\nhttps://ksfe.com/branch-locator"
        );
    }

    //---------------------- Products and Services catalogue ----------------------
    if (msg?.interactive?.button_reply?.id === "products") {
        await showProductList(phone_no_id, access_token, from);

        await showMenu(phone_no_id, access_token, from);
    }

    //---------------------- About KSFE ----------------------
    if (msg?.interactive?.button_reply?.id === "about_ksfe") {
        await sendText(
            phone_no_id,
            access_token,
            from,
            "*KSFE* എന്നറിയപ്പെടുന്ന കേരള സ്റ്റേറ്റ് ഫിനാൻഷ്യൽ എൻ്റർപ്രൈസസ് ലിമിറ്റഡ്.\nKSFE 1969 നവംബർ 6-ന് തൃശ്ശൂർ ആസ്ഥാനമാക്കി, ₹2 ലക്ഷം, 45 ജോലിക്കാർ, 10 ശാഖകൾ എന്നിവയുടെ മൂലധനവുമായി അതിൻ്റെ പ്രവർത്തനം ആരംഭിച്ചു.\n\n*₹100 കോടി രൂപ. * പണമടച്ച മൂലധനം\n*8300+* ജീവനക്കാർ\n*50 കുറവുകൾ+* ഉപഭോക്താക്കൾ\n*670+* ശാഖകൾ\n*73000 കോടി+* മൂലധനം\n\n*KSFE ഒറ്റനോട്ടത്തിൽ*\nKSFE ഒരു വിവിധ നോൺ-ബാങ്കിംഗ് ആണ് കമ്പനി, പൂർണമായും കേരള സർക്കാരിൻ്റെ ഉടമസ്ഥതയിലുള്ളതാണ്.\n\nസംസ്ഥാനത്തെ ഏറ്റവും ലാഭകരമായ പൊതുമേഖലാ സ്ഥാപനങ്ങളിലൊന്നാണ് KSFE.\n\nപൊതുജനങ്ങൾക്ക് ഒരു ബദൽ നൽകുകയെന്ന ലക്ഷ്യത്തോടെ കേരള സർക്കാർ രൂപീകരിച്ചത് സ്വകാര്യ ചിട്ടി പ്രമോട്ടർമാർ ചിട്ടി ഫണ്ട് ബിസിനസിന്മേൽ സാമൂഹിക നിയന്ത്രണം കൊണ്ടുവരുന്നതിനായി, പൊതുജനങ്ങളെ അശാസ്ത്രീയമായ പറക്കുന്ന ചിട്ടി ഫണ്ട് ഓപ്പറേറ്റർമാരുടെ പിടിയിൽ നിന്ന് രക്ഷിക്കാൻ.\n\nKSFE എല്ലാ വർഷവും ശ്രദ്ധേയമായ ലാഭം രേഖപ്പെടുത്തുന്നു. അതിൻ്റെ തുടക്കം മുതൽ പരാജയപ്പെടുന്നു.\n\nKSFE ഓരോ വർഷവും കേരള സർക്കാരിന് കോടിക്കണക്കിന് രൂപ ഇപ്രകാരം നൽകുന്നു:\n- ഗ്യാരൻ്റി കമ്മീഷൻ\n- സർവീസ് ചാർജുകൾ\n- ലാഭവിഹിതം\n\nകൂടുതൽ വിവരങ്ങൾ: https://ksfe. com/about-us/"
        );

        await showMenu(phone_no_id, access_token, from);
    }

    // ---------------------- Pravasi Chitty ----------------------
    if (msg?.interactive?.button_reply?.id === "pravasi_chitty") {
        await sendText(
            phone_no_id,
            access_token,
            from,
            "കേരളത്തിന് പുറത്ത് താമസിക്കുന്ന മലയാളികളുടെ ക്ഷേമത്തിനായി അവതരിപ്പിച്ച സവിശേഷമായ സാമ്പത്തിക സമ്പാദ്യ പദ്ധതിയാണ് കെഎസ്എഫ്ഇ പ്രവാസി ചിട്ടി. ഒരൊറ്റ സ്കീമിന് കീഴിലുള്ള നിരവധി കാര്യങ്ങളുണ്ട്. ഇൻഷുറൻസ് പരിരക്ഷയും പെൻഷൻ പദ്ധതിയുമുള്ള ചിട്ടി പദ്ധതിയാണിത്. ചിട്ടികളിൽ ചേരാനും തവണകളായി അടയ്‌ക്കാനും ചിട്ടി ലേലത്തിൽ എവിടെ നിന്നും എപ്പോൾ വേണമെങ്കിലും പങ്കെടുക്കാനും നിങ്ങളെ അനുവദിക്കുന്ന ഒരു ഓൺലൈൻ പോർട്ടലും മൊബൈൽ ആപ്ലിക്കേഷനുമുണ്ട്. സംസ്ഥാനത്തിൻ്റെ മൊത്തത്തിലുള്ള അടിസ്ഥാന സൗകര്യ വികസനത്തിൽ പങ്കാളികളാകാനുള്ള അവസരവും ഇത് എൻആർകെക്ക് നൽകുന്നു. കൂടാതെ, മറ്റ് സാമ്പത്തിക ഉപകരണങ്ങൾക്കിടയിൽ സവിശേഷമായ ഒരു സാമ്പത്തിക ലാഭിക്കൽ ഘടനയാക്കി മാറ്റുന്ന നിരവധി സവിശേഷതകളും പ്രവാസി ചിട്ടിക്കുണ്ട്.\nകൂടുതൽ വിവരങ്ങൾ: https://pravasi.ksfe.com/"
        );

        await showMenu(phone_no_id, access_token, from);
    }

    //---- Reply to Change language button-----------------
    if (msg?.interactive?.button_reply?.id === "change_language") {
        await showChangeLanguageMenu(phone_no_id, access_token, from);
    }

    //--------------- Product & Services List Reply--------------
    else if (msg?.interactive?.type === "list_reply") {
        if (msg?.interactive?.list_reply?.id === "chitty") {
            await sendText(
                phone_no_id,
                access_token,
                from,
                "*KSFE ചിട്ടി*\nഇത് നിക്ഷേപത്തിൻ്റെയും അഡ്വാൻസിൻ്റെയും ഗുണങ്ങൾ സമന്വയിപ്പിക്കുന്ന ഒരു അതുല്യ സാമ്പത്തിക ഉൽപ്പന്നമാണ്. 1982 ലെ സെൻട്രൽ ചിട്ടി ഫണ്ട് ആക്‌ട് പ്രകാരം മാത്രം പൂർണ്ണമായി നിയന്ത്രിക്കപ്പെടുന്ന കെഎസ്എഫ്ഇ ചിട്ടികൾ നടത്തുന്നതിനാൽ ഇത് പൊതുജനങ്ങൾക്ക് അപകടരഹിതമായ സുരക്ഷിത താവളമാണ്. ചിട്ടികൾക്ക് പ്രതിമാസം 100 രൂപ മുതൽ ഗഡു. 1,000 മുതൽ രൂപ. 6,00,000, ചിട്ടികളുടെ സാധാരണ കാലാവധി 30 മാസം മുതൽ 120 മാസം വരെയാണ്. KSFE സാധാരണ ചിട്ടികളും (സിംഗിൾ ഡിവിഷൻ) ഡിവിഷൻ ചിട്ടികളും (സാധാരണയായി മൾട്ടിഡിവിഷൻ ചിട്ടി അല്ലെങ്കിൽ നറുക്കു ലേല ചിട്ടി എന്ന് വിളിക്കുന്നു) നടത്തുന്നു.\nകൂടുതൽ വിവരങ്ങൾ: https://ksfe.com/services/ksfe-chitty/"
            );

            await showProductList(phone_no_id, access_token, from);
            await showMenu(phone_no_id, access_token, from);
        } else if (msg?.interactive?.list_reply?.id === "loans_and_advances") {
            await sendText(
                phone_no_id,
                access_token,
                from,
                `*ലോണുകളും അഡ്വാൻസുകളും*\nവിവിധ ആവശ്യങ്ങൾക്കായി ഫണ്ട് ആവശ്യമുള്ളവരെ സഹായിക്കാൻ കെഎസ്എഫ്ഇ നിരവധി വായ്പാ പദ്ധതികൾ വാഗ്ദാനം ചെയ്യുന്നു. KSFE വായ്പകൾക്ക് താരതമ്യേന കുറഞ്ഞ പലിശയാണ് ഉള്ളത്, ഇത് ജനങ്ങൾക്ക് വലിയ ആശ്വാസമാണ്. KSFE സ്വർണ്ണ വായ്പകൾ, ഭവന വായ്പകൾ, വ്യക്തിഗത വായ്പകൾ, ചിട്ടി വായ്പകൾ എന്നിവയും മറ്റ് വിവിധ വായ്പാ പദ്ധതികളും വാഗ്ദാനം ചെയ്യുന്നു\n\n*1. ഗോൾഡ് ലോൺ*\nഉദ്ദേശ്യം:\nഅടിയന്തരമായി പണം ആവശ്യമുള്ള ആളുകൾക്ക് സ്വർണ്ണാഭരണങ്ങളുടെ സുരക്ഷിതത്വത്തിൽ ഹ്രസ്വകാല വായ്പകൾ നൽകുന്നതാണ് ഈ പദ്ധതി.\n\nഉൽപ്പന്നത്തിൻ്റെ സവിശേഷതകൾ:\n- ഗ്രാമിന് പരമാവധി തുക\n - കുറഞ്ഞ പലിശ നിരക്ക്\n- ഫാസ്റ്റ് പ്രോസസ്സിംഗ്\n\nപരമാവധി ലോൺ കാലയളവ് 12 മാസം. കുടിശ്ശികയുള്ള പലിശ അടച്ച് ഒരു വർഷത്തേക്ക് ലോണിന് ലോൺ പുതുക്കാം, ഈ സൗകര്യം 36 മാസം വരെ ലഭിക്കും.\n\nപരമാവധി ലോൺ തുക ഒരു വ്യക്തിക്ക് പ്രതിദിനം 25 ലക്ഷം രൂപ.\n\nഫ്ലെക്സിബിൾ പേയ്മെൻ്റ്, തിരിച്ചടവ് ഓപ്ഷൻ . അപ്രൈസർ ചാർജുകളല്ലാതെ മറ്റ് നിരക്കുകളൊന്നുമില്ല.\n\n:ബിസിനസ് സമയം: എല്ലാ പ്രവൃത്തി ദിവസങ്ങളിലും രാവിലെ 10.00 മുതൽ വൈകിട്ട് 4.30 വരെ ലോൺ കൗണ്ടർ തുറന്നിരിക്കും.\n\nപലിശ നിരക്ക്:\n20,000 രൂപ വരെയുള്ള സ്വർണ്ണ വായ്പ: 7.00% p.a.\ n20,000 രൂപയ്ക്ക് മുകളിലുള്ള സ്വർണ്ണ വായ്പ: 8.90% p.a.\nകൂടുതൽ വിവരങ്ങൾ: https://ksfe.com/services/gold-loan/\n\n*2. ജനമിത്രം ഗോൾഡ് ലോൺ*\nhttps://ksfe.com/services/janamithram-gold-loan/\n\n*3. കെഎസ്എഫ്ഇ മാക്സ് ഗോൾഡ് ലോൺ*\nhttps://ksfe.com/services/max-gold-loan/\n\n*4. KSFE ഹോം ലോൺ*\nhttps://ksfe.com/services/ksfe-home-loan/\n\n*5. കെഎസ്എഫ്ഇ പേഴ്സണൽ ലോൺ*\nhttps://ksfe.com/services/ksfe-personal-loan/\n\n*6. ചിട്ടി ലോൺ*\nhttps://ksfe.com/services/chitty-loan/\n\n*7. കെഎസ്എഫ്ഇ പാസ്ബുക്ക് ലോൺ*\nhttps://ksfe.com/services/ksfe-passbook-loan/\n\n*8. കസ്റ്റമർ / വാഹന വായ്പ*\nhttps://ksfe.com/services/consumer-vehicle-loan/\n\n*9. കാർ ലോൺ*\nhttps://ksfe.com/services/car-loan/\n\n*10. സുഗമ അക്ഷയ (ഓവർഡ്രാഫ്റ്റ്) സ്കീം*\nhttps://ksfe.com/services/sugama-akshaya-overdraft-scheme/`
            );

            await showProductList(phone_no_id, access_token, from);
            await showMenu(phone_no_id, access_token, from);
        } else if (msg?.interactive?.list_reply?.id === "deposit_schemes") {
            await sendText(
                phone_no_id,
                access_token,
                from,
                "*ഡെപ്പോസിറ്റ് സ്കീമുകൾ*\nKSFE വിവിധ തരത്തിലുള്ള നിക്ഷേപങ്ങൾ ആകർഷകമായ പലിശ നിരക്കിൽ വാഗ്ദാനം ചെയ്യുന്നു. ഇതിൽ ഹ്രസ്വകാല, ദീർഘകാല നിക്ഷേപങ്ങൾ ഉൾപ്പെടുന്നു. കൂടാതെ, കെഎസ്എഫ്ഇയിൽ സേവിംഗ്‌സ് നിക്ഷേപങ്ങൾക്ക് തുല്യമായ നിക്ഷേപങ്ങളും സുഗമ എന്നറിയപ്പെടുന്നു. ചിട്ടി മണി നിക്ഷേപങ്ങൾക്കും മുതിർന്ന പൗരന്മാരുടെ നിക്ഷേപങ്ങൾക്കും സാധാരണ സ്ഥിര നിക്ഷേപങ്ങളേക്കാൾ ഉയർന്ന പലിശയാണ്.\n1. സ്ഥിര നിക്ഷേപം\nhttps://ksfe.com/services/fixed-deposit/\n\n2. ട്രസ്റ്റിലെ ചിട്ടി സെക്യൂരിറ്റി ഡെപ്പോസിറ്റ്\nhttps://ksfe.com/services/chitty-security-deposit/\n\n3. ഹ്രസ്വകാല നിക്ഷേപങ്ങൾ\nhttps://ksfe.com/services/short-term-deposits/\n\n4. സുഗമ നിക്ഷേപ പദ്ധതി\nhttps://ksfe.com/services/sugama-deposit-scheme/\n\n5. നെട്ടം നിക്ഷേപ പദ്ധതി\nhttps://ksfe.com/services/nettam-deposit-scheme/"
            );

            await showProductList(phone_no_id, access_token, from);
            await showMenu(phone_no_id, access_token, from);
        } else if (
            msg?.interactive?.list_reply?.id === "securities_acceptable"
        ) {
            await sendText(
                phone_no_id,
                access_token,
                from,
                `*സെക്യൂരിറ്റികൾ സ്വീകാര്യമാണ്*\nചിട്ടികളും വായ്പകളും പോലുള്ള സാമ്പത്തിക സഹായം വാഗ്ദാനം ചെയ്യുന്ന കെഎസ്എഫ്ഇയുടെ വിവിധ സ്കീമുകൾ ഉപഭോക്താവ് നൽകുന്ന സെക്യൂരിറ്റിയിൽ നിന്ന് പ്രയോജനപ്പെടുത്താം. സുരക്ഷയെ നിർവചിച്ചിരിക്കുന്നത്, "കെഎസ്എഫ്ഇ അംഗീകരിച്ചിട്ടുള്ള സ്ഥാപനങ്ങളിലെ ജീവനക്കാരുടെ വ്യക്തിഗത ജാമ്യം, ഭൂവസ്‌തുക്കൾ, സ്ഥിര നിക്ഷേപ രസീതുകൾ, സ്വർണ്ണാഭരണങ്ങൾ മുതലായവ ചിട്ടിയുടെ/മുൻകൂർ തിരിച്ചടവ് സംബന്ധിച്ച ഒരു അണ്ടർടേക്കിംഗ് പൂർത്തീകരണത്തിനുള്ള ഗ്യാരൻ്റിയായി സൂക്ഷിക്കുന്നതെന്തും, വീഴ്ച വരുത്തിയാൽ പലിശ സഹിതം നൽകണം”. കെഎസ്എഫ്ഇ അതിൻ്റെ വ്യത്യസ്ത സ്കീമുകൾക്കായി സ്വീകരിച്ച വിവിധ തരത്തിലുള്ള സെക്യൂരിറ്റികൾ ഇനിപ്പറയുന്നവയാണ്:\n1. വ്യക്തിഗത ജാമ്യം\nhttps://ksfe.com/services/personal-surety/\n\n2. കെഎസ്എഫ്ഇയുടെയും മറ്റ് ബാങ്ക് നിക്ഷേപങ്ങളുടെയും എഫ്ഡി\nhttps://ksfe.com/services/fd-of-ksfe-and-other-bank-deposits/\n\n3. സുഗമ സെക്യൂരിറ്റി ഡെപ്പോസിറ്റ്\nhttps://ksfe.com/services/sugama-security-deposit/\n\n4. ലൈഫ് കവർ പോളിസി\nhttps://ksfe.com/services/life-cover-policy/\n\n5. ബാങ്ക് ഗ്യാരൻ്റി\nhttps://ksfe.com/services/bank-guarantee/\n\n6. KSFE-യുടെ നോൺ-പ്രൈസ്ഡ് ചിട്ടികളുടെ പാസ് ബുക്ക്\nhttps://ksfe.com/services/pass-book-of-non-prized-chitties-of-ksfe/\n\n7. കിസാൻ വികാസ് പത്ര\nhttps://ksfe.com/services/kissan-vikas-patra/\n\n8. പ്രോപ്പർട്ടി സെക്യൂരിറ്റി\nhttps://ksfe.com/services/property-security/\n\n9. സ്വർണ്ണ സുരക്ഷ\nhttps://ksfe.com/services/gold-security/`
            );

            await showProductList(phone_no_id, access_token, from);
            await showMenu(phone_no_id, access_token, from);
        } else if (msg?.interactive?.list_reply?.id === "fee_based_services") {
            await sendText(
                phone_no_id,
                access_token,
                from,
                "*ഫീസ് അടിസ്ഥാനമാക്കിയുള്ള സേവനങ്ങൾ*\nKSFE ജനങ്ങൾക്ക് വെസ്റ്റേൺ യൂണിയൻ മണി ട്രാൻസ്ഫർ, എക്സ്പ്രസ് മണി ട്രാൻസ്ഫർ, സേഫ് ഡെപ്പോസിറ്റ് ലോക്കർ സൗകര്യം തുടങ്ങിയ ഫീസ് അടിസ്ഥാനമാക്കിയുള്ള സേവനങ്ങൾ നൽകുന്നു.\n1. മണി ട്രാൻസ്ഫർ സേവനങ്ങൾ\nhttps://ksfe.com/services/money-transfer-services/\n\n2. സേഫ് ഡെപ്പോസിറ്റ് ലോക്കർ\nപൊതുജനങ്ങൾക്ക് വിപുലമായ സേവനങ്ങൾ ലഭ്യമാക്കുന്നതിനായി കെഎസ്എഫ്ഇ ചില യൂണിറ്റുകളിൽ സേഫ് ഡെപ്പോസിറ്റ് ലോക്കർ സൗകര്യം നൽകുന്നു. വ്യക്തികൾ, സ്ഥാപനങ്ങൾ, കമ്പനികൾ, വ്യക്തികളുടെയോ ക്ലബ്ബുകളുടെയോ അസോസിയേഷൻ, ട്രസ്റ്റികൾ, എൻആർഐകൾ, ഗവ. വകുപ്പുകൾ, സഹകരണ സംഘങ്ങൾ കൂടാതെ/അല്ലെങ്കിൽ വ്യക്തികളുടെ ശരീരം. പ്രായപൂർത്തിയാകാത്തവരുടെ പേരിലും ലോക്കറുകൾ തുറക്കാവുന്നതാണ്, ഒരു രക്ഷിതാവ് യഥാവിധി പ്രതിനിധീകരിക്കുന്നു. ലോക്കറിൻ്റെ വാടക വാർഷികാടിസ്ഥാനത്തിൽ പൊതുജനങ്ങൾക്ക് 800 രൂപ + നികുതിയും ചിട്ടി വരിക്കാർക്ക് 700 രൂപയും നികുതി നിരക്കിലാണ് നിശ്ചയിച്ചിരിക്കുന്നത്. ലോക്കർ ഉടമകൾക്ക് നോമിനേഷൻ സൗകര്യം ലഭ്യമാണ്.\nകൂടുതൽ വിവരങ്ങൾ: https://ksfe.com/services/safe-deposit-locker/"
            );

            await showProductList(phone_no_id, access_token, from);
            await showMenu(phone_no_id, access_token, from);
        }

        //---------------------- FAQ List Reply----------------------
        else {
            let qn = msg?.interactive?.list_reply?.id;

            await sendText(
                phone_no_id,
                access_token,
                from,
                `*` +
                    faqListMalayalam[qn - 1].question +
                    `*\n\n` +
                    faqListMalayalam[qn - 1].answer
            );

            await showFaqOptions(phone_no_id, access_token, from);

            await showMenu(phone_no_id, access_token, from);
        }
    }
};
