import { Router } from "express";

import {index, save} from "../controllers/settingController";

const router = Router();

router.get("/", index);

router.post("/", save);

export default router;