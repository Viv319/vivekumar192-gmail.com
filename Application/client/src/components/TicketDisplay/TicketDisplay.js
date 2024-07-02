import React, { useEffect, useState } from 'react';
import { getTicketByUserId } from '../../api/ticket';
import styles from './TicketDisplay.module.css';
const jwt_decode = require('jwt-decode');

export default function TicketDisplay () {
    const [ticketDetails, setTicketDetails] = useState([]); // Initialize as an empty array

    useEffect(() => {
        const fetchTicketById = async () => {
            const token = localStorage.getItem('token');
            
            if (!token) return;

            try {
                const decodedToken = jwt_decode(token);
                const userId = decodedToken.userId;
                console.log(userId);
                // Make API call to fetch ticket details by user ID
                const result = await getTicketByUserId(userId);
                setTicketDetails(result); // Set the state with the fetched data
                console.log(result); // Log the result to verify
            } catch (error) {
                console.error('Error fetching ticket details:', error);
            }
        };

        fetchTicketById();
    }, []); // Empty dependency array to run only once

    return (
        <div className={styles.body}>
            {ticketDetails.length > 0 ? (
                ticketDetails.map((ticket) => (
                    <div key={ticket._id} className={styles.container}>
                        <p className={styles.containerText}>
                            <strong>Title:</strong> {ticket.title}
                        </p>
                        <p className={styles.containerText}>
                            <strong>Priority:</strong> {ticket.priority}
                        </p>
                        <p className={styles.containerText}>
                            <strong>Checklist:</strong>
                            <ul>
                                {ticket.checklist.map((item, idx) => (
                                    <li key={idx}>{item.text}</li>
                                ))}
                            </ul>
                        </p>
                        <p className={styles.containerText}>
                            <strong>Due Date:</strong> {ticket.dueDate ? new Date(ticket.dueDate).toLocaleDateString() : 'N/A'}
                        </p>
                    </div>
                ))
            ) : (
                <p>No tickets found.</p>
            )}
        </div>
    );
}
