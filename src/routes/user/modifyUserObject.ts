import express from 'express';
import getUser from '../../dbfunctions/read/getUser';

const routes = express.Router();

export default routes.put('/api/user/:id', async (req, res) => {
    if (req.auth) {
        // start by defining the user to modify
        const user = req.params.id as string;
    } else {
        // reject noauth kiosks
        res.status(401).json({ message: 'Unauthorised access denied.' });
    }
});
