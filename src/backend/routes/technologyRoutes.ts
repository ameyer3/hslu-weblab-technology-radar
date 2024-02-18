import { Router } from "express";
import { getAllTechnologies, createNewTechnology, updateTechnology } from "../controllers/technologyController";

const router = Router();

router.get("/", getAllTechnologies);
router.post("/", createNewTechnology);
router.put("/", updateTechnology);


export const TechnologyRouter = router;