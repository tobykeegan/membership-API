import { client, db } from '../dbinfo';


/**
 * @interface Kiosk represents the Kiosk document in MongoDB
 */
export interface Kiosk {
    _id: number;
    kioskID: string;
    apiKey: string;
}

/**
 * @param {string} searchedForKiosk - kioskID
 * @returns {Kiosk | null} an <Kiosk> object from the database or null if not exists.
 */
export default async (searchedForKiosk: string): Promise<Kiosk> => {
    return (await (await client.connect(db))
        .db('db')
        .collection('kiosks')
        .findOne({ kioskID: searchedForKiosk })) as Kiosk;
};
