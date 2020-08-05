import express from 'express';
import getUser from '../../dbfunctions/read/getUser';


const routes = express.Router();

/**
 *  GET User Object
 */
export default routes.get('/api/user/:id', async (req, res) => {
    if (req.auth) {
        // return user json data
        try {
            await getUser(req.params.id)
                .then((user) => {
                    res.status(200).json(user);
                })
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                .catch((err) => {
                    res.status(404).json({
                        message: 'User not found.',
                        failedID: req.params.id,
                    });
                });
        } catch (err) {
            res.status(400).json({
                message:
                    'The ID provided was invalid. It must be a string of 12 bytes.',
                failedID: req.params.id,
            });
        }
    } else {
        // reject noauth kiosks
        res.status(401).json({ message: 'Unauthorised access denied.' });
    }
});