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

            // code here
        }
    }
}
