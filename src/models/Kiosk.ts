import { createSchema } from 'ts-mongoose';

import { v4 as uuid } from 'uuid';


const KioskSchema = createSchema({
    uniqueID: {
        type: String,
        unique: true,
        required: true,
        default: uuid()
    }
})

export default KioskSchema;

