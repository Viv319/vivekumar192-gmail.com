import React from 'react'
import Setting from '../../components/setting/Setting'
import logoBG from "../../assets/images/logo.png";
import {useNavigate} from "react-router-dom";
import styles from "./SettingPage.module.css";
import board from "../../assets/images/layout.png";
import database from "../../assets/images/database.png";
import setting from "../../assets/images/settings.png";
import logout from "../../assets/images/Logout.png";

export default function SettingPage() {

  const handleAnalytics=() => {
    navigate("/home/analytics")
  }
  const handleHome=() => {
    navigate("/home")
  }

  const handleLogout=() => {
    localStorage.removeItem("token");
    localStorage.removeItem('hasToastShown');
    localStorage.removeItem('name');
    navigate("/")
  }

  const navigate = useNavigate();

  return (
    <div style={{display:"flex",  
    maxHeight: "100vh", 
    maxWidth: "100vw" }}>

    <div style={{ 
                        position: "fixed",
                        left: "0",
                        // height: calc(100% - 50px);
                        // backgroundColor: "#d1d1d1",
                        zIndex: "5",
                        order:1,
                        width: "10vw",
                        zIndex: 10,
                        height: "100vh",
                        // backgroundColor: "#17A2B8",
                        justifyContent:"center",
                        padding:"1rem",
                        alignItems: "center",}}>
        <div className={styles.container2}>

<span className={styles.logo}>
  <img src={logoBG} alt="logo" />
  </span>
  <span className={styles.manage} style={{}}>Pro Manage</span>
  </div>

<div className={styles.options}>

  <div className={styles.layout1}>
  <img src={board} alt="board"/>
  <p className={styles.board} onClick={handleHome}>Board</p>
  </div>
  
  <div className={styles.layout2}>
  <img src={database} alt="database"/>
  <p className={styles.analytics} onClick={handleAnalytics}>Analytics</p>
  </div>
  
  <div className={styles.layout3}>
  <img src={setting} alt="setting"/>
  <p className={styles.setting}>Settings</p>
  </div>
  
  </div>

  <div className={styles.layout4} onClick={handleLogout}>
    <img src={logout} alt='logout image'/>
    <button className={styles.logout} >Log out</button>
  </div>
  </div>

<div style={{order: 2}}>
      
      <Setting/>
      </div>
    </div>
  )
}
