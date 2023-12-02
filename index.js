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
    let data = req.body;

    console.log(JSON.stringify(data, null, 2));

    if (data.object) {
        if (
            data.entry &&
            data.entry[0].changes &&
            data.entry[0].changes[0].value.messages &&
            data.entry[0].changes[0].value.messages[0]
        ) {
            let phone_no_id =
                data.entry[0].changes[0].value.metadata.phone_number_id;
            let msg_id = data.entry[0].id;
            let from = data.entry[0].changes[0].value.messages[0].from;
            let msg = data.entry[0].changes[0].value.messages[0];
            let name = data.entry[0].changes[0].value.contacts[0].profile.name;

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

                if (msg?.interactive?.button_reply?.id === "english") {
                    await handleEnglish(data);
                }

                if (msg?.interactive?.button_reply?.id === "malayalam") {
                    await handleMalayalam(data);
                }

                // code for mark as read

                res.sendStatus(200);
            } else {
                res.sendStatus(400);
            }
        }
    }
});
