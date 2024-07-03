import React,{useState, useEffect} from 'react'
import styles from './Setting.module.css'
import { useParams } from "react-router-dom";
import { updateUser } from '../../api/auth';
import {jwtDecode} from 'jwt-decode';
import {Navigate, useNavigate} from "react-router-dom";

export default function Setting() {

  const navigate = useNavigate();
  
  const [formData, setFormData]= useState({
    name: "",
    email: "",
    oldPassword: "",
    password: "",
  });

  const [errors, setErrors]= useState({
    email:null,
    name:null, 
    oldPassword:null,
    password:null
  })

  const handleChange = (event) => {
      setFormData({...formData, [event.target.name]: event.target.value});
  }

  const handleSubmit = async (event) => {
    
    // if(formData.email.trim().length===0){
    //   setErrors((prev)=>({...prev, email:"Email can't be empty"}));
    // }
    // else{
    //     setErrors((prev)=>({...prev, email:null}));
    // }
    // if(formData.password.trim().length===0){
    //     setErrors((prev)=>({...prev, password:"Password can't be empty"}));
    // }
    // else{
    //     setErrors((prev)=>({...prev, password:null}));
    // }
    // if(formData.name.trim().length===0){
    //   setErrors((prev)=>({...prev, name:"Name can't be empty"}));
    // }
    // else{
    //     setErrors((prev)=>({...prev, name:null}));
    // }
    // if(formData.confirmPassword.trim().length===0){
    //      setErrors((prev)=>({...prev, confirmPassword:"Confirm Password can't be empty"}));
    // }
    // else{
    //     setErrors((prev)=>({...prev, confirmPassword:null}));
    // }

    // if(!(formData.password && formData.confirmPassword)){
    //   alert("password and confirm password is not same");
    //   return;
    // }

    // const findUser = await 
    
    if(formData.password === formData.oldPassword){
      alert("password and old password can not be same");
    }

    const result = await updateUser(formData);
    if(result){
      

      
      alert("Profile updated successfully");
      navigate("/");
    }
    else{
      alert(result.message);
    }
}


  return (
    <div className={styles.container}>
            
    <h2 className={styles.h2}>Settings</h2>
    
    <input
        className={styles.input}
        name="name"
        onChange={handleChange}
        type={"text"}
        placeholder="Name"
    ></input>
    {errors.name?<p style={{color:"red"}}>{errors.name}</p>:<></>}
    
    <input
        className={styles.input}
        name="email"
        onChange={handleChange}
        type={"email"}
        placeholder="Update Email"
        // leftIcon={<MdupdateEmail/>}
    ></input>
    {errors.email?<p style={{color:"red"}}>{errors.email}</p>:<></>}
    
    <input
        className={styles.input}
        name="oldPassword"
        onChange={handleChange}
        type={"password"}
        placeholder="Old Password"
    ></input>
    {errors.oldPassword?<p style={{color:"red"}}>{errors.oldPassword}</p>:<></>}
    
    <input
        className={styles.input}
        name="password"
        onChange={handleChange}
        type={"password"}
        placeholder=" New Password"
    ></input>
    {errors.password?<p style={{color:"red"}}>{errors.password}</p>:<></>}

    
    <button onClick={()=>{handleSubmit(); }} className={styles.button}>
        Update
    </button>

    </div>
  )
}
