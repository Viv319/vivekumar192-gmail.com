import React from 'react'
import Login from '../../components/Login/Login'
import authBG from "../../assets/images/Art.png";

export default function LoginPage() {
  return (
    <div style={{ display: "flex", justifyContent:'space-between', maxHeight: "100vh", maxWidth: "100vw" }}>
      
      <div style={{ 
                        order:1,
                        width: "60vw",
                        zIndex: 0,
                        display:"flex",
                        flexDirection: "column",
                        height: "100vh",
                        backgroundColor: "#17A2B8",
                        justifyContent:"center",
                        alignItems: "center",}}>
                <div className='image-container' 
                style={{
                    position:"relative",
                    display:"inline-block"}}>
                    <div 
                    style={{
                        position:"absolute",
                        top:"0%",
                        left:"23%",
                        borderRadius:"50%",
                        backgroundColor:"#317F8B",
                        zIndex:"1",
                        width:"290px",
                        height:"290px",}}>
                    </div>
                    <img
                        src={authBG}
                        style={{
                            marginTop:"-5.9rem",
                            zIndex:"2",
                            position:"relative",
                            display:"block"
                        }}
                        alt="Register Cover"
                    />
                </div>
                
                <div style={{justifyContent:'center'}}>
                   <h3
                   style={{
                    color: "white",
                    fontSize: "33.08px",
                    fontWeight: "600",
                    textAlign: "center",
                    lineHeight:"66.15px",
                    marginTop:"-80px"
                    
                   }}> Welcome aboard my friend</h3>
                    
                    <p
                    style={{
                        color: "white",
                        textAlign:"center",
                        fontSize: "19.29px",
                        fontWeight: "400",
                        lineHeight: "38.59px",
                    }}>just a couple of clicks and we start</p>
                </div>
            </div>
            <div style={{ order: 2 }}>
            <Login/>
            </div>
        </div>
    );
}