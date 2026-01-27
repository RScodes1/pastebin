import express from "express";
import { create, fetch } from "../controllers/pasteController.js";

const router = express.Router();

router.post("/", create);
router.get("/:id", fetch);

export default router;
