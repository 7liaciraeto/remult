import express from "express";
import { createRemultServer } from "../../core/server/index";
import { Task } from "../shared/Task";
import { remult } from "../../core";

const app = express();
app.use(express.json());

const api = createRemultServer({ entities: [Task] });
app.use(async (req, res, next) => {
    await api.handle(req, res) || next()
});
app.get('/api/test', api.withRemult, async (req, res) => {
    res.json({ result: await remult.repo(Task).count() })
})
const port = 3005;
app.listen(port, () => console.log("mw " + port));