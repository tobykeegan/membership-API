import { client, db } from '../dbinfo';
import { ObjectId } from 'mongodb';




export default async (
    searchedUser: string,
    increment: number,
): Promise<FundsOverview> => {
    const filter = { _id: new ObjectId(searchedUser) };
    const update = { $inc: { balance: increment } };
    const options = { returnOriginal: false };

    return (await (await client.connect(db))
        .db('db')
        .collection('users')
        .findOneAndUpdate(filter, update, options)) as FundsOverview;
};
