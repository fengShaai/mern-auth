import Input from "../../components/Input.jsx";
import {useState} from "react";
import {Link} from "react-router-dom";
import {useAuthStore} from "../../store/authStore.js";

function LoginPage () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login, error } = useAuthStore();

    const handleLogin = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <div className="flex flex-col mt-[10%] bg-[#f2f2f2] border border-gray-200 max-w-sm mx-auto p-10">
            <h2 className="mb-3 text-xl">Login</h2>

            <form onSubmit={handleLogin} className="flex flex-col">
                <Input
                    type='email'
                    placeholder='Email Address'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p className='text-red-500 font-semibold mb-2'>{error}</p>}

                <button className="border border-blue-600 hover:bg-blue-600
                hover:text-white" type="submit">Login</button>
            </form>

            <div className="mt-5 text-sm flex">
                <h3 className='me-1'>Don't have an account?</h3>
                <Link to={"/signup"} className="text-blue-800 hover:underline" >SignUp</Link>
            </div>
        </div>
    )
};

export default LoginPage;