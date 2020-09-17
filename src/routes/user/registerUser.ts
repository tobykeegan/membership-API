/* eslint-disable no-console */
import express from 'express';
import addUser from '../../dbfunctions/write/addUser';
// import { body, check } from 'express-validator';
const routes = express.Router();

export default routes.post('/:id', async (req, res) => {

    // add the employee ID to the object
    Object.assign(req.body, { empId: req.params.id as string });
    
    console.log("Employee being added:");
    console.info(req.body)



    await addUser(req.body)
        .then((result) => {
            console.log(result)
            if(result){
                res.sendStatus(201); // return 201 - created if the resource was created
            }else{
                res.status(409).json({
                    message: 'Failed - user already exists',
                });
            }
            
        })
        .catch((err) => {
            res.status(500).json({
                message: 'The server failed to create a user',
                error: err,
            });
        });
});


