import React, {useState} from 'react'
import Home from '../../components/Home/Home'
import logoBG from "../../assets/images/logo.png";
import {useNavigate} from "react-router-dom";
import styles from "./HomePage.module.css";
import board from "../../assets/images/layout.png";
import database from "../../assets/images/database.png";
import setting from "../../assets/images/settings.png";
import logout from "../../assets/images/Logout.png";

export default function HomePage() {
  
    const handleAnalytics=() => {
    navigate("/home/analytics")
  }
  const handleSetting=() => {
    navigate("/home/setting")
  }

  const handleLogout=() => {
    localStorage.clear();
    navigate("/")
  }

  const navigate = useNavigate();

  const [scrollLeft, setScrollLeft] = useState(0);

  const handleScroll = (e) => {
    setScrollLeft(e.target.scrollLeft);
  };

  return (
    <div style={{display: "flex",
      width: "100vw",
      overflowX: "scroll",
      position: "relative",display:"flex",  maxHeight: "100vh", maxWidth: "100vw" }} onScroll={handleScroll}>

    <div style={{       
                        position: "fixed",
                        left: "0",
                        // height: calc(100% - 50px);
                        // backgroundColor: "#d1d1d1",
                        // zIndex: "2",
                        order:1,
                        width: "10vw",
                        // zIndex: 10,
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
          <p className={styles.board}>Board</p>
          </div>
          
          <div className={styles.layout2}>
          <img src={database} alt="database"/>
          <p className={styles.analytics} onClick={handleAnalytics}>Analytics</p>
          </div>
          
          <div className={styles.layout3}>
          <img src={setting} alt="setting"/>
          <p className={styles.setting} onClick={handleSetting}>Settings</p>
          </div>
          
          </div>

          <div className={styles.layout4} onClick={handleLogout}>
            <img src={logout} alt='logout image'/>
            <button className={styles.logout} >Log out</button>
          </div>
          </div>

      <div style={{order: 2}}>
      <Home/>
      </div>
    </div>
  )
}
