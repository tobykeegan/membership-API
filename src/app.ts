import express, { Express, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import routes from './routes/index';
import authenticate from './authenticate';

const app: Express = express();
const PORT = 8080;

/**
 *  Use the custom authentication module for kiosk auth
 * @returns {boolean} req.auth
 */
async function validateKiosk(req: Request, res: Response, next: NextFunction) {
    const kiosk = req.get('kiosk-id') as string;
    const key = req.get('api-key') as string;
    req.auth = await authenticate(kiosk, key);
    next();
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
