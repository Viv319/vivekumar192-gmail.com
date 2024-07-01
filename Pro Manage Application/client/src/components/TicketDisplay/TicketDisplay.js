import {getTicketByUserId} from '../../api/ticket';
import {getAllTickets} from '../../api/ticket';
import React,{useEffect, useState} from 'react'
import styles from './TicketDisplay.module.css';
import {useParams} from "react-router-dom";

export default function TicketDisplay() {
    const { id } = useParams();

    useEffect(() => {
        getTicketById();
    },[]);

    const getTicketById = async () =>{
        if(!id) return ;
        const result = await getTicketByUserId(id);
        console.log(result);
    }

    const [ticketDetails, setTicketDetails] = useState({})
    
    useEffect(() => {
        getTicketDetails();
    }, []);

    const getTicketDetails = async() =>{
        const response = await getAllTickets();
        // console.log(response);
        setTicketDetails(response);
    }

    return (
        <div style={{backgroundColor:"blue"}}>
            {ticketDetails ? (
                <div className={styles.body}>
                    
                    
                        <p className={styles.containerText} style={{backgroundColor:"red"}}>
                            {ticketDetails.priority}
                            {/* {ticketDetails.} */}
                        </p>



                </div>
            ) : (
                <></>
            )}
        </div>
    );
}