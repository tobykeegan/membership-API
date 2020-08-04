import { client, db } from '../dbinfo';
import { ObjectId } from 'mongodb';

export interface User {
    _id: number;
    firstName: string;
    lastName: string;
    balance: number;
}

export default async (searchedUser: string): Promise<User> => {
    return (await (await client.connect(db))
        .db('db')
        .collection('users')
        .findOne({ _id: new ObjectId(searchedUser) })) as User;
};
