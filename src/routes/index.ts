import express from 'express';
import getUser from '../dbfunctions/read/getUser';
import transaction from '../dbfunctions/update/transaction';

import getUserObject from './user/getUserObject';


const routes = express.Router();

routes.use('/', getUserObject)

/**
 * GET auth response
 */
routes.get('/', async (req, res) => {
    if (req.auth) {
        // authorised kiosks will see this message
        res.status(200).json({
            detectedUser: `${req.get('kiosk-id')} connected.`,
        });
    } else {
        // reject noauth kiosks
        res.status(401).json({ message: 'Unauthorised access denied.' });
    }
});




/**
 *  INCREMENT user balance
 */
routes.put('/api/user/balance/:id', async (req, res) => {
    if (req.auth) {
        const id = req.params.id as string;
        const value = req.body.value as number;

        try {
            const user = await getUser(id); // get original values for user

            if (user.balance + value >= 0) { // simple check if the transaction can proceed
                await transaction(id, value)    // call a MongoDB transaction
                    .then((data) => {       
                        res.status(200).json({
                            balance: data.value.balance.toFixed(2), // if succeeds then return new balance
                        });
                    })
                    .catch((err) => {
                        res.status(400).json({
                            message: 'An unexpected error has occured.',
                            failedID: id,
                            error: err,
                        });
                    });
            } else {
                res.status(403).json({
                    user: user,
                    message: 'Insufficient funds available.',
                });
            }
        } catch (err) {
            res.status(400).json({
                message: 'An unexpected error has occured.',
                failedID: id,
                error: err,
            });
        }
    } else {
        // reject noauth kiosks
        res.status(401).json({ message: 'Unauthorised access denied.' });
    }
});

export default routes;
