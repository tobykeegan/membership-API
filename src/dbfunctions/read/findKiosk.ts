import { client, db } from '../dbinfo';

/**
 * @param {string} searchedForKiosk - kioskID
 * @returns {Kiosk | null} an <Kiosk> object from the database or null if not exists.
 */
export default async (searchedForKiosk: string): Promise<Kiosk> => {
    // connect to the database
    const conn = await client.connect(db);
    // return search value
    return (await conn
        .db('db')
        .collection('Kiosks')
        .findOne({ kioskID: searchedForKiosk })) as Kiosk;
};
