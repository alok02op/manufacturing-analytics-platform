import express from "express"
import cors from "cors"
import routes from './routes/index.js'
import { errorHandler } from "./middleware/error.middleware.js"
import { notFoundHandler } from "./middleware/notFound.middleware.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app



