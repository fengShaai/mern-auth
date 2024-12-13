import express from "express";
import { createNotes, getNote, getNotes } from "../controllers/note.controller.js";

const router = express.Router();

router.get("/", getNotes);
router.post("/", createNotes);
router.get("/:id", getNote);

export default router;