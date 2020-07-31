"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = __importDefault(require("body-parser"));
// import { Document, Model, model, Types, Schema, Query } from "mongoose"
const index_1 = __importDefault(require("./routes/index"));
// import passport from "passport";
// import { BasicStrategy } from "passport-http";
const connect_1 = __importDefault(require("./connect"));
const app = express_1.default();
const PORT = 3000;
exports.db = `mongodb://127.0.0.1:27017/?compressors=zlib&gssapiServiceName=mongodb/Membership-API`;
/** Call the connection from connect.ts
 * @param db - the URL for the MongoDB
 */
connect_1.default({ db: exports.db });
/**
 * We can increase the security of the API by using
 * the Helmet middleware to manage HTTP headers
 */
app.use(helmet_1.default());
/**
 * Additional middlewares are included beneath
 */
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
/**
 *  Import all the routes from external router
 */
app.use('/', index_1.default);
app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`);
});
