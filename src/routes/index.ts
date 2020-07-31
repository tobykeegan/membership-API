import express from 'express';
// import passport from "passport";
import authenticate from '../authenticate';

const routes = express.Router();

routes.get('/', async (req, res) => {
    const user = req.get('kiosk-id');
    const auth = await authenticate(
        req.get('kiosk-id') || 'undefined',
        req.get('api-key') || 'undefined',
    );

    if (auth) {
        res.status(200).json({ detectedUser: `Welcome, ${user}` });
    } else {
        res.status(403).json({ message: 'Unauthorised access denied.' });
    }
});

export default routes;
