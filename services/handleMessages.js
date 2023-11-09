import WhatsappCloudAPI from "whatsappcloudapi_wrapper";
import "dotenv/config";

const Whatsapp = new WhatsappCloudAPI({
	accessToken: process.env.Meta_WA_accessToken,
	senderPhoneNumberId: process.env.Meta_WA_SenderPhoneNumberId,
	WABA_ID: process.env.Meta_WA_wabaId,
});

const handleMessages = async (data) => {
	console.log(data);

	let incomingMessage = data.message;
	let recipientPhone = data.contacts.wa_id; // extract the phone number of sender
	let recipientName = data.contacts.profile.name;
	let typeOfMsg = incomingMessage.type; // extract the type of message (text, images, responses to buttons etc.)
	let message_id = incomingMessage.message_id; // extract the message id

	// Choose language
	if (typeOfMsg === "textMessage") {
		await Whatsapp.sendButtons({
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

	if (typeOfMsg === "replyButtonMessage") {
		let language = incomingMessage.button_reply.id;
		await Whatsapp.sendText({
			message: `Your language is ${incomingMessage.button_reply.title}`,
			recipientPhone: recipientPhone,
		});
	}

	// Handle text message
	if (language === "english") {
		await Whatsapp.sendButtons({
			message: `Hey ${recipientName}, \n\nI'm KSFE Customer Support bot. \n\nHow can I help you?`,
			recipientPhone: recipientPhone,
			listOfButtons: [
				{
					title: "FAQ",
					id: "faq",
				},
				{
					title: "Branch Locator",
					id: "branch_locator",
				},
				{
					title: "Contact",
					id: "contact",
				},
			],
		});
	}

	// Handle button response
	if (typeOfMsg === "replyButtonMessage") {
		let button_id = incomingMessage.button_reply.id;
		incomingMessage;
		if (button_id === "faq") {
			await Whatsapp.sendText({ message: "You pressed FAQ", recipientPhone });
		}

		if (button_id === "branch_locator") {
			await Whatsapp.sendText({ message: "You pressed Branch Locator", recipientPhone });
		}

		if (button_id === "contact") {
			await Whatsapp.sendText({ message: "You pressed Contact", recipientPhone });
		}
	}

	// Mark messages as read (read receipts)
	await Whatsapp.markMessageAsRead({ message_id });
};

export default handleMessages;
