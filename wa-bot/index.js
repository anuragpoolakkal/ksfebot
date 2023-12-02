import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import "dotenv";

const app = express().use(bodyParser.json());

const verify_token = process.env.VERIFY_TOKEN;
// const phone_number_id = process.env.PHONE_NUMBER_ID;
const access_token =
	process.env.ACCESS_TOKEN ||
	"EAAVxDFkLGhEBO9AoLUSWg1t4iFyzJ7XvRLEGBFuVMTzJidiZANF3YtVp5lNEhQoMMO1LjoidVRKg1MAe7ZCsdZAx6kVbV0ZCxeSYbDZCfxTZCUb9Wn5H5EDX1ZB6SDKzchDCXy34mLQm1KyP7l1YCrBEqrRD8LUNB6SQDo5GZAuT9HeIgTG62ur3qy7af4MUFgZCGEAjxKgSUSRwKERRs3vYZD";

app.listen(8000 || process.env.PORT, () => {
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

app.post("/endpoint", (req, res) => {
	let body_param = req.body;

	console.log(JSON.stringify(body_param, null, 2));

	if (body_param.object) {
		if (
			body_param.entry &&
			body_param.entry[0].changes &&
			body_param.entry[0].changes[0].value.messages &&
			body_param.entry[0].changes[0].value.messages[0]
		) {
			let phone_no_id = body_param.entry[0].changes[0].value.metadata.phone_number_id;
			let msg_id = body_param.entry[0].id;
			let from = body_param.entry[0].changes[0].value.messages[0].from;
			let msg_body = body_param.entry[0].changes[0].value.messages[0].text.body;

			axios({
				method: "POST",
				url: "https://graph.facebook.com/v13.0/" + phone_no_id + "/messages?access_token=" + access_token,
				data: {
					messaging_product: "whatsapp",
					to: from,
					text: {
						body: "Hello brother, your message is " + msg_body,
					},
				},
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer {{verify-token}}",
				},
			});

			res.sendStatus(200);
		} else {
			res.sendStatus(400);
		}
	}
});
