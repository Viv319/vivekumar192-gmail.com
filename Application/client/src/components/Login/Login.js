import React, {useState} from 'react';
import { loginUser } from '../../api/auth';
import styles from "./Login.module.css";
import {useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdOutlineMail } from "react-icons/md";
import { CiLock } from "react-icons/ci";

export default function Login() {
    
    const [errors, setErrors]= useState({
        email:null,
        password:null
    })

    const navigate = useNavigate();
    const [formData, setFormData]= useState({
        email:"",
        password:"",
    });

    const handleFormChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async () => {

        if(formData.email.trim().length===0){
            setErrors((prev)=>({...prev, email:"Email can't be empty"}));
            // return;
        }
        else{
            setErrors((prev)=>({...prev, email:null}));
        }
        if(formData.password.trim().length===0){
            setErrors((prev)=>({...prev, password:"Password can't be empty"}));
            // return;
        }
        else{
            setErrors((prev)=>({...prev, password:null}));
        }

        // if (!formData.email || !formData.password) {
        //     alert("Fields can't be empty");
        //     return;
        // }

        const result = await loginUser(formData);
        if (result) {
            
            localStorage.setItem('email', formData.email);
            navigate("/home");
            // navigate("/TicketPost");
            // alert("Login successful");
        }
        
    };

    
  return (
    <div className={styles.container}>
            
            
            <h2 className={styles.h2}>Login</h2>

            <div className={styles.user}>
            <MdOutlineMail />
            <input
                className={styles.input}
                name="email"
                // value={formData.email}
                onChange={handleFormChange}
                type={"email"}
                placeholder="Email"
            ></input>
            </div>
            {errors.email?<p style={{color:"red"}}>{errors.email}</p>:<></>}

            <div className={styles.user}>
            <CiLock />
            <input
                className={styles.input}
                name="password"
                // value={formData.password}
                onChange={handleFormChange}
                type={"password"}
                placeholder="Password"
            ></input>
            </div>
            {errors.password?<p style={{color:"red"}}>{errors.password}</p>:<></>}

            <button onClick={()=>{handleSubmit();}}  className={styles.button}>
                Log in
            </button>
            <p className={styles.footer}>
                Have no account yet?<br />
            </p>
                <button 
                    className={styles.underline}
                    onClick={() => navigate("/register")}
                >
                    Register
                </button>
            <ToastContainer></ToastContainer>
        </div>
    );
}