import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import "dotenv/config";

import { handleEnglish } from "./handlers/handleEnglish.js";
import { handleMalayalam } from "./handlers/handleMalayalam.js";

const preferredLanguage = new Map();

const router = express().use(bodyParser.json());

const verify_token = process.env.VERIFY_TOKEN;
const access_token = process.env.ACCESS_TOKEN;

router.listen(process.env.PORT || 9000, () => {
    console.log(
        `Webhook is listening\nAccess token: ` +
            access_token +
            `\nVerify token: ` +
            verify_token
    );
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
                let language = preferredLanguage.get(phone_no_id);

                // Welcome message and language selection

                if (msg?.type === "text" && language === undefined) {
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
                        preferredLanguage.set(phone_no_id, "english");
                        language = "english";
                    }

                    // ---------Malayalam-------------

                    if (msg?.interactive?.button_reply?.id === "malayalam") {
                        preferredLanguage.set(phone_no_id, "malayalam");
                        language = "malayalam";
                    }
                }

                if (language === "english") {
                    handleEnglish(msg, access_token, phone_no_id, from);
                } else if (language === "malayalam") {
                    handleMalayalam(msg, access_token, phone_no_id, from);
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
