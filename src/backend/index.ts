import express from "express";
import { TechnologyRouter } from "./routes/technologyRoutes";
import { LoginRouter } from "./routes/loginRoutes"
import cors from "cors";
export const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api/technologies", TechnologyRouter);
app.use("/api/login", LoginRouter);

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});
