import {React, useState, useEffect} from 'react'
import styles from "./Home.module.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TicketPost from '../TicketPost/TicketPost.js';
import {Navigate, useNavigate} from "react-router-dom";
import Modal from 'react-modal';
import TicketForm from '../TicketForm/TicketForm.js';
import TicketDisplay from '../TicketDisplay/TicketDisplay.js';
import minimizeIcon from '../../assets/images/minimizeIcon.png';

export default function Home() {

  // const userId = JSON.parse(localStorage.getItem('token'));

  const [filter, setFilter] = useState('this_week');

  const navigate = useNavigate();

  const notify = ()=>{
    toast.success("login successful", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
  }

  const [hasToastShown, setHasToastShown] = useState(false);

  useEffect(()=>{
    const toastShown = localStorage.getItem('hasToastShown');
    if (!toastShown) {
      // Show toast message
      notify();
      // Set state and local storage to indicate the toast has been shown
      setHasToastShown(true);
      localStorage.setItem('hasToastShown', 'true');
    }
  },[]);

  const [username, setUsername]=useState('');
  useEffect(() => {
    // Simulate fetching the username from local storage or an API
    const storedUsername = localStorage.getItem('name');
    if (storedUsername) {
      const username = storedUsername ? storedUsername.replace(/"/g, '') : '';
      setUsername(username);
    }
  }, []);

  // useEffect(()=>{
  //   const token = localStoreage.getItem('token');
  //   if(!token) return;

  //   try{
  //     const decodedToken = jwt_decode(token);
  //     const userId = decodedToken.userId;
  //   }
  //   catch (error) {
  //     console.error('Error decoding token or fetching ticket details:', error);
  // }
  // })

  // get current date
  const getCurrentDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('default', { month: 'short' });
    const year = today.getFullYear();

    const daySuffix = (day) => {
      if (day > 3 && day < 21) return 'th'; // handle teens
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };

    return `${day}${daySuffix(day)} ${month}, ${year}`;
  };

  const clickPlus = () => {
    // <TicketPost></TicketPost>

    console.log('clicked plus');
    navigate('/TicketPost');
  };

  // 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tickets, setTickets] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const saveTicket = (ticket) => {
    setTickets([...tickets, ticket]);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  
  return (
    
    <div className={styles.fullPage}  >
    
      <div className={styles.upper}>
        
        <div className={styles.header}>
          <span className={styles.welcome}>Welcome! {username}</span>
          <span className={styles.currentDate}>{getCurrentDate()}</span>
        </div>
        <div className={styles.header2}>
          <span className={styles.board}>Board</span>
          {/* <span className={styles.filter}> */}

          {/* <label className={styles.filter} htmlFor="filterSelect">Select Filter:</label> */}
          <select className={styles.filter} id="filterSelect" value={filter} onChange={handleFilterChange}>
            <option value="today">Today</option>
            <option value="this_week">This Week</option>
            <option value="this_month">This Month</option>
          </select>
          
          {/* </span> */}
        </div>
        </div>

        <div className={styles.footer} > 

          <div className={styles.BigBacklog}>
          <div className={styles.backlog}>
            
            <span className={styles.subHeading}>Backlog</span> 
            <span className={styles.minimize}><img src={minimizeIcon}/></span>
            
            </div>
            <div className={styles.backlogTicket}>
              show backlog tickets here
            </div>
            </div>


          <div className={styles.Bigtodo}>
          <div className={styles.todo}>
            <span className={styles.subHeading}>To do</span>   
            
            <div >
             <span className={styles.plus} onClick={openModal}>+</span> 
             <TicketForm isOpen={isModalOpen} onRequestClose={closeModal} onSave={saveTicket} />
             
             <span className={styles.minimize}><img src={minimizeIcon}/></span>
             </div>
             </div>

              <div className={styles.todoTicket}>
                <TicketDisplay />
              </div>
            
            </div>

          
            <div className={styles.BigProgress}>
          <div className={styles.Progress}>
            
            <span className={styles.subHeading}>Progress</span> 
            <span className={styles.minimize}><img src={minimizeIcon}/></span>
            
            </div>
            <div className={styles.backlogTicket}>
              show backlog tickets here
            </div>
            </div>

            <div className={styles.BigDone}>
          <div className={styles.Done}>
            
            <span className={styles.subHeading}>Done</span> 
            <span className={styles.minimize}><img src={minimizeIcon}/></span>
            
            </div>
            <div className={styles.backlogTicket}>
              show backlog tickets here
            </div>
            </div>

        </div>

      {/* </div> */}
  
    
      <ToastContainer></ToastContainer>
    </div>
      
    
  )
}
