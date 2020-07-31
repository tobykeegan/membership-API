import express from 'express';
// import passport from "passport";
import authenticate from '../authenticate';
import getUser from '../dbfunctions/read/getUser';

const routes = express.Router();

const isAuth = async (
    kioskID: string | undefined,
    apikey: string | undefined,
) => {
    return await authenticate(kioskID || 'undefined', apikey || 'undefined');
};

/**
 * GET auth response
 */
routes.get('/', async (req, res) => {
    // call database auth function to validate kiosk
    const auth = isAuth(req.get('kioskID'), req.get('apikey'));

    if (auth) {
        // authorised kiosks will see this message
        res.status(200).json({ detectedUser: req.get('kioskID') });
    } else {
        // reject noauth kiosks
        res.status(403).json({ message: 'Unauthorised access denied.' });
    }
});

/**
 *  GET user balance
 */
routes.get('/user/:id', async (req, res) => {
    const auth = isAuth(req.get('kioskID'), req.get('apikey'));

    if (auth) {
        // return user json data

        const user = await getUser(req.params.id);

        console.log(user);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({
                message: 'User not found.',
                failedID: req.params.id,
            });
        }
    }
});

export default routes;
