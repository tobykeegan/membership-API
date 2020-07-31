"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import passport from "passport";
const authenticate_1 = __importDefault(require("../authenticate"));
const routes = express_1.default.Router();
routes.get('/', async (req, res) => {
    const user = req.get('kiosk-id');
    const auth = await authenticate_1.default(req.get('kiosk-id') || 'undefined', req.get('api-key') || 'undefined');
    if (auth) {
        res.status(200).json({ detectedUser: `Welcome, ${user}` });
    }
    else {
        res.status(403).json({ message: 'Unauthorised access denied.' });
    }
});
exports.default = routes;
