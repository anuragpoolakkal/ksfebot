import axios from "axios";

const access_token = process.env.ACCESS_TOKEN;

export default async function handleEnglish(body_param) {
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

            // Choose service
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
                            text: "How can I help you?",
                        },
                        action: {
                            buttons: [
                                {
                                    type: "reply",
                                    reply: {
                                        id: "faq",
                                        title: "Questions",
                                    },
                                },
                                {
                                    type: "reply",
                                    reply: {
                                        id: "branch_locator",
                                        title: "Branch Locator",
                                    },
                                },
                                {
                                    type: "reply",
                                    reply: {
                                        id: "contact",
                                        title: "Contact",
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

            // FAQ List
            if (msg?.nteractive?.type === "button_reply") {
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
                                body: "1. What are the main attractions of enrolling in KSFE Chitties over enrollment in other savings instruments?\n\n2. I hear that the security norms of KSFE for various schemes are rigid and cumbersome. Is it true?\n\n3. What are the advantages of the Consumer/Vehicle Loan Scheme of KSFE over similar schemes of the other institutions?\n\n4. What are the advantages of the KSFE Housing Loan over similar schemes of other institutions?\n\n5. What are the main attractions of Gold Loan Scheme of KSFE?\n\n6. What are the main attractions of Chitty Loan Scheme?\n\n7. I hear that the granting of chitty prize money and advance will involve delay in KSFE?\n\n8. Is there a system of redressal of complaints, if I have any?\n\n9. How is the line of control over branches structured?\n\n10. I hear that nowadays KSFE Chitty scheme opens its door to NRI's also?\n\nReply the number with the question.",
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
}
