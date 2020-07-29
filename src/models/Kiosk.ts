import { truncate } from "fs";
import { createSchema, Type, typedModel } from 'ts-mongoose';

import { v4 as uuid } from 'uuid';


const UserSchema = createSchema({
    uniqueID: {
        type: String,
        unique: true,
        required: true,
        default: uuid()
    }
})

