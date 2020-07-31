import express, { Application } from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
// import { Document, Model, model, Types, Schema, Query } from "mongoose"
import routes from './routes/index';
// import passport from "passport";
// import { BasicStrategy } from "passport-http";

const app: Application = express();
const PORT = 3000;

/**
 * We can increase the security of the API by using
 * the Helmet middleware to manage HTTP headers
 */

app.use(helmet());

/**
 * Additional middlewares are included beneath
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 *  Import all the routes from external router
 */
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`);
});
