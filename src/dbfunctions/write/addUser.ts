import { client, db } from '../dbinfo';
import getUser from '../read/getUser';
// import { ObjectId } from 'mongodb';

export default async (newUser: User): Promise<boolean> => {
    console.log(`New user passed`);
    const conn = await client.connect(db);

    if (await getUser(newUser.empId)) {
        console.log(
            `Employee found to exist: ${newUser.empFirstName} with ID ${newUser.empId}`,
        );
        return false;
    } else {
        try {
            conn.db('db').collection('Users').insertOne(newUser);

            return true;
        } catch (err) {
            // eslint-disable-next-line no-console
            console.log(err);
            return false;
        }
    }
};
