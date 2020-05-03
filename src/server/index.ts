import * as express from 'express';
import * as https from 'express-force-https';
import errorMessage from './errors';
const dotenv = require('dotenv');
dotenv.config();

const {
    APP_BASE_URL = '/',
    PORT = 8080,
    NODE_ENV = 'development',
} = process.env;

const app = express();

app.set('view engine', 'ejs');

app.use(https);

app.set('views', 'public/');
app.use(APP_BASE_URL, express.static('public'));

app.get(APP_BASE_URL, (req, res) => {
    res.render('index');
});

app.listen(PORT, () =>
    console.log(`Server started at ${new Date().toString()}`)
);

app.use(
    (
        err: Error,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        errorMessage(err.message, res);
    }
);
