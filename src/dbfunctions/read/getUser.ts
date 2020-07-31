import { client, db } from '../dbinfo';
import { ObjectId } from 'mongodb';

export interface User {
    _id: number;
    firstName: string;
    lastName: string;
    balance: string;
}

export default async (searchedForUser: string): Promise<User> =>
    new Promise((resolve, reject) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        client.connect(db, async function (err: Error, db: any) {
            // if (err) reject(err);
            try{
                const res = await db
                .db('db')
                .collection('users')
                .findOne({ _id: new ObjectId(searchedForUser) });
            resolve(res);
            }catch(err){
                reject(err);
            }

        });
    });
