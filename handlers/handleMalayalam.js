import axios from "axios";

import {
    faqListMalayalam,
    faqListMlOptions,
    faqMalayalam,
} from "../constants/malayalam.js";

export const handleMalayalam = async (msg, access_token, phone_no_id, from) => {
    if (
        msg?.type === "text" ||
        msg?.interactive?.button_reply?.id === "malayalam"
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
                type: "interactive",
                interactive: {
                    type: "button",
                    body: {
                        text: "ഞാൻ നിങ്ങളെ എങ്ങനെ സഹായിക്കും ?",
                    },
                    action: {
                        buttons: [
                            {
                                type: "reply",
                                reply: {
                                    id: "faq-m",
                                    title: "ചോദ്യങ്ങൾ",
                                },
                            },
                            {
                                type: "reply",
                                reply: {
                                    id: "branch_locator-m",
                                    title: "ബ്രാഞ്ച് ലൊക്കേറ്റർ",
                                },
                            },
                            {
                                type: "reply",
                                reply: {
                                    id: "contact-m",
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
                type: "interactive",
                interactive: {
                    type: "button",
                    body: {
                        text: "കൂടുതൽ സേവനങ്ങൾ",
                    },
                    action: {
                        buttons: [
                            {
                                type: "reply",
                                reply: {
                                    id: "products-m",
                                    title: "സേവനങ്ങൾ",
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
    }

    //------------------FAQ------------------
    else if (msg?.interactive?.button_reply?.id === "faq-m") {
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
                        text: "FAQ",
                    },
                    // footer: {
                    //     text: "<FOOTER_TEXT>",
                    // },
                    action: {
                        button: "Choose question",
                        sections: [
                            {
                                title: "Choose question",
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
    else if (msg?.interactive?.button_reply?.id === "contact-m") {
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
                    body: "*Registered Office*\n\nകേരള സ്റ്റേറ്റ് ഫിനാൻഷ്യൽ എന്റർപ്രൈസസ് ലിമിറ്റഡ്\n“ഭദ്രത”, മ്യൂസിയം റോഡ്,\nP.b. No.510,തൃശ്ശൂർ – 680 020\nഫോൺ No: 0487 2332255\nടോൾ ഫ്രീ No: 1800 425 3455\nഫാക്സ്: 0487 – 2336232\nE-Mail : mail@ksfe.com\n\nനിങ്ങളുടെ ചോദ്യങ്ങൾ ചോദിക്കുന്നതിന്, സന്ദർശിക്കുക https://ksfe.com/contact-us",
                },
            },

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
            },
        });
    }

    // ------------------Branch Locator------------------
    else if (msg?.interactive?.button_reply?.id === "branch_locator-m") {
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

    // ------------------List Reply------------------
    else if (msg?.interactive?.type === "list_reply") {
        let qn = msg?.interactive?.list_reply?.id;
        console.log("Mal FaqList");
        let ln = qn[0];
        // if (ln === "m") {
        qn = qn.slice(1);
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
    }
};
