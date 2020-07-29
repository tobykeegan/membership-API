import { createSchema } from 'ts-mongoose';

import { v4 as uuid } from 'uuid';


const UserSchema = createSchema({
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

export default UserSchema;