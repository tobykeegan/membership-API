import { client, db } from '../dbinfo';
// import { ObjectId } from 'mongodb';


export default async (searchedUser: string): Promise<User> => {
    
    const conn = await client.connect(db);
    return (await conn
        .db('db')
        .collection('users')
        .findOne({ empId: searchedUser })) as User;
};
