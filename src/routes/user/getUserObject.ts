/* eslint-disable no-console */
import express from 'express';
import getUser from '../../dbfunctions/read/getUser';

const routes = express.Router();

function validateString(inp: string) {
    if (inp.length != 16) return false;
    const pattern = /[a-zA-Z0-9]{16}/;
    return pattern.test(inp);
}

/**
 *  GET User
 */
export default routes.get('/:id', async (req, res) => {
    try {
        if (!validateString(req.params.id)) throw Error;
        await getUser(req.params.id)
            .then((user) => {
                if (!user) {
                    throw Error;
                }
                const pin = req.get('code'); // get code from Headers

                // if kiosk has NOT provided PIN code
                if (!pin) {
                    res.status(406).json({
                        // 406 -> not acceptable (needs more info)
                        action: 'getPin', // request the client gets a PIN
                    }); //
                } else {
                    if (pin == user.empCode) {
                        // does pin match DB entry?
                        res.cookie('tapped', true).status(200).json({
                            action: 'showWelcome',
                            content: `Welcome, ${user.empFirstName}!`,
                        });
                    } else {
                        res.status(403).json({
                            // reject incorrect PIN
                            message: 'PIN code incorrect.',
                        });
                    }
                }
            })
            .catch((err) => {
                res.location('/api/register/:id');
                res.status(404).json({
                    action: 'register',
                    message: 'User not found.',
                    failedID: req.params.id,
                });
            });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        // } catch (err) {
        //     res.location('/api/register/:id');
        //     res.status(404).json({
        //         message: 'User not found.',
        //         failedID: req.params.id,
        //     });
        // }
    } catch (err) {
        res.status(400).json({
            message:
                'The ID provided was invalid. It must be a string of 16 alphanumeric characters.',
            failedID: req.params.id,
        });
    }
});
