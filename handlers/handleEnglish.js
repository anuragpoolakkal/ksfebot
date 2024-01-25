import axios from "axios";

import {
    faqListEnglish,
    faqListEnOptions,
    faqEnglish,
} from "../constants/index.js";

export const handleEnglish = async (msg, access_token, phone_no_id, from) => {
    if (
        msg?.type === "text" ||
        msg?.interactive?.button_reply?.id === "english"
    ) {
        console.log("Got here 2");
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
                        text: "How can I help you?",
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
                        text: "More services",
                    },
                    action: {
                        buttons: [
                            {
                                type: "reply",
                                reply: {
                                    id: "products",
                                    title: "Products & Services",
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

    // ----------------------FAQ----------------------
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
                    body: faqEnglish,
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
                        text: "Select your question",
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
                                rows: faqListEnOptions,
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

    // ----------------------Contact----------------------
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
                    body: "*Registered Office*\nThe Kerala State Financial Enterprises Ltd.\n“bhadratha”, Museum Road,\nP.b. No.510,Thrissur – 680 020\nPhone No: 0487 2332255\nToll Free No: 1800 425 3455\nFax: 0487 – 2336232\nE-Mail : mail@ksfe.com\n\nTo ask your queries, visit https://ksfe.com/contact-us",
                },
            },

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
            },
        });
    }

    // ----------------------Branch Locator----------------------
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
                    body: "Find your nearest branch\n\nhttps://ksfe.com/branch-locator",
                },
            },

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
            },
        });
    }

    //----------------------List Reply----------------------
    else if (msg?.interactive?.type === "list_reply") {
        let qn = await msg?.interactive?.list_reply?.id;
        // let ln = qn[0];

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
                        faqListEnglish[qn - 1].question +
                        `*\n\n` +
                        faqListEnglish[qn - 1].answer,
                },
            },

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
            },
        });
    }
};
