import axios from "axios";
import { OpenAI } from "openai";
import "dotenv/config";
import { Translate } from "@google-cloud/translate/build/src/v2/index.js";
import CallbackRequest from "../models/CallbackRequest.js";
// import { callbackReq } from "../index.js";

import {
    faqListEnglish,
    faqEnglish,
    showFaqOptions,
    showProductList,
    showChangeLanguageMenu,
    showMenu,
    basePrompt,
    sendText,
} from "../constants/english.js";
import { handleRequestCall } from "./handleRequestCall.js";

const history = new Map();
// const userDetails = new Map();
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

export const handleEnglish = async (msg, access_token, phone_no_id, from) => {
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
            from
        );
        if (status === "SUCCESS") {
            await sendText(
                phone_no_id,
                access_token,
                from,
                "Request Successful"
            );
            callbackReq.set(from, false);
        } else if (status === "FAIL") {
            await sendText(phone_no_id, access_token, from, "Request Failed");
            callbackReq.set(from, false);
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

    // if (
    //     msg?.interactive?.button_reply?.id === "request_call" ||
    //     callbackReq.get(from) === true
    // ) {
    //     let status = await handleRequestCall(
    //         msg,
    //         access_token,
    //         phone_no_id,
    //         from
    //     );
    //     if (status === "SUCCESS") {
    //         await sendText(
    //             phone_no_id,
    //             access_token,
    //             from,
    //             "Requested Successful"
    //         );
    //         callbackReq.set(from, false);
    //     } else if (status === "FAIL") {
    //         await sendText(phone_no_id, access_token, from, "Request Failed");
    //         callbackReq.set(from, false);
    //     }
    // }

    if (msg?.interactive?.button_reply?.id === "english") {
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
                        text: "How can I help you?\n\n\n_Important bot commands:_\n_*/menu* for main menu_\n_*/products* for products & services_\n_*/language* to change language_",
                    },
                    action: {
                        buttons: [
                            {
                                type: "reply",
                                reply: {
                                    id: "faq",
                                    title: "Questions",
                                },
                            },
                            {
                                type: "reply",
                                reply: {
                                    id: "branch_locator",
                                    title: "Branch Locator",
                                },
                            },
                            {
                                type: "reply",
                                reply: {
                                    id: "contact",
                                    title: "Contact us",
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
                                    id: "request_call",
                                    title: "Request a Call",
                                },
                            },
                            {
                                type: "reply",
                                reply: {
                                    id: "products",
                                    title: "Products & Services",
                                },
                            },
                            {
                                type: "reply",
                                reply: {
                                    id: "pravasi_chitty",
                                    title: "Pravasi Chitty",
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
                                    title: "About KSFE",
                                },
                            },
                            {
                                type: "reply",
                                reply: {
                                    id: "change_language",
                                    title: "Change Language",
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
            "Choose an option from the above menu or ask me a question."
        );
    }

    // ----------------------FAQ----------------------
    if (msg?.interactive?.button_reply?.id === "faq") {
        await sendText(phone_no_id, access_token, from, faqEnglish);

        await showFaqOptions(phone_no_id, access_token, from);

        await showMenu(phone_no_id, access_token, from);
    }

    // ----------------------Contact----------------------
    if (msg?.interactive?.button_reply?.id === "contact") {
        await sendText(
            phone_no_id,
            access_token,
            from,
            "*Registered Office*\nThe Kerala State Financial Enterprises Ltd.\n“bhadratha”, Museum Road,\nP.b. No.510,Thrissur – 680 020\nPhone No: 0487 2332255\nToll Free No: 1800 425 3455\nFax: 0487 – 2336232\nE-Mail : mail@ksfe.com\n\nTo ask your queries, visit https://ksfe.com/contact-us"
        );

        await showMenu(phone_no_id, access_token, from);
    }

    // ----------------------Branch Locator----------------------
    if (msg?.interactive?.button_reply?.id === "branch_locator") {
        await sendText(
            phone_no_id,
            access_token,
            from,
            "Find your nearest branch\n\nhttps://ksfe.com/branch-locator"
        );

        await showMenu(phone_no_id, access_token, from);
    }

    //---------------------- Request a Callback  ----------------------
    // if (msg?.interactive?.button_reply?.id === "request_call") {
    //     callbackReq.set(from, true);
    // }
    // if (msg?.interactive?.button_reply?.id === "request_call") {
    //     if (userDetails.get(from) == null) {
    //         userDetails.set(from, []);
    //     }

    //     const userData = await CallbackRequest.findOne({ phone: from });
    //     if (userData) {
    //         userData.date = Date.now;
    //         await userData.save();

    //         await sendText(
    //             phone_no_id,
    //             access_token,
    //             from,
    //             "Requested a call."
    //         );

    //         callbackReq.set(from, false);

    //         await showMenu(phone_no_id, access_token, from);
    //     }

    //     await sendText(
    //         phone_no_id,
    //         access_token,
    //         from,
    //         "What is your full name?"
    //     );
    // }

    // if (callbackReq.get(from) == true && msg?.type == "text") {
    //     const userArray = userDetails.get(from);
    //     console.log(`USERARRAY111111: ` + userArray);
    //     if (userArray.length == 0) {
    //         userArray.push(msg?.body?.text);
    //         userDetails.set(from, userArray);
    //     } else if (userArray.length == 1) {
    //         userArray.push(msg?.body?.text);
    //         userDetails.set(from, userArray);
    //     } else if (userArray.length == 2) {
    //         userArray.push(msg?.body?.text);
    //         userDetails.set(from, userArray);

    //         await sendText(
    //             phone_no_id,
    //             access_token,
    //             from,
    //             `Your data:\n\nName: ` +
    //                 userArray[0] +
    //                 `\nEmail: ` +
    //                 userArray[1] +
    //                 `\nDistrict` +
    //                 userArray[0]
    //         );

    //         const newData = await new CallbackRequest({
    //             phone: from,
    //             name: userArray[0],
    //             email: userArray[1],
    //             district: userArray[2],
    //             date: Date.now(),
    //         });

    //         await newData.save();

    //         callbackReq.set(from, false);

    //         await sendText(
    //             phone_no_id,
    //             access_token,
    //             from,
    //             "Requested a call."
    //         );

    //         await showMenu(phone_no_id, access_token, from);
    //     }
    // }

    // if (callbackReq.get(from) == true) {
    //     const userArray = userDetails.get(from);

    //     console.log(`USERARRAY: ` + userArray);
    //     console.log(`CALLBACKREQ: ` + callbackReq.get(from));

    //     if (userArray.length == 1) {
    //         await sendText(
    //             phone_no_id,
    //             access_token,
    //             from,
    //             "What is your email?"
    //         );
    //     } else if (userArray.length == 2) {
    //         await sendText(
    //             phone_no_id,
    //             access_token,
    //             from,
    //             "Which is your district?"
    //         );
    //     }
    // }

    //---------------------- About KSFE ----------------------
    if (msg?.interactive?.button_reply?.id === "about_ksfe") {
        await sendText(
            phone_no_id,
            access_token,
            from,
            "The Kerala State Financial Enterprises Limited, popularly known as *KSFE*.\nKSFE started its operations on 6th November 1969, headquartered at Thrissur, with a capital of ₹2 Lakhs, 45 employees and 10 branches.\n\n*₹100 Cr* paid up capital\n*8300+* employees\n*50 Lacks+* customers\n*670+* branches\n*73000 Cr+* capital\n\n*KSFE at a Glance*\nKSFE is a Miscellaneous Non-Banking Company,Is fully owned by the Government of Kerala.\n\nKSFE is one of the most profit-making public sector undertakings of the State.\n\nFormed by the Government of Kerala with the objective of providing an alternative to the public from the private chit promoters in order to bring in social control over the chit fund business, so as to save the public from the clutches of unscrupulous fly-by-night chit fund operators.\n\nKSFE has been registering impressive profits every year, without fail since its inception.\n\nKSFE pays to the Government of Kerala crores of rupees every year by way of:\n- Guarantee Commission\n- Service Charges\n- Dividend\n\nMore information: https://ksfe.com/about-us/"
        );

        await showMenu(phone_no_id, access_token, from);
    }

    // ---------------------- Pravasi Chitty ----------------------
    if (msg?.interactive?.button_reply?.id === "pravasi_chitty") {
        await sendText(
            phone_no_id,
            access_token,
            from,
            "KSFE Pravasi Chitty is a unique financial savings scheme introduced for the welfare of Malayalees living outside Kerala. It’s many things, under a single scheme. It is a chitty scheme with insurance coverage and a pension plan. It has an online portal and a mobile application that allows you to join chits, pay instalments, and take part in chit auction from anywhere, anytime. It also gives NRK’s, an opportunity to partake in the overall infrastructural development of the State. Moreover, the Pravasi Chits also has many features that make it a unique financial saving structure amidst other financial instruments.\nMore information: https://pravasi.ksfe.com/"
        );

        await showMenu(phone_no_id, access_token, from);
    }

    //---- Reply to Change language button-----------------
    if (msg?.interactive?.button_reply?.id === "change_language") {
        await showChangeLanguageMenu(phone_no_id, access_token, from);
    }

    //--------------- Product & Services List Reply--------------
    if (msg?.interactive?.type === "list_reply") {
        if (msg?.interactive?.list_reply?.id === "chitty") {
            await sendText(
                phone_no_id,
                access_token,
                from,
                "*KSFE Chitty*\nIt is a unique financial product, which blends the advantages of both investment and advance. It is a risk free safe haven for the public as KSFE conducts chitties, fully governed by the provisions of Central Chit Fund Act 1982 only. Installment per month for chitties range from Rs. 1,000 to Rs. 6,00,000 and the usual duration of chitties range from 30 months to 120 months. KSFE conducts normal chitties (Single division) and division chitties (usually called Multidivision chitty or Narukku Lela chitty).\nMore information: https://ksfe.com/services/ksfe-chitty/"
            );

            await showProductList(phone_no_id, access_token, from);
            await showMenu(phone_no_id, access_token, from);
        } else if (msg?.interactive?.list_reply?.id === "loans_and_advances") {
            await sendText(
                phone_no_id,
                access_token,
                from,
                `*Loans & Advances*\nKSFE offers a number of loan schemes to help those who need fund for various purposes.  KSFE Loans are having relatively low interest rates, are a great relief to the people. KSFE offers Gold loans, Home loans, Personal loans and Chit loans  and other  various loan schemes\n\n*1. Gold Loan*\nPurpose:\nThe Scheme is intended to provide short term loans for people who are urgently in need of money, on the security of gold ornaments.\n\nFeatures of the product:\n- Maximum Amount per Gram\n- low interest rate\n- Fast processing\n\nMaximum Loan period 12 Months. Loan can renew the loan a further period of one year after remmitting the due interest and this facility can be availed up to 36 Months.\n\nMaximum Loan amount  Rs 25 Lakhs per  individual, per day.\n\nFlexible payment and repayment option. No other charges, other than appraiser charges.\n\n:Business Hours: loan counter will be open from 10.00 am to 4.30 pm on all working days.\n\nInterest rates:\nGold loan upto Rs 20,000: 7.00% p.a.\nGold loan above Rs 20,000: 8.90% p.a.\nMore information: https://ksfe.com/services/gold-loan/\n\n*2. Janamitram Gold Loan*\nhttps://ksfe.com/services/janamithram-gold-loan/\n\n*3. KSFE Max Gold Loan*\nhttps://ksfe.com/services/max-gold-loan/\n\n*4. KSFE Home Loan*\nhttps://ksfe.com/services/ksfe-home-loan/\n\n*5. KSFE Personal Loan*\nhttps://ksfe.com/services/ksfe-personal-loan/\n\n*6. Chitty Loan*\nhttps://ksfe.com/services/chitty-loan/\n\n*7. KSFE Passbook Loan*\nhttps://ksfe.com/services/ksfe-passbook-loan/\n\n*8. Customer / Vehicle Loan*\nhttps://ksfe.com/services/consumer-vehicle-loan/\n\n*9. Car Loan*\nhttps://ksfe.com/services/car-loan/\n\n*10. Sugama Akshaya (Overdraft) Scheme*\nhttps://ksfe.com/services/sugama-akshaya-overdraft-scheme/`
            );

            await showProductList(phone_no_id, access_token, from);
            await showMenu(phone_no_id, access_token, from);
        } else if (msg?.interactive?.list_reply?.id === "deposit_schemes") {
            await sendText(
                phone_no_id,
                access_token,
                from,
                "*Deposit Schemes*\nKSFE offers various types of deposits  with attractive interest rates.   This includes short-term and long-term deposits.  In addition, there are deposits equivalent to savings deposits in KSFE, called Sugama.  Chit Money deposits and Senior Citizens' deposits have a higher interest rate than regular fixed deposits.\n1. Fixed Deposit\nhttps://ksfe.com/services/fixed-deposit/\n\n2. Chitty Security Deposit In Trust\nhttps://ksfe.com/services/chitty-security-deposit/\n\n3. Short Term Deposits\nhttps://ksfe.com/services/short-term-deposits/\n\n4. Sugama Deposit Scheme\nhttps://ksfe.com/services/sugama-deposit-scheme/\n\n5. Nettam Deposit Scheme\nhttps://ksfe.com/services/nettam-deposit-scheme/"
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
                "*Securities Acceptable*\nVarious schemes of KSFE that offers financial assistance such as Chitties and loans can  be availed against the security provided by the customer. Security is defined as, “anything, such as Personal Surety of employees of Institutions approved by KSFE, landed property, Fixed Deposit receipts,  Gold ornaments etc. kept as a guarantee for the fulfillment of an undertaking regarding the repayment of the Chitty/advance, along with interest thereon, to be paid in case of default”. Various types of securities accepted by the KSFE for its different schemes are the following:\n1. Personal Surety\nhttps://ksfe.com/services/personal-surety/\n\n2. FD of KSFE and Other Bank Deposits\nhttps://ksfe.com/services/fd-of-ksfe-and-other-bank-deposits/\n\n3. Sugama Security Deposit\nhttps://ksfe.com/services/sugama-security-deposit/\n\n4. Life Cover Policy\nhttps://ksfe.com/services/life-cover-policy/\n\n5. Bank Guarantee\nhttps://ksfe.com/services/bank-guarantee/\n\n6. Pass Book of Non-Prized Chitties of KSFE\nhttps://ksfe.com/services/pass-book-of-non-prized-chitties-of-ksfe/\n\n7. Kissan Vikas Patra\nhttps://ksfe.com/services/kissan-vikas-patra/\n\n8. Property Security\nhttps://ksfe.com/services/property-security/\n\n9. Gold Security\nhttps://ksfe.com/services/gold-security/"
            );

            await showProductList(phone_no_id, access_token, from);
            await showMenu(phone_no_id, access_token, from);
        } else if (msg?.interactive?.list_reply?.id === "fee_based_services") {
            await sendText(
                phone_no_id,
                access_token,
                from,
                "*Fee Based Services*\nKSFE provide fee based services such as Western Union Money Transfer, Express Money Transfer and Safe Deposit Locker facility to the people.\n1. Money Transfer Services\nhttps://ksfe.com/services/money-transfer-services/\n\n2. Safe Deposit Locker\nKSFE provides Safe Deposit Locker facility in some units in order to cater to wide range of services to the public. Lockers may be hired in the names of individuals, firms, companies, association of persons or clubs, trustees, NRIs, Govt. departments, co-operative societies and/or body of individuals. Lockers can also be opened in the name of minors duly represented by a guardian. The rent of the locker is fixed at the rate of Rs.800 + tax for public and Rs.700+ tax for chitty subscribers, on yearly basis. Nomination facility is available for locker holders.\nMore information: https://ksfe.com/services/safe-deposit-locker/"
            );

            await showProductList(phone_no_id, access_token, from);
            await showMenu(phone_no_id, access_token, from);
        }

        //---------------------- FAQ List Reply----------------------
        else {
            let qn = await msg?.interactive?.list_reply?.id;
            // let ln = qn[0];

            await sendText(
                phone_no_id,
                access_token,
                from,
                `*` +
                    faqListEnglish[qn - 1].question +
                    `*\n\n` +
                    faqListEnglish[qn - 1].answer
            );

            await showFaqOptions(phone_no_id, access_token, from);

            await showMenu(phone_no_id, access_token, from);
        }
    }
};
