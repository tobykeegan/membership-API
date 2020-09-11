/* eslint-disable no-console */
import express from 'express';
import getUser from '../../dbfunctions/read/getUser';

const routes = express.Router();

function validateString(inp: string) {
    const pattern = /[a-zA-Z0-9]{16}/;
    return pattern.test(inp);
}

/**
 *  GET User Object
 */
export default routes.get('/api/user/:id', async (req, res) => {
    // return user json data

    try {
        if (!validateString(req.params.id)) throw Error;
        await getUser(req.params.id)
            .then((user) => {
                res.status(200).json({
                    action: 'showWelcome',
                    content: `Welcome, ${user.empFirstName}!`,
                });
            })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .catch((err) => {
                res.location('/api/register/:id');
                res.status(404).json({
                    message: 'User not found.',
                    failedID: req.params.id,
                });
            });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message:
                'The ID provided was invalid. It must be a string of 16 alphanumeric characters.',
            failedID: req.params.id,
        });
    }
});
