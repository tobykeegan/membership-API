import { client, db } from '../dbinfo';
import { ObjectId } from 'mongodb';

export interface User {
    _id: number;
    firstName: string;
    lastName: string;
    balance: string;
}

export default async (searchedUser: string, increment: number): Promise<User> => {
    return (await (await client.connect(db))
        .db('db')
        .collection('users')
        .findOneAndUpdate({ _id: new ObjectId(searchedUser) }, { "$inc" : {"balance": increment}})) as User;
};
