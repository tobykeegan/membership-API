import express, { Application } from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import routes from "./routes/index";


const app: Application = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* We can increase the security of the API by using */
/* the Helmet middleware to manage HTTP headers     */
app.use(helmet());

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}`);
});


