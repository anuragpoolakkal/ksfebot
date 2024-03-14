import { sendText } from "../constants/english.js";
import CallbackRequest from "../models/CallbackRequest.js";

const userDetails = new Map();

export const handleRequestCall = async (
    msg,
    access_token,
    phone_no_id,
    from,
    nameQn,
    emailQn,
    districtQn
) => {
    if (msg?.interactive?.button_reply?.id === "request_call") {
        const userData = userDetails.get(from);
        if (userData?.length > 0) {
            const userField = await CallbackRequest.findOne({ phone: from });
            // userField.date = new Date();
            const currentDate = new Date();
            const options = {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
                timeZone: "Asia/Kolkata", // Set the time zone to Indian Standard Time (IST)
            };

            const formattedDate = currentDate.toLocaleString("en-IN", options);

            userField.date = formattedDate;
            try {
                await userField.save();
                return "SUCCESS";
            } catch (err) {
                // console.error(err);
                console.log("Error occured!!");
                console.log(err);
                console.log("Error occured!!");

                return "ERROR";
            }
        } else {
            userDetails.set(from, []);
            await sendText(phone_no_id, access_token, from, nameQn);
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
            await sendText(phone_no_id, access_token, from, emailQn);
        } else if (userData?.length === 1) {
            // userDetails.set(from, { ...userData, email: msg.text });
            userData.push(msg?.text?.body);
            console.log("Len2 ->", userData);
            userDetails.set(from, userData);
            console.log("Len2 -> ", userDetails.get(from));
            await sendText(phone_no_id, access_token, from, districtQn);
        } else if (userData?.length === 2) {
            // userDetails.set(from, { ...userData, district: msg.text });
            userData.push(msg?.text?.body);
            console.log("Len3 ->", userData);
            userDetails.set(from, userData);
            console.log("Len3 -> ", userDetails.get(from));
            const currentDate = new Date();
            const options = {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
                timeZone: "Asia/Kolkata", // Set the time zone to Indian Standard Time (IST)
            };

            const formattedDate = currentDate.toLocaleString("en-IN", options);
            // console.log(formattedDate);
            const newData = new CallbackRequest({
                name: userData[0],
                email: userData[1],
                phone: from,
                district: userData[2],
                date: formattedDate,
            });
            try {
                await newData.save();
                return "SUCCESS";
            } catch (error) {
                console.log("Error occured!!");
                console.log(error);
                console.log("Error occured!!");
                return "ERROR";
            }
        }
    }
};
