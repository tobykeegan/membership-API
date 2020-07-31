import mongoose, { Schema, Document } from "mongoose"

import { v4 as uuid } from 'uuid';

export interface IUser extends Document {

    firstName: string;
    lastName: string;

}

const UserSchema = new Schema({
    uniqueID: {
        type: String,
        unique: true,
        required: true,
        default: uuid()
    },

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    balance: {
        type: Number,
        required: true,
        default: 0
    }
})

export default mongoose.model < IUser > ('User', UserSchema);