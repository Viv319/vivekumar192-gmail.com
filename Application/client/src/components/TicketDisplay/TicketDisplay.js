import React, { useEffect, useState } from 'react';
import { getTicketByUserId } from '../../api/ticket';
import styles from './TicketDisplay.module.css';

export default function TicketDisplay () {

    const [ticketDetails, setTicketDetails] = useState([]); 
    const [selectedItem, setSelectedItem] = useState(''); // State to handle the selected dropdown value
    const [dropdownOpen, setDropdownOpen] = useState(false); // State to handle dropdown visibility


    useEffect(() => {
        const userId = localStorage.getItem('userId');
        
          const usernameId = userId ? userId.replace(/"/g, '') : '';

        const fetchTicketById = async () => {

            try {
                console.log(usernameId);
                
                const result = await getTicketByUserId(usernameId);
                setTicketDetails(result); 
                console.log(result); 
                
            } catch (error) {
                console.error('Error fetching ticket details:', error);
            }
        };

        fetchTicketById();
    }, []); // Empty dependency array to run only once

    const getCheckedItemsCount = (checklist) => {
        return checklist.filter(item => item.checked).length;
    };

    const handleSelectChange = (event) => {
        setSelectedItem(event.target.value);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    
    // const handleChecklistItemCheck = (index) => {

    //   const newChecklist = [...formData.checklist];
    //   newChecklist[index].checked = !newChecklist[index].checked;
    //   setFormData({
    //     ...formData,
    //     checklist: newChecklist
    //   });
    // };

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
                        <span className={styles.checklistSpan}>Checklist ({getCheckedItemsCount(ticket.checklist)}/{ticket.checklist.length})</span>
                            <div className={styles.dropdown}>
                                <div className={styles.dropdownHeader} onClick={toggleDropdown}>
                                    
                                    <span className={dropdownOpen ? styles.arrowUp : styles.arrowDown}></span>
                                </div>
                                {dropdownOpen && (
                                    <ul className={styles.dropdownList}>
                                        {ticket.checklist.map((item, index) => (
                                            <li key={index} className={styles.liInput}>
                                                <input
                                                    type="checkbox"
                                                    checked={item.checked}
                                                    // onChange={() => handleChecklistItemCheck(index)}
                                                />
                                                <input
                                                    className={styles.checklistInput}
                                                    type="text"
                                                    value={item.text}
                                                    // onChange={(e) => handleChecklistItemChange(index, e.target.value)}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </p>
                        
                        <div className={styles.tags}>
                        <p className={styles.containerBottom}>
                            {ticket.dueDate ? new Date(ticket.dueDate).toLocaleDateString() : 'N/A'}
                        </p>
                            <span className={styles.tag}>Backlog</span>
                            <span className={styles.tag}>Progress</span>
                            <span className={styles.tag}>Done</span>
                        </div>
                    </div>
                ))
            ) : (
                <p>No tickets found.</p>
            )}
        </div>
    );
}