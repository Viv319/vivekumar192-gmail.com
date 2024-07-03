import React, { useEffect, useState } from 'react';
import { getTicketByUserId, updateTicketStatus } from '../../api/ticket';
import styles from './Analytics.module.css';

export default function Analytics () {

  const [ticketDetails, setTicketDetails] = useState([]);

    const [counts, setCounts] = useState({
        backlog: 0,
        todo: 0,
        progress: 0,
        done: 0,
        lowPriority: 0,
        moderatePriority: 0,
        highPriority: 0,
        dueDateTasks: 0
    });

    const userId = localStorage.getItem('userId');
        const usernameId = userId ? userId.replace(/"/g, '') : '';

        const fetchTicketById = async () => {
            try {
                const result = await getTicketByUserId(usernameId);
                setTicketDetails(result);

                // Count the number of tickets in each category
                const newCounts = {
                    backlog: result.filter(ticket => ticket.backlog === '1').length,
                    todo: result.filter(ticket => ticket.todo === '1').length,
                    progress: result.filter(ticket => ticket.progress === '1').length,
                    done: result.filter(ticket => ticket.done === '1').length,
                    lowPriority: result.filter(ticket => ticket.priority === 'LOW PRIORITY').length,
                    moderatePriority: result.filter(ticket => ticket.priority === 'MODERATE PRIORITY').length,
                    highPriority: result.filter(ticket => ticket.priority === 'HIGH PRIORITY').length,
                    dueDateTasks: result.filter(ticket => {
                        const dueDate = new Date(ticket.dueDate);
                        const now = new Date();
                        return dueDate > now;
                    }).length
                };
                setCounts(newCounts);

            } catch (error) {
                console.error('Error fetching ticket details:', error);
            }
        };

    useEffect(() => {
        

        fetchTicketById();
    }, []);

  return (
    <div className={styles.fullPage}>
      <div className={styles.hearder}>
      Analytics
      </div>

        <div className={styles.main}>
        <div className={styles.left}>   
        <ul className={styles.ul1}>
          <li>
            Backlog Tasks {counts.backlog}
          </li>
          <li>
            To-do Tasks  {counts.todo}
          </li>
          <li>
            In-Progress Tasks  {counts.progress}
          </li>
          <li>
            Completed Tasks {counts.done}
          </li>
        </ul>

        </div>
        
        <div className={styles.right}>  {/* footer */}
        <ul className={styles.ul2}>
          <li>
            Low Priority  {counts.lowPriority}
          </li>
          <li>
            High Priority {counts.highPriority}
          </li>
          <li>
            Moderate Priority {counts.moderatePriority}
          </li>
          <li>
            Due Date Tasks {counts.dueDateTasks}
          </li>
        </ul>

        </div>
      </div>
    </div>
  )
}
