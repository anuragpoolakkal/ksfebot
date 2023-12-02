import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import "dotenv/config";

import handleEnglish from "./services/handleEnglish.js";
import handleMalayalam from "./services/handleMalayalam.js";

const app = express().use(bodyParser.json());

const verify_token = process.env.VERIFY_TOKEN;
const access_token = process.env.ACCESS_TOKEN;

app.listen(process.env.PORT || 9000, () => {
    console.log("Webhook is listening");
});

app.get("/endpoint", (req, res) => {
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
});

app.post("/endpoint", async (req, res) => {
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
                body_param.entry[0].changes[0].value.metadata.phone_number_id;
            let msg_id = body_param.entry[0].id;
            let from = body_param.entry[0].changes[0].value.messages[0].from;
            let msg = body_param.entry[0].changes[0].value.messages[0];
            let name =
                body_param.entry[0].changes[0].value.contacts[0].profile.name;

            // Welcome message and language selection

            if (msg?.type === "text") {
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
                        Authorization: "Bearer {{verify_token}}",
                    },
                });
            }

            if (msg?.interactive?.type === "button_reply") {
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
                                                title: "Contact",
                                            },
                                        },
                                    ],
                                },
                            },
                        },

                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer {{verify_token}}",
                        },
                    });
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
                            type: "text",
                            text: {
                                body: "You chose Malayalam",
                            },
                        },

                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer {{verify_token}}",
                        },
                    });
                }

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
                                body: "1. What are the main attractions of enrolling in KSFE Chitties over enrollment in other savings instruments?\n\n2. I hear that the security norms of KSFE for various schemes are rigid and cumbersome. Is it true?\n\n3. What are the advantages of the Consumer/Vehicle Loan Scheme of KSFE over similar schemes of the other institutions?\n\n4. What are the advantages of the KSFE Housing Loan over similar schemes of other institutions?\n\n5. What are the main attractions of Gold Loan Scheme of KSFE?\n\n6. What are the main attractions of Chitty Loan Scheme?\n\n7. I hear that the granting of chitty prize money and advance will involve delay in KSFE?\n\n8. Is there a system of redressal of complaints, if I have any?\n\n9. How is the line of control over branches structured?\n\n10. I hear that nowadays KSFE Chitty scheme opens its door to NRI's also?\n\nReply the number with the question.",
                            },
                        },

                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer {{verify_token}}",
                        },
                    });
                }

                if (msg?.interactive?.button_reply?.id === "contact") {
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
                                body: "You selected Contact",
                            },
                        },

                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer {{verify_token}}",
                        },
                    });
                }

                if (msg?.interactive?.button_reply?.id === "branch_locator") {
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
                                body: "You selected Branch Locator",
                            },
                        },

                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer {{verify_token}}",
                        },
                    });
                }
            }

            // code for mark as read
        }
    }
});
