import express from "express";
import { environmentConfig } from "./.env.js";
import indexRoutes from "./routes/index.js";

const { PORT = 9000 } = environmentConfig;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", indexRoutes);

app.use("*", (req, res) => res.status(404).send("404 Not Found"));

app.listen(PORT, () => {
	console.log(`App now running and listening on port ${PORT}`);
});
