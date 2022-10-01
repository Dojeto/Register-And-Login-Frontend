import React, { useState } from "react";
import { Link } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Register = (props)=>{
    const [input,changeInput] =useState({
        email:"",
        password:"",
        username:""
    })
    
    const {email,password,username} = input;
    const onChangeState = (e)=>{
        console.log(input);
        changeInput({...input,[e.target.name]:e.target.value})
    }

    const onSubmitForm = async(e)=>{
        e.preventDefault();
        try {
            const body = {email,password,username};
            console.log(JSON.stringify(body));
            const test = await fetch(`${BASE_URL}auth/register`,{
                method:"POST",
                headers: {"Content-Type" : "application/json"},
                body : JSON.stringify(body)
            })
            const fuck = await test.json();
            console.log(fuck);
            localStorage.setItem("token",fuck.token);
            props.setAuth(true);
        } catch (err) {
            console.error(err.message)
        }
    }
    return(
        <>
        <h1 className="text-center my-4">Register</h1>
        <form className="d-flex flex-column" onSubmit={e=>onSubmitForm(e)}>
            <input type="email" value={input.email} name="email" placeholder="email" className="form-control m-3" onChange={e=>onChangeState(e)}/>
            <input type="password" value={input.password} name="password" placeholder="password" className="form-control m-3" onChange={e=>onChangeState(e)}/>
            <input type="text" value={input.username} name="username" placeholder="username" className="form-control m-3" onChange={e=>onChangeState(e)}/>
            <button className="btn btn-success align-items-center" type="submit">Submit</button>
        </form>
        <Link to="/login">Login</Link>
        </>
    )
}

export default Register;