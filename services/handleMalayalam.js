import axios from "axios";

const access_token = process.env.ACCESS_TOKEN;

export default async function handleMalayalam(body_param) {
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
