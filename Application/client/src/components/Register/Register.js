import React, {useState} from 'react'
import styles from "./Register.module.css";
import { registerUser } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { CiUser } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { CiLock } from "react-icons/ci";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Register() {

  const notify = ()=>{
    toast.success("register successful", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
  }

  const [errors, setErrors]= useState({
    email:null,
    name:null,
    password:null,
    confirmPassword:null
  })

  const navigate = useNavigate();

    const [formData, setFormDate]= useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (event) => {
        setFormDate({...formData, [event.target.name]: event.target.value});
    }
    
    const handleSubmit = async() => {

      if(formData.email.trim().length===0){
        setErrors((prev)=>({...prev, email:"Email can't be empty"}));
      }
      else{
          setErrors((prev)=>({...prev, email:null}));
      }
      if(formData.password.trim().length===0){
          setErrors((prev)=>({...prev, password:"Password can't be empty"}));
      }
      else{
          setErrors((prev)=>({...prev, password:null}));
      }
      if(formData.name.trim().length===0){
        setErrors((prev)=>({...prev, name:"Name can't be empty"}));
      }
      else{
          setErrors((prev)=>({...prev, name:null}));
      }
      if(formData.confirmPassword.trim().length===0){
           setErrors((prev)=>({...prev, confirmPassword:"Confirm Password can't be empty"}));
      }
      else{
          setErrors((prev)=>({...prev, confirmPassword:null}));
      }

      if(!(formData.password && formData.confirmPassword)){
        alert("password and confirm password is not same");
        return;
      }

      const result = await registerUser(formData);
      if(result){
        
        navigate("/");
      }
      else{
        alert(result.message);
      }
  }

  return (
    <div className={styles.container}>
            
            <h2 className={styles.h2}>Register</h2>
            
            <div className={styles.user}>
            <CiUser />
            <input
                className={styles.input}
                name="name"
                onChange={handleChange}
                type={"text"}
                placeholder="Name"
            ></input>
            </div>
            {errors.name?<p style={{color:"red"}}>{errors.name}</p>:<></>}
   


            <div className={styles.user}>
            <MdOutlineMail />
            <input
                className={styles.input}
                name="email"
                onChange={handleChange}
                type={"email"}
                placeholder="Email"
            ></input>
            </div>
            {errors.email?<p style={{color:"red"}}>{errors.email}</p>:<></>}
            

            <div className={styles.user}>
            <CiLock />
            <input
                className={styles.input}
                name="confirmPassword"
                onChange={handleChange}
                type={"tel"}
                placeholder="Confirm Password"
            ></input>
            </div>
            {errors.confirmPassword?<p style={{color:"red"}}>{errors.confirmPassword}</p>:<></>}
            

            <div className={styles.user}>
            <CiLock />
            <input
                className={styles.input}
                name="password"
                onChange={handleChange}
                type={"password"}
                placeholder="Password"
            ></input>
            
            </div>
            {errors.password?<p style={{color:"red"}}>{errors.password}</p>:<></>}
            
            <button onClick={()=>{handleSubmit(); notify();}} className={styles.button}>
                Register
            </button>
            <p className={styles.footer}>
                Have an account?<br/>
            </p>
                <button
                    className={styles.underline}
                    
                    onClick={() => navigate("/")}
                >
                    Log in
                </button>
                <ToastContainer></ToastContainer>
        </div>
    );
}