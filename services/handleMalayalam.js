import WhatsappCloudAPI from "whatsappcloudapi_wrapper";
import "dotenv/config";

const bot = new WhatsappCloudAPI({
    accessToken: process.env.Meta_WA_accessToken,
    senderPhoneNumberId: process.env.Meta_WA_SenderPhoneNumberId,
    WABA_ID: process.env.Meta_WA_wabaId,
});

export default async function handleMalayalam(data) {
    let incomingMessage = data.message;
    let recipientPhone = data.contacts.wa_id; // extract the phone number of sender
    let recipientName = data.contacts.profile.name;
    let typeOfMsg = incomingMessage.type; // extract the type of message (text, images, responses to buttons etc.)
    let message_id = incomingMessage.message_id; // extract the message id

    await bot.sendText({
        message: "You chose Malayalam",
        recipientPhone: recipientPhone,
    });

    // Mark messages as read (read receipts)
    await bot.markMessageAsRead({ message_id });
}
