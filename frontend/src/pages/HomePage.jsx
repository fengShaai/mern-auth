import {useNoteStore} from "../store/note.js";
import {useEffect, useState} from "react";
import NoteModal from "../components/NoteModal.jsx";
import Navbar from "../components/Navbar.jsx";


function HomePage() {
    const { fetchNotes, notes } = useNoteStore();

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [noteData, setNoteData] = useState({});

    const openModalWithNote = (note) => {
        setNoteData(note);
        setIsModalOpen(true);
    };

    return (
        <div>
            <Navbar/>
            <div className="p-6">
                <h1 className="text-xl font-bold mb-4">Notes List</h1>
                <table className="table-auto border-collapse border border-gray-300 w-full text-left">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">ID</th>
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Content</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {notes.length > 0 ? (
                        notes.map((note) => (
                            <tr key={note._id} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">
                                    {note._id}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {note.name}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {note.body}
                                </td>
                                <td className="border px-4 py-2 flex justify-center">
                                    <button
                                        onClick={() => openModalWithNote(note)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="3"
                                className="border border-gray-300 px-4 py-2 text-center"
                            >
                                No notes available.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>

                <NoteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <h2 className="text-lg font-semibold">
                        {noteData.name}
                    </h2>
                    <p className="mt-2 text-gray-600">
                        {noteData.body}
                    </p>
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 mt-4 text-white bg-red-500 rounded hover:bg-red-600"
                    >
                        close x
                    </button>
                </NoteModal>
            </div>
        </div>
    )
}

export default HomePage;
