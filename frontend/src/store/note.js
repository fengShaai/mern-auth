import { create } from "zustand";

export const useNoteStore = create((set) => ({
    notes: [],
    setNotes: (notes) => set({ notes }),
    createNote: async (newNote) => {
        if (!newNote.name || !newNote.body) {
            return { success: false, message: "Please fill in all fields." };
        }
        const res = await fetch("/api/notes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newNote),
        });
        const data = await res.json();
        set((state) => ({ notes: [...state.notes, data.data] }));
        return { success: true, message: "Note created successfully" };
    },
    fetchNotes: async () => {
        const res = await fetch("/api/notes");
        const data = await res.json();
        set({ notes: data.data });
    }
}));