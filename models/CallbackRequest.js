import mongoose from "mongoose";

const callbackRequestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    district: {
        type: String,
    },
    date: {
        type: Date,
    },
});

const CallbackRequest = mongoose.model(
    "CallbackRequest",
    callbackRequestSchema
);

export default CallbackRequest;
