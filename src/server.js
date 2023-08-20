import express from "express"
import {createClient} from "redis";
import { config } from "dotenv";
import { router } from "./router.js"
config();
const { SERVER_PORT } = process.env;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("frontend"));
app.use(router)
app.listen(SERVER_PORT, () => {
    console.log(`Server started ${SERVER_PORT}`);
})