import { Router } from "express";
import fs from "fs";
import path from "path";

//TODO: Pourquoi je peux pas utiliser __dirname directement ?
const __dirname = path.resolve("./api");
console.log(__dirname);

export default async app => {
    await Promise.all(
        fs
            .readdirSync("./api")
            .filter(routename => routename !== "index.js")
            .map(async routename => {
                try {
                    const router = Router();
                    const route = import(`./${routename}`);
                    route(router);
                    app.use(`./${routename}`, router);
                } catch (error) {
                    console.log(
                        `[ROUTING]: Cannot load ${routename} route. ${error.message}`
                    )
                }
            })
    );
    console.log("Routes initialized");
}