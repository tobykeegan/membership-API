import express, { Express, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import routes from './routes/index';
import authenticate from './authenticate';
import cookieParser from 'cookie-parser';

const app: Express = express();
const PORT = process.env.PORT || 3000;

const maxSessionLength = 120; // in seconds

app.use(helmet())
    .use(cookieParser())
    .use(validateKiosk)
    .use(auth)
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }));

/**
 *  Use the custom authentication module for kiosk auth
 * @returns {boolean} req.auth
 */
async function validateKiosk(req: Request, res: Response, next: NextFunction) {
    const kiosk = req.get('kioskID') as string;
    const key = req.get('apiKey') as string;
    await authenticate(kiosk, key)
        .then((auth) => {
            if (auth) {
                next();
            } else {
                res.status(401).json({
                    message: 'Unauthorised Kiosk',
                });
            }
        })
        .catch((err) => {
            // console.log(err);
            res.status(500).send(err);
            next();
        });
}
async function auth(req: Request, res: Response, next: NextFunction) {
    if (req.headers.cookie) {
        const cookieAge = Math.round(
            (Date.now() - (req.cookies.lastAccess as number)) / 1000,
        );

        // detect if a session has expired
        if (cookieAge > maxSessionLength || req.cookies.tapped == 'true') {
            // delete the cookies if the session has expired
            res.clearCookie('reqID')
                .clearCookie('lastAccess')
                .clearCookie('tapped')
                .status(403) // return 403 forbidden
                .json({
                    message: 'Session has expired. Goodbye',
                });
        } else {
            if (req.url.includes('/api/user')) {
                // refresh the last access time to keep session from expiring
                res.cookie('lastAccess', Date.now());
            }
            next();
        }
    } else {
        // is the user trying to log in?
        if (req.url.includes('/api/user')) {
            const reqID = req.url.substr(10, 16);
            // set the cookies for a new session
            res.cookie('reqID', reqID).cookie('lastAccess', Date.now());
        }
        // continue to the app
        
        next();
    }
}

app.use('/', routes).listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`The server is listening on port ${PORT}`);
});
