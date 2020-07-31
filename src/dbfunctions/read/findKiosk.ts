import { client, db } from '../dbinfo'

export interface Kiosk {
    _id: string
    kioskID: string
    apiKey: string
}

export const findKiosk = async (searchedForKiosk: string): Promise<Kiosk> =>
    new Promise((resolve) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        client.connect(db, async function (err: Error, db: any) {
            if (err) throw err
            const res = await db
                .db('db')
                .collection('kiosks')
                .findOne({ kioskID: searchedForKiosk })
            resolve(res)
        })
    })

