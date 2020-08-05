import { client, db } from '../dbinfo';
import { ObjectId } from 'mongodb';

export default async (searchedUser: string): Promise<User> => {
    return (await (await client.connect(db))
        .db('db')
        .collection('users')
        .findOne({ _id: new ObjectId(searchedUser) })) as User;
};
