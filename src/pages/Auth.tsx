import axios from "axios"
import { useState } from "react";
import { redirect } from "react-router-dom";

export default function Auth() {

    const [ email, setEmail ] = useState('');
    const [ password, setPass ] = useState('');

    const handleAuth = async () => {
        await axios.post('http://localhost:3000/api/v1/auth/user/signin', {
            email,
            password
        }, 
        {
            withCredentials: true
        });

        return redirect('/dashboard');
    }

    return (
        <>
            <input onChange={(e) => {setEmail(e.target.value)}} type="text" placeholder="email" />
            <input onChange={(e) => {setPass(e.target.value)}} type="text" placeholder="password" />
            <button onClick={handleAuth}>submit</button>
        </>
    )
}