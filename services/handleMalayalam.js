import axios from "axios";

const access_token = process.env.ACCESS_TOKEN;

export default async function handleMalayalam(data) {
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

            // Malayalam dummy message
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
                            body: "You chose Malayalam",
                        },
                    },

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer {{verify_token}}",
                    },
                });
            }
        }
    }
}
