import React,{useState, useEffect} from 'react'
import styles from './Setting.module.css'
import { useParams } from "react-router-dom";
import { updateUser } from '../../api/auth';
import {jwtDecode} from 'jwt-decode';

export default function Setting() {

  const [formData, setFormData]= useState({
    id:"",
    name: "",
    updateEmail: "",
    oldPassword: "",
    password: "",
  });

  const [errors, setErrors]= useState({
    updateEmail:null,
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

    const token = localStorage.getItem('token');
      if (!token) return null;

      try {
        const decodedToken = jwtDecode(token);
        const tokenUserId =  decodedToken.userId;
        setFormData({...formData, id: tokenUserId, });
      } catch (error) {
        console.error('Invalid token', error);
        return null;
      }
    

    const result = await updateUser(formData);
    if(result){
      

      // navigate("/");
      alert("Profile updated successfully");
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
        name="updateEmail"
        onChange={handleChange}
        type={"updateEmail"}
        placeholder="Update Email"
        // leftIcon={<MdupdateEmail/>}
    ></input>
    {errors.updateEmail?<p style={{color:"red"}}>{errors.updateEmail}</p>:<></>}
    
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
