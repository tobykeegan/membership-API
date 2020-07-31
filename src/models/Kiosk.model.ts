import mongoose, { Schema, Document } from 'mongoose';

import { v4 as uuid } from 'uuid';

export interface IKiosk extends Document {
    kioskID: string;
    apikey: string;
}

const KioskSchema = new Schema({
    kioskID: {
        type: String,
        unique: true,
        required: true,
    },

    apikey: {
        type: String,
        unique: true,
        required: true,
        default: uuid(),
    },
});

export default mongoose.model<IKiosk>('Kiosk', KioskSchema);
