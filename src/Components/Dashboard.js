import React ,{useState,useEffect} from "react";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Dashboard = (props)=>{
    const [name,setName] = useState("");

    const logout =(e)=>{
        e.preventDefault();
        localStorage.clear();
        props.setAuth(false)
    }
    const getname = async()=>{
        try {
            const response = await fetch(`${BASE_URL}/dashboard`,{
                method:"GET",
                headers:{token:localStorage.getItem("token")}
            });
            
            const temp = await response.json();
            setName(temp.user_name);
        } catch (err) {
            console.error(err.message);
        }

    }
    useEffect(()=>{
        getname();
    },[])
    return(
    <>
    <h1>Dashboard</h1>
    <h3>Hey {name}</h3>
    <button className="btn btn-primary" onClick={(e)=>logout(e)}>Log-Out</button>
    </>
    )
}

export default Dashboard;