import React, { useState } from 'react'
import { createTicket } from '../../api/ticket';
import styles from "./TicketPost.module.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function TicketPost() {

    const [formdata, setFormData] = useState({
        title:"",
        priority:"",
        checklist:"",
        dueDate:"",
        todo:"",
        backlog:"",
        progress:"",
        done:"",
    })

    const handleChange = (event) => {
        setFormData({
         ...formdata, [event.target.name]: event.target.value,
        })
    }

    const handleSubmit = async () => {
       
        if(
            !formdata.title  ||
            !formdata.priority  ||
            !formdata.checklist
        ){
            alert("Please fill all the required fields");

            return;
        }

        // api call
        try {
            const res = await createTicket(formdata);
            // console.log(res);
            if(res){
                // alert("Ticket created successfully");
                console.log("congrats")
            }
        } catch (error) {
            console.log("something is not good"+error);
        }
    }

    // calender logic
    const [startDate, setStartDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);

    const handleButtonClick = () => {
        setShowCalendar(!showCalendar);
      };
      

  return (
    <div className={styles.container}>
            
            <span className={styles.h4}>Title</span> <span style={{color:"red"}}>*</span> <br />
            <input
                className={styles.input}
                name="title"
                onChange={handleChange}
                type={"text"}
                placeholder="Enter Task Title"
            ></input>

            <div className={styles.selectpriority}>
                <h4 className={styles.h5}>Select Priority</h4>
                <div className="high"><div className="circle"></div>HIGH PRIORITY</div>
                <div className="mid"><div className="circle"></div>MODERATE PRIORITY</div>
                <div className="low"><div className="circle"></div>LOW PRIORITY</div>
            </div>
            
            {/* <input
                className={styles.input}
                name="priority"
                onChange={handleChange}
                type={"text"}
                placeholder="priority"
            ></input> */}
            <h4 className={styles.h6}>Checklist</h4>

            {/* <input
                className={styles.input}
                name="checklist"
                onChange={handleChange}
                type={"text"}
                placeholder="checklist"
            ></input> */}

            <div>+ Add New </div>


            <div>
                <button onclick={handleButtonClick}>
                {showCalendar? 'Hide Calendar':'Show Calendar'}
                </button>
                {showCalendar && (
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        // inline
                    />
                )}
            </div>
            
        

            <button  className={styles.button}>
                Cancel
            </button>
            <button onClick={handleSubmit} className={styles.button}>
                Save
            </button>

        </div>
    );
}