import { sendText } from "../constants/english.js";
import CallbackRequest from "../models/CallbackRequest.js";

const userDetails = new Map();

export const handleRequestCall = async (
    msg,
    access_token,
    phone_no_id,
    from
) => {
    if (msg?.interactive?.button_reply?.id === "request_call") {
        const userData = userDetails.get(from);
        if (userData?.length > 0) {
            const doc = await CallbackRequest.findone({ phone: from });
            doc.date = new Date();
            await doc.save();
        } else {
            userDetails.set(from, []);
            await sendText(
                phone_no_id,
                access_token,
                from,
                "What is your full name?"
            );
        }
    }
    if (msg?.type === "text") {
        const userData = userDetails.get(from);
        if (userData?.length === 0) {
            // userDetails.set(from, { name: msg.text });
            userData.push(msg?.text?.body);
            console.log("Len1 ->", userData);
            userDetails.set(from, userData);
            console.log("Len1 -> ", userDetails.get(from));
            await sendText(
                phone_no_id,
                access_token,
                from,
                "What is your email?"
            );
        } else if (userData?.length === 1) {
            // userDetails.set(from, { ...userData, email: msg.text });
            userData.push(msg?.text?.body);
            console.log("Len2 ->", userData);
            userDetails.set(from, userData);
            console.log("Len2 -> ", userDetails.get(from));
            await sendText(
                phone_no_id,
                access_token,
                from,
                "What is your district?"
            );
        } else if (userData?.length === 2) {
            // userDetails.set(from, { ...userData, district: msg.text });
            userData.push(msg?.text?.body);
            console.log("Len3 ->", userData);
            userDetails.set(from, userData);
            console.log("Len3 -> ", userDetails.get(from));
            const new_doc = new CallbackRequest({
                name: userData[0],
                email: userData[1],
                phone: from,
                district: userData[2],
                date: new Date(),
            });
            try {
                await new_doc.save();
                return "SUCCESS";
            } catch (error) {
                return "ERROR";
            }
        }
    }
};
