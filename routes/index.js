import express from "express";
import WhatsappCloudAPI from "whatsappcloudapi_wrapper";
import "dotenv/config";
import handleMessages from "../services/handleMessages.js";

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

		if (mode && token && mode === "subscribe" && process.env.Meta_WA_VerifyToken === token) {
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
			await handleMessages(data);
		}

		console.log("POST: Someone is pinging!");
		return res.sendStatus(200);
	} catch (error) {
		console.error({ error });
		return res.sendStatus(500);
	}
});

export default router;
