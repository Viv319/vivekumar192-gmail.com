import React, { useEffect, useState } from 'react';
import { getTicketByUserId } from '../../api/ticket';
import styles from './TicketDisplay.module.css';
import { updateTicketStatus } from '../../api/ticket';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";


export default function TicketDisplay ({ status }) {

    const [ticketDetails, setTicketDetails] = useState([]);
    const [selectedItem, setSelectedItem] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const usernameId = userId ? userId.replace(/"/g, '') : '';

        const fetchTicketById = async () => {
            try {
                // console.log(usernameId);
                const result = await getTicketByUserId(usernameId);
                setTicketDetails(result);
                // console.log(result);
            } catch (error) {
                console.error('Error fetching ticket details:', error);
            }
        };

        fetchTicketById();
    }, []);

    const getCheckedItemsCount = (checklist) => {
        return checklist.filter(item => item.checked).length;
    };

    const handleSelectChange = (event) => {
        setSelectedItem(event.target.value);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const updateStatus = async (ticketId, updatedFields) => {
        try {
            await updateTicketStatus(ticketId, updatedFields);
            setTicketDetails(prevDetails => prevDetails.map(ticket =>
                ticket._id === ticketId ? { ...ticket, ...updatedFields } : ticket
            ));
            window.location.reload()
        } catch (error) {
            console.error('Error updating ticket status:', error);
        }
    };

    const clickBacklog = (ticketId) => {
        updateStatus(ticketId, { backlog: 1, todo: 0, progress: 0, done: 0 });
    };

    const clickToDo = (ticketId) => {
        updateStatus(ticketId, { backlog: 0, todo: 1, progress: 0, done: 0 });
    };

    const clickProgress = (ticketId) => {
        updateStatus(ticketId, { backlog: 0, todo: 0, progress: 1, done: 0 });
    };

    const clickDone = (ticketId) => {
        updateStatus(ticketId, { backlog: 0, todo: 0, progress: 0, done: 1 });
    };

    const filteredTickets = ticketDetails.filter(ticket => ticket[status] == 1);

    const getDueDateClass = (ticket) => {

        const currentDate = new Date();

        const dueDate = new Date(ticket.dueDate);

        if (ticket.done == 1) {

            return styles.containerBottomGreen;

        } else if (dueDate < currentDate) {

            return styles.containerBottomRed;

        } else {

            return styles.containerBottomGray;

        }

    };
    const getPriorityClass = (ticket) => {
        if (ticket.priority === 'LOW PRIORITY') {
            return styles.lowPriority;
        } else if (ticket.priority === 'MODERATE PRIORITY') {
            return styles.moderatePriority;
        } else {
            return styles.pri;
        }
    }
    return (
        <div className={styles.body}>
            {filteredTickets.length > 0 ? (
                filteredTickets.map((ticket) => (
                    <div key={ticket._id} className={styles.container}>
                        <span className={`${styles.pri} ${getPriorityClass(ticket)}`}>
                            {ticket.priority}
                        </span>
                        {/* <span style={{marginLeft:"200px"}} >...</span> */}
                        <p className={styles.containerTtitle}>
                            {ticket.title}
                        </p>
                        <p className={styles.containerCheck}>
                            <span className={styles.checklistSpan} onClick={toggleDropdown}>
                                Checklist ({getCheckedItemsCount(ticket.checklist)}/{ticket.checklist.length})
                              <span style={{backgroundColor:"#EEECEC"}}>  {dropdownOpen ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}</span>
                            </span>
                            {dropdownOpen && (
                                <div className={styles.dropdown}>
                                    <ul className={styles.dropdownList}>
                                        {ticket.checklist.map((item, index) => (
                                            <li key={index} className={styles.liInput}>
                                                <input
                                                    type="checkbox"
                                                    checked={item.checked}
                                                />
                                                <input
                                                    className={styles.checklistInput}
                                                    type="text"
                                                    value={item.text}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </p>
                        <div className={styles.tags}>  
                            <p className={`${styles.containerBottom} ${getDueDateClass(ticket)}`}>
                                {ticket.dueDate ? new Date(ticket.dueDate).toLocaleDateString() : 'N/A'}
                            </p>
                            {ticket.backlog == 0 && (
                                <span className={styles.tag} onClick={() => clickBacklog(ticket._id)}>Backlog</span>
                            )}
                            {ticket.todo == 0 && (
                                <span className={styles.tag} onClick={() => clickToDo(ticket._id)}>To Do</span>
                            )}
                            {ticket.progress == 0 && (
                                <span className={styles.tag} onClick={() => clickProgress(ticket._id)}>Progress</span>
                            )}
                            {ticket.done == 0 && (
                                <span className={styles.tag} onClick={() => clickDone(ticket._id)}>Done</span>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <></>
            )}
        </div>
    );
}
