import { Router } from "express";
import fs from "fs";
import path from "path";

//TODO: Pourquoi je peux pas utiliser __dirname directement ?
const __dirname = path.resolve("./routes");
console.log(__dirname);

export default async app => {
    await Promise.all(
        fs
            .readdirSync("./routes")
            .filter(routename => routename !== "index.js")
            .map(async routename => {
                try {
                    const router = Router();
                    const { default: route} = await import(`./${routename}/index.js`);
                    route(router);
                    app.use(`./${routename}`, router);
                } catch (error) {
                    console.log(
                        `[ROUTING]: Cannot load ${routename} route. ${error.message}`
                    )
                }
            })
    );
}