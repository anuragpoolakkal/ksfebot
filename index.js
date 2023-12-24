import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import "dotenv/config";

import {
    faqEnglish,
    faqListEnglish,
    faqListEnOptions,
    faqMalayalam,
    faqListMalayalam,
    faqListMlOptions,
} from "./constants/index.js";

const router = express().use(bodyParser.json());

const verify_token = process.env.VERIFY_TOKEN;
const access_token = process.env.ACCESS_TOKEN;

router.listen(process.env.PORT || 9000, () => {
    console.log("Webhook is listening");
});

router.get("/", (req, res) => {
    res.status(200).send("200 | Server Running");
});

router.get("/endpoint", (req, res) => {
    try {
        let mode = req.query["hub.mode"];
        let challenge = req.query["hub.challenge"];
        let token = req.query["hub.verify_token"];

        if (mode && token) {
            if (mode === "subscribe" && token === verify_token) {
                res.status(200).send(challenge);
            } else {
                res.status(403);
            }
        }

        res.send("KSFE /endpoint");
    } catch (error) {
        console.error({ error });
        return res.sendStatus(500);
    }
});

router.post("/endpoint", async (req, res) => {
    try {
        let body_param = req.body;

        console.log(JSON.stringify(body_param, null, 2));

        if (body_param.object) {
            if (
                body_param.entry &&
                body_param.entry[0].changes &&
                body_param.entry[0].changes[0].value.messages &&
                body_param.entry[0].changes[0].value.messages[0]
            ) {
                let phone_no_id =
                    body_param.entry[0].changes[0].value.metadata
                        .phone_number_id;
                let msg_id = body_param.entry[0].id;
                let from =
                    body_param.entry[0].changes[0].value.messages[0].from;
                let msg = body_param.entry[0].changes[0].value.messages[0];
                let name =
                    body_param.entry[0].changes[0].value.contacts[0].profile
                        .name;

                // Welcome message and language selection

                if (msg?.type === "text") {
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
                                    text:
                                        "Hey " +
                                        name +
                                        ", I'm KSFE Customer Support bot. Your message is '" +
                                        msg?.text?.body +
                                        "'.\n\nChoose your language / ഭാഷ തിരഞ്ഞെടുക്കുക",
                                },
                                action: {
                                    buttons: [
                                        {
                                            type: "reply",
                                            reply: {
                                                id: "english",
                                                title: "English",
                                            },
                                        },
                                        {
                                            type: "reply",
                                            reply: {
                                                id: "malayalam",
                                                title: "മലയാളം",
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

                if (msg?.interactive?.type === "button_reply") {
                    if (msg?.interactive?.button_reply?.id === "english") {
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
                    }

                    // if (msg?.interactive?.button_reply?.id === "malayalam") {
                    //     axios({
                    //         method: "POST",
                    //         url:
                    //             "https://graph.facebook.com/v13.0/" +
                    //             phone_no_id +
                    //             "/messages?access_token=" +
                    //             access_token,
                    //         data: {
                    //             messaging_product: "whatsapp",
                    //             to: from,
                    //             type: "text",
                    //             text: {
                    //                 body: "You chose Malayalam",
                    //             },
                    //         },

                    //         headers: {
                    //             "Content-Type": "application/json",
                    //             Authorization: `Bearer ${access_token}`,
                    //         },
                    //     });
                    // }

                    // ---------Malayalam-------------

                    if (msg?.interactive?.button_reply?.id === "malayalam") {
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
                    }
                    // -----------------------------

                    if (msg?.interactive?.button_reply?.id === "faq") {
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

                    // --------------FAQ Malayalam ----------

                    if (msg?.interactive?.button_reply?.id === "faq-m") {
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

                    //  --------------

                    if (msg?.interactive?.button_reply?.id === "contact") {
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

                    // --------------Contact Malayalam ----------

                    if (msg?.interactive?.button_reply?.id === "contact-m") {
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
                                    body: "*Registered Office*\n\nകേരള സ്റ്റേറ്റ് ഫിനാൻഷ്യൽ എന്റർപ്രൈസസ് ലിമിറ്റഡ്\n“ഭദ്രത”, മ്യൂസിയം റോഡ്,\nP.b. No.510,Thrissur – 680 020\nഫോൺ No: 0487 2332255\nടോൾ ഫ്രീ No: 1800 425 3455\nഫാക്സ്: 0487 – 2336232\nE-Mail : mail@ksfe.com\n\nനിങ്ങളുടെ ചോദ്യങ്ങൾ ചോദിക്കുന്നതിന്, സന്ദർശിക്കുക https://ksfe.com/contact-us",
                                },
                            },

                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${access_token}`,
                            },
                        });
                    }

                    // ----------------------------

                    if (
                        msg?.interactive?.button_reply?.id === "branch_locator"
                    ) {
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

                    // -------Branch Locator Malayalam ------------
                    if (
                        msg?.interactive?.button_reply?.id ===
                        "branch_locator-m"
                    ) {
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

                    // ----------------------------
                }

                if (msg?.interactive?.type === "list_reply") {
                    let qn = await msg?.interactive?.list_reply?.id;
                    let ln = qn[0];
                    if (ln === "m") {
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
                    } else {
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
                }

                // mark as read
                let wamid = await body_param.entry[0].changes[0].value
                    .messages[0].id;
                await axios({
                    method: "POST",
                    maxBodyLength: 999999,
                    url:
                        "https://graph.facebook.com/v13.0/" +
                        phone_no_id +
                        "/messages?access_token=" +
                        access_token,
                    data: {
                        messaging_product: "whatsapp",
                        status: "read",
                        message_id: wamid,
                    },

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${access_token}`,
                    },
                });
            }
        }
        console.log("POST: Someone is pinging!");
        return res.sendStatus(200);
    } catch (error) {
        console.error({ error });
        return res.sendStatus(500);
    }
});
