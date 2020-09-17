import express from 'express';

/**
 *  Import routes
 */
import getUserObject from './user/getUserObject';
import registerUser from './user/registerUser';

const routes = express.Router();

/**
 *  Define endpoints for files here
 */
routes.use('/api/user', getUserObject);
routes.use('/api/register', registerUser);

/**
 * GET auth response
 */
routes.get('/', async (req, res) => {
    res.status(200).json({
        detectedUser: `${req.get('kioskID')} connected.`,
    });
});

/**
 *  INCREMENT user balance
 */
// routes.put('/api/user/balance/:id', async (req, res) => {
//     const id = req.params.id as string;
//     const value = req.body.value as number;

//     try {
//         const user = await getUser(id); // get original values for user

//         if (user.balance + value >= 0) {
//             // simple check if the transaction can proceed
//             await transaction(id, value) // call a MongoDB transaction
//                 .then((data) => {
//                     res.status(200).json({
//                         balance: data.value.balance.toFixed(2), // if succeeds then return new balance
//                     });
//                 })
//                 .catch((err) => {
//                     res.status(400).json({
//                         message: 'An unexpected error has occured.',
//                         failedID: id,
//                         error: err,
//                     });
//                 });
//         } else {
//             res.status(403).json({
//                 user: user,
//                 message: 'Insufficient funds available.',
//             });
//         }
//     } catch (err) {
//         res.status(400).json({
//             message: 'An unexpected error has occured.',
//             failedID: id,
//             error: err,
//         });
//     }
// });

export default routes;
