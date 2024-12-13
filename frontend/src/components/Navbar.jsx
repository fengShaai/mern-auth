import {Link} from "react-router-dom";
import {useAuthStore} from "../store/authStore.js";


function Navbar() {
    const {user,logout} = useAuthStore();

    const handleLogout = () => {
        logout();
    }
    return (
        <div>
            <nav className="">
                <div className="flex justify-between items-center p-5 bg-gray-200">
                    <div className="flex items-center justify-between">
                        <Link className="font-bold text-2xl text-gray-600 hover:text-green-500" to={"/"}>Home</Link>
                        <h2 className="ps-2 text-2xl">| {user.name}</h2>
                    </div>
                    <div className="flex" id="navbarNav">
                        <Link to={"/create"}>
                            <button className=" border border-blue-500 hover:bg-blue-500 hover:text-white rounded py-2 px-3">Create Note +</button>
                        </Link>
                        <button className="ms-4 bg-red-600 p-1 text-white rounded hover:bg-white hover:text-red-600" onClick={handleLogout}>LogOut</button>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;
