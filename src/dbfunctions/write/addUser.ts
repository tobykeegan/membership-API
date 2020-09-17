import { client, db } from '../dbinfo';
import getUser from '../read/getUser';
// import { ObjectId } from 'mongodb';

export default async (newUser: User): Promise<boolean> => {
    const conn = await client.connect(db);

    if (await getUser(newUser.empId)) {
        return false;
    } else {
        try {
            conn.db('db').collection('Users').insertOne(newUser);

            return true;
        } catch (err) {
            // eslint-disable-next-line no-console
            return false;
        }
    }
};
