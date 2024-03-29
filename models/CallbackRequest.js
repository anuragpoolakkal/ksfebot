import mongoose from "mongoose";

const callbackRequestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    district: {
        type: String,
    },
    date: {
        type: String,
    },
});

const CallbackRequest = mongoose.model(
    "CallbackRequest",
    callbackRequestSchema
);

export default CallbackRequest;
