import React, { useState } from "react";
import { Link } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Login = (props)=>{
    const [input,changeState] = useState({
        email : "",
        password :""
    })
    const {email,password} = input;
    const onchange = (e)=>{
        changeState({...input,[e.target.name]:e.target.value})
    }

    const onsubmitForm = async(e)=>{
        e.preventDefault();
        try {
            const body ={email,password};
            const test = await fetch(`${BASE_URL}/auth/login`,{
                method:"POST",
                headers: {"Content-Type" : "application/json"},
                body : JSON.stringify(body)
            })
            if(test.status === 200)
            {
                const response = await test.json();
                localStorage.setItem("token",response.token);
                props.setAuth(true);
            }
        } catch (err) {
            console.error(err.message)
        }
    }
    return(
        <>
        <h1 className="text-center">Login</h1>
        <form className="d-flex flex-column" onSubmit={e=>onsubmitForm(e)}>
        <input type="email" value={input.email} name="email" placeholder="email" className="form-control m-3" onChange={e=>onchange(e)}/>
        <input type="password" value={input.password} name="password" placeholder="password" className="form-control m-3" onChange={e=>onchange(e)}/>
        <button className="btn btn-success align-items-center" type="submit">Log-In</button>
        </form>
        <Link to="/register">register</Link>
        </>
    )
}

export default Login;