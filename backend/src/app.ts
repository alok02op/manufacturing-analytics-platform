import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import routes from './routes/index.js'
import { errorMiddleware } from "./middleware/error.middleware.js"
import { notFoundHandler } from "./middleware/notFound.middleware.js"

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.use(notFoundHandler);
app.use(errorMiddleware);

export default app



