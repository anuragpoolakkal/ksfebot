import axios from "axios";
import OpenAI from "openai";
import {
    faqListMalayalam,
    faqListMlOptions,
    faqMalayalam,
    showProductList,
    showMenu,
} from "../constants/malayalam.js";

import { basePrompt, showChangeLanguageMenu } from "../constants/english.js";


export const handleMalayalam = async (msg, access_token, phone_no_id, from) => {
    const askAI = async (prompt) => {
        const openai = new OpenAI({
            apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
            dangerouslyAllowBrowser: true,
        });

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: basePrompt },
                { role: "user", content: prompt },
            ],
        });

        console.log("completion: ", completion);
        console.log("Content: ", completion.choices[0].message);

        var gptReply = await completion.choices[0].message.content;
        // const isMenu = await completion.choices[0].message.content.isMenu;

        return gptReply;
    };

    if (msg?.type === "text") {
        // Bot commands
        if (msg?.text?.body === "/menu") {
            await showMenu(phone_no_id, access_token, from);
        } else if (msg?.text?.body === "/products") {
            await showProductList(phone_no_id, access_token, from);
        } else if (msg?.text?.body === "/language") {
            await showChangeLanguageMenu(phone_no_id, access_token, from);

            // AI reply
        } else {
            const answer = await askAI(msg?.text?.body);

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
                    type: "text",
                    text: {
                        body: answer,
                    },
                },

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access_token}`,
                },
            });
        }
    }

    if (msg?.interactive?.button_reply?.id === "malayalam") {
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
                        text: "ഞാൻ നിങ്ങളെ എങ്ങനെയാണ് സഹായിക്കേണ്ടത്?\n\n\n_പ്രധാനപ്പെട്ട ബോട് കമാൻഡുകൾ:_\n_*/menu* മെനു ലഭിക്കുന്നതിന്_\n_*/products* സേവനങ്ങളുടെ വിവരങ്ങൾക്ക്_\n_*/language* ഭാഷ മാറ്റുന്നതിന്_",
                    },
                    action: {
                        buttons: [
                            {
                                type: "reply",
                                reply: {
                                    id: "faq",
                                    title: "ചോദ്യങ്ങൾ",
                                },
                            },
                            {
                                type: "reply",
                                reply: {
                                    id: "branch_locator",
                                    title: "ബ്രാഞ്ച് ലൊക്കേറ്റർ",
                                },
                            },
                            {
                                type: "reply",
                                reply: {
                                    id: "contact",
                                    title: "ഞങ്ങളെ ബന്ധപ്പെടുക",
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
                                    id: "products",
                                    title: "സേവനങ്ങൾ",
                                },
                            },
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
                                    id: "pravasi_chitty",
                                    title: "പ്രവാസി ചിട്ടി",
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
                type: "text",
                text: {
                    body: "മെനുവിൽ നിന്ന് ഒരു ഓപ്ഷൻ തിരഞ്ഞെടുക്കുക അല്ലെങ്കിൽ എന്നോട് ഒരു ചോദ്യം ചോദിക്കുക.",
                },
            },

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
            },
        });
    }

    //------------------FAQ------------------
    else if (msg?.interactive?.button_reply?.id === "faq") {
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
                type: "text",
                text: {
                    body: faqMalayalam,
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
                    type: "list",
                    header: {
                        type: "text",
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

    // ------------------Contacts------------------
    else if (msg?.interactive?.button_reply?.id === "contact") {
        axios({
            method: "POST",
            url:
                "https://graph.facebook.com/v13.0/" +
                phone_no_id +
                "/messages?access_token=" +
                access_token,
            data: {
                messaging_product: "whatsapp",
                to: from,
                type: "text",
                text: {
                    body: "*Registered Office*\n\nകേരള സ്റ്റേറ്റ് ഫിനാൻഷ്യൽ എന്റർപ്രൈസസ് ലിമിറ്റഡ്\n“ഭദ്രത”, മ്യൂസിയം റോഡ്,\nP.b. No.510,തൃശ്ശൂർ – 680 020\nഫോൺ No: 0487 2332255\nടോൾ ഫ്രീ No: 1800 425 3455\nഫാക്സ്: 0487 – 2336232\nEail : mail@ksfe.com\n\nനിങ്ങളുടെ ചോദ്യങ്ങൾ ചോദിക്കുന്നതിന്, സന്ദർശിക്കുക https://ksfe.com/contact-us",
                },
            },

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
            },
        });
    }

    // ------------------Branch Locator------------------
    else if (msg?.interactive?.button_reply?.id === "branch_locator") {
        axios({
            method: "POST",
            url:
                "https://graph.facebook.com/v13.0/" +
                phone_no_id +
                "/messages?access_token=" +
                access_token,
            data: {
                messaging_product: "whatsapp",
                to: from,
                type: "text",
                text: {
                    body: "നിങ്ങളുടെ ഏറ്റവും അടുത്തുള്ള ശാഖ കണ്ടെത്തുക\n\nhttps://ksfe.com/branch-locator",
                },
            },

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
            },
        });
    }

    //---------------------- Products and Services catalogue ----------------------
    if (msg?.interactive?.button_reply?.id === "products") {
        await showProductList(phone_no_id, access_token, from);

        await showMenu(phone_no_id, access_token, from);
    }

    //---------------------- About KSFE ----------------------
    if (msg?.interactive?.button_reply?.id === "about_ksfe") {
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
                type: "text",
                text: {
                    body: "The Kerala State Financial Enterprises Limited, popularly known as *KSFE*.\nKSFE started its operations on 6th November 1969, headquartered at Thrissur, with a capital of ₹2 Lakhs, 45 employees and 10 branches.\n\n*₹100 Cr* paid up capital\n*8300+* employees\n*50 Lacks+* customers\n*670+* branches\n*73000 Cr+* capital\n\n*KSFE at a Glance*\nKSFE is a Miscellaneous Non-Banking Company,Is fully owned by the Government of Kerala.\n\nKSFE is one of the most profit-making public sector undertakings of the State.\n\nFormed by the Government of Kerala with the objective of providing an alternative to the public from the private chit promoters in order to bring in social control over the chit fund business, so as to save the public from the clutches of unscrupulous fly-by-night chit fund operators.\n\nKSFE has been registering impressive profits every year, without fail since its inception.\n\nKSFE pays to the Government of Kerala crores of rupees every year by way of:\n- Guarantee Commission\n- Service Charges\n- Dividend\n\nMore information: https://ksfe.com/about-us/",
                },
            },

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
            },
        });

        await showMenu(phone_no_id, access_token, from);
    }

    // ---------------------- Pravasi Chitty ----------------------
    if (msg?.interactive?.button_reply?.id === "pravasi_chitty") {
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
                type: "text",
                text: {
                    body: "KSFE Pravasi Chitty is a unique financial savings scheme introduced for the welfare of Malayalees living outside Kerala. It’s many things, under a single scheme. It is a chitty scheme with insurance coverage and a pension plan. It has an online portal and a mobile application that allows you to join chits, pay instalments, and take part in chit auction from anywhere, anytime. It also gives NRK’s, an opportunity to partake in the overall infrastructural development of the State. Moreover, the Pravasi Chits also has many features that make it a unique financial saving structure amidst other financial instruments.\nMore information: https://pravasi.ksfe.com/",
                },
            },

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
            },
        });

        await showMenu(phone_no_id, access_token, from);
    }

    //---- Reply to Change language button-----------------
    if (msg?.interactive?.button_reply?.id === "change_language") {
        await showChangeLanguageMenu(phone_no_id, access_token, from);
    }

    //--------------- Product & Services List Reply--------------
    else if (msg?.interactive?.type === "list_reply") {
        if (msg?.interactive?.list_reply?.id === "chitty") {
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
                    type: "text",
                    text: {
                        body: "*Chitty*\n\n1. KSFE Chitty\nhttps://ksfe.com/services/ksfe-chitty/",
                    },
                },

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access_token}`,
                },
            });
            await showProductList(phone_no_id, access_token, from);
            await showMenu(phone_no_id, access_token, from);
        } else if (msg?.interactive?.list_reply?.id === "loans_and_advances") {
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
                    type: "text",
                    text: {
                        body: "*Loans & Advances*\n\n1. Gold Loan\nhttps://ksfe.com/services/gold-loan/\n\n2. Janamitram Gold Loan\nhttps://ksfe.com/services/janamithram-gold-loan/\n\n3. KSFE Home Loan\nhttps://ksfe.com/services/ksfe-home-loan/\n\n4. KSFE Personal Loan\nhttps://ksfe.com/services/ksfe-personal-loan/\n\n5. Chitty Loan\nhttps://ksfe.com/services/chitty-loan/\n\n6. KSFE Passbook Loan\nhttps://ksfe.com/services/ksfe-passbook-loan/\n\n7. Customer / Vehicle Loan\nhttps://ksfe.com/services/consumer-vehicle-loan/\n\n8. Car Loan\nhttps://ksfe.com/services/car-loan/\n\n9. Sugama Akshaya (Overdraft) Scheme\nhttps://ksfe.com/services/sugama-akshaya-overdraft-scheme/",
                    },
                },

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access_token}`,
                },
            });
            await showProductList(phone_no_id, access_token, from);
            await showMenu(phone_no_id, access_token, from);
        } else if (msg?.interactive?.list_reply?.id === "deposit_schemes") {
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
                    type: "text",
                    text: {
                        body: "*Deposit Schemes*\n\n1. Fixed Deposit\nhttps://ksfe.com/services/fixed-deposit/\n\n2. Chitty Security Deposit In Trust\nhttps://ksfe.com/services/chitty-security-deposit/\n\n3. Short Term Deposits\nhttps://ksfe.com/services/short-term-deposits/\n\n4. Sugama Deposit Scheme\nhttps://ksfe.com/services/sugama-deposit-scheme/\n\n5. Nettam Deposit Scheme\nhttps://ksfe.com/services/nettam-deposit-scheme/",
                    },
                },

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access_token}`,
                },
            });
            await showProductList(phone_no_id, access_token, from);
            await showMenu(phone_no_id, access_token, from);
        } else if (
            msg?.interactive?.list_reply?.id === "securities_acceptable"
        ) {
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
                    type: "text",
                    text: {
                        body: "*Securities Acceptable*\n\n1. Personal Surety\nhttps://ksfe.com/services/personal-surety/\n\n2. FD of KSFE and Other Bank Deposits\nhttps://ksfe.com/services/fd-of-ksfe-and-other-bank-deposits/\n\n3. Sugama Security Deposit\nhttps://ksfe.com/services/sugama-security-deposit/\n\n4. Life Cover Policy\nhttps://ksfe.com/services/life-cover-policy/\n\n5. Bank Guarantee\nhttps://ksfe.com/services/bank-guarantee/\n\n6. Pass Book of Non-Prized Chitties of KSFE\nhttps://ksfe.com/services/pass-book-of-non-prized-chitties-of-ksfe/\n\n7. Kissan Vikas Patra\nhttps://ksfe.com/services/kissan-vikas-patra/\n\n8. Property Security\nhttps://ksfe.com/services/property-security/\n\n9. Gold Security\nhttps://ksfe.com/services/gold-security/",
                    },
                },

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access_token}`,
                },
            });
            await showProductList(phone_no_id, access_token, from);
            await showMenu(phone_no_id, access_token, from);
        } else if (msg?.interactive?.list_reply?.id === "fee_based_services") {
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
                    type: "text",
                    text: {
                        body: "*Fee Based Services*\n\n1. Money Transfer Services\nhttps://ksfe.com/services/money-transfer-services/\n\n2. Safe Deposit Locker\nKSFE provides Safe Deposit Locker facility in some units in order to cater to wide range of services to the public. Lockers may be hired in the names of individuals, firms, companies, association of persons or clubs, trustees, NRIs, Govt. departments, co-operative societies and/or body of individuals. Lockers can also be opened in the name of minors duly represented by a guardian. The rent of the locker is fixed at the rate of Rs.800 + tax for public and Rs.700+ tax for chitty subscribers, on yearly basis. Nomination facility is available for locker holders.\nMore information: https://ksfe.com/services/safe-deposit-locker/",
                    },
                },

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access_token}`,
                },
            });
            await showProductList(phone_no_id, access_token, from);
            await showMenu(phone_no_id, access_token, from);
        }

        //---------------------- FAQ List Reply----------------------
        else {
            let qn = msg?.interactive?.list_reply?.id;
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
                    type: "text",
                    text: {
                        body:
                            `*` +
                            faqListMalayalam[qn - 1].question +
                            `*\n\n` +
                            faqListMalayalam[qn - 1].answer,
                    },
                },

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access_token}`,
                },
            });
            await showFaqOptions(phone_no_id, access_token, from);

            await showMenu(phone_no_id, access_token, from);
        }
    }
};
