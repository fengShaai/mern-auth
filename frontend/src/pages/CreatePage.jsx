import {useState} from "react";
import {useNoteStore} from "../store/note.js";
import Navbar from "../components/Navbar.jsx";


function CreatePage() {
    const [newNote, setNewNote] = useState({
        name: "",
        body: ""
    });

    const { createNote } = useNoteStore();

    const handleAddNote = async () => {
        const { success, message } = await createNote(newNote);
        console.log("success: ", success);
        console.log("Message: ", message);
        setNewNote({ name: "", body: ""});
    };

    return (
        <div>
            <Navbar/>
            <div className="flex flex-col mt-10 w-[30%] ms-4">
                <h1>Create a new note</h1>

                <input
                    type="text"
                    placeholder="Note Name"
                    value={newNote.name}
                    onChange={(event) => setNewNote(
                        {...newNote, name: event.target.value})}
                    className="mt-3 mb-3 p-1 border"
                />

                <textarea
                    placeholder="Note Content"
                    value={newNote.body}
                    onChange={(event) => setNewNote(
                        {...newNote, body: event.target.value})}
                    className="p-1 border"
                />

                <div className="flex justify-end">
                    <button
                        className="border border-blue-500 hover:bg-green-500 hover:text-white rounded-md px-3 py-1 mt-3 hover:border-none"
                        onClick={handleAddNote}
                    >Save
                    </button>
                </div>

            </div>
        </div>
    )
}

export default CreatePage;
