import React from 'react'
import styles from "./Analytics.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Navigate, useNavigate} from "react-router-dom";
import Modal from 'react-modal';
import TicketForm from '../TicketForm/TicketForm.js';
import TicketDisplay from '../TicketDisplay/TicketDisplay.js';

export default function Analytics() {
  return (
    <div className={styles.fullPage}>
      <div className={styles.hearder}>
      Analytics
      </div>

        <div className={styles.main}>
        <div className={styles.left}>   {/* upper */}
        <ul className={styles.ul1}>
          <li>
            Backlog Tasks
          </li>
          <li>
            To-do Tasks
          </li>
          <li>
            In-Progress Tasks
          </li>
          <li>
            Completed Tasks
          </li>
        </ul>

        </div>
        
        <div className={styles.right}>  {/* footer */}
        <ul className={styles.ul2}>
          <li>
            Low Priority
          </li>
          <li>
            High Priority
          </li>
          <li>
            Moderate Priority
          </li>
          <li>
            Due Date Tasks
          </li>
        </ul>

        </div>
      </div>
    </div>
  )
}
