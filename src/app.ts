import express, { Express, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import routes from './routes/index';
import authenticate from './authenticate';

const app: Express = express();
const PORT = process.env.PORT || 3000;

/**
 *  Use the custom authentication module for kiosk auth
 * @returns {boolean} req.auth
 */
async function validateKiosk(req: Request, res: Response, next: NextFunction) {
    const kiosk = req.get('kioskID') as string;
    const key = req.get('apiKey') as string;
    req.auth = await authenticate(kiosk, key);

    // let middleware handle rejection across all endpoints
    if (req.auth) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorised access denied.' });
    }
}

/**
 * We can increase the security of the API by using
 * the Helmet middleware to manage HTTP headers
 */
app.use(helmet());

app.use(validateKiosk);

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
    // eslint-disable-next-line no-console
    console.log(`The server is listening on port ${PORT}`);
});
