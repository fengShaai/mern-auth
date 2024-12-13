import Note from "../models/note.model.js";
import mongoose from "mongoose";

export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({});
        res.status(200).json({ success: true, data: notes });
    } catch (error) {
        console.log("error in fetching products:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const createNotes = async (req, res) => {
    const note = req.body; // user will send this data

    if (!note.name || !note.body) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    const newNote = new Note(note);

    try {
        await newNote.save();
        res.status(201).json({ success: true, data: newNote });
    } catch (error) {
        console.error("Error in Create product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const getNote = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Note Id" });
    }

    try {
        const note = await Note.findById(id);

        if (!note) {
            return res.status(404).json({ success: false, message: "Note not found" });
        }

        res.status(200).json({ success: true, data: note });
    } catch (error) {
        console.error("Error in fetching note:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}