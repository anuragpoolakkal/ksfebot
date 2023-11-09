import express from "express";
import WhatsappCloudAPI from "whatsappcloudapi_wrapper";
import "dotenv/config";
import handleEnglish from "../services/handleEnglish.js";
import handleMalayalam from "../services/handleMalayalam.js";

const router = express.Router();

const bot = new WhatsappCloudAPI({
    accessToken: process.env.Meta_WA_accessToken,
    senderPhoneNumberId: process.env.Meta_WA_SenderPhoneNumberId,
    WABA_ID: process.env.Meta_WA_wabaId,
});

router.get("/endpoint", (req, res) => {
    try {
        console.log("GET: Someone is pinging!");

        const mode = req.query["hub.mode"];
        const token = req.query["hub.verify_token"];
        const challenge = req.query["hub.challenge"];

        if (
            mode &&
            token &&
            mode === "subscribe" &&
            process.env.Meta_WA_VerifyToken === token
        ) {
            return res.status(200).send(challenge);
        } else {
            return res.sendStatus(403);
        }
    } catch (error) {
        console.error({ error });
        return res.sendStatus(500);
    }
});

router.post("/endpoint", async (req, res) => {
    try {
        let data = bot.parseMessage(req.body);
        console.log(data);

        if (data?.isMessage) {
            console.log(data);

            let incomingMessage = data.message;
            let recipientPhone = data.contacts.wa_id; // extract the phone number of sender
            let recipientName = data.contacts.profile.name;
            let typeOfMsg = incomingMessage.type; // extract the type of message (text, images, responses to buttons etc.)
            let message_id = incomingMessage.message_id; // extract the message id

            // Choose language
            if (typeOfMsg === "textMessage") {
                await bot.sendButtons({
                    message: "Choose your language / ഭാഷ തിരഞ്ഞെടുക്കുക",
                    recipientPhone: recipientPhone,
                    listOfButtons: [
                        {
                            title: "English",
                            id: "english",
                        },
                        {
                            title: "മലയാളം",
                            id: "malayalam",
                        },
                    ],
                });
            }

            let language;

            if (typeOfMsg === "replyButtonMessage") {
                language = await incomingMessage.button_reply.id;
                await bot.sendText({
                    message: `Your language is ${incomingMessage.button_reply.title}`,
                    recipientPhone: recipientPhone,
                });
            }

            // mark as read
            await bot.markMessageAsRead({ message_id });

            if (language === "malayalam") {
                handleMalayalam(data);
            } else {
                handleEnglish(data);
            }
        }

        console.log("POST: Someone is pinging!");
        return res.sendStatus(200);
    } catch (error) {
        console.error({ error });
        return res.sendStatus(500);
    }
});

export default router;
