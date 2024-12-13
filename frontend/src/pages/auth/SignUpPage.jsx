import Input from "../../components/Input.jsx";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAuthStore} from "../../store/authStore.js";

function SignUpPage () {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { signup, error } = useAuthStore();
    const navigate = useNavigate();

    const handleSignUp = async (event) => {
        event.preventDefault();
        try {
            await signup(email, password, name);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex flex-col mt-[10%] bg-[#f2f2f2] border border-gray-200 max-w-sm mx-auto p-10">
            <h2 className="mb-3">Create An Account</h2>

            <form onSubmit={handleSignUp} className="flex flex-col">
                <Input
                    type='text'
                    placeholder='Full Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

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
                {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
                <button className="border border-blue-600 hover:bg-blue-600 hover:text-white" type="submit">SignUp</button>
            </form>

            <div className="mt-5 text-sm flex">
                <h3 className='me-1'>Already have an account?</h3>
                <Link to={"/login"} className="text-blue-800 hover:underline" >Login</Link>
            </div>
        </div>
    )
};

export default SignUpPage;