import WhatsappCloudAPI from "whatsappcloudapi_wrapper";
import "dotenv/config";

const bot = new WhatsappCloudAPI({
    accessToken: process.env.Meta_WA_accessToken,
    senderPhoneNumberId: process.env.Meta_WA_SenderPhoneNumberId,
    WABA_ID: process.env.Meta_WA_wabaId,
});

export default async function handleEnglish(data) {
    let incomingMessage = data.message;
    let recipientPhone = data.contacts.wa_id; // extract the phone number of sender
    let recipientName = data.contacts.profile.name;
    let typeOfMsg = incomingMessage.type; // extract the type of message (text, images, responses to buttons etc.)
    let message_id = incomingMessage.message_id; // extract the message id

    // Handle text message

    await bot.sendButtons({
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

    // Handle button response
    if (typeOfMsg === "replyButtonMessage") {
        let button_id = incomingMessage.button_reply.id;
        incomingMessage;
        if (button_id === "faq") {
            await bot.sendText({ message: "You pressed FAQ", recipientPhone });
        }

        if (button_id === "branch_locator") {
            await bot.sendText({
                message: "You pressed Branch Locator",
                recipientPhone,
            });
        }

        if (button_id === "contact") {
            await bot.sendText({
                message: "You pressed Contact",
                recipientPhone,
            });
        }
    }

    // Mark messages as read (read receipts)
    await bot.markMessageAsRead({ message_id });
}
