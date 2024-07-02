import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styles from './TicketForm.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { createTicket } from '../../api/ticket';
import deleteIcon from '../../assets/images/Delete.png';

Modal.setAppElement('#root'); // Ensure accessibility

function TicketForm({ isOpen, onRequestClose, onSave }) {

  const initialFormData = {
    title: '',
    priority: '',
    checklist: [],
    selectedOption: null,
    selectedDate: null,
    todo: "1",
    backlog: "0",
    progress: "0",
    done: "0",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleOptionClick = (e, option) => {
    e.preventDefault(); // Prevent form submission
    setFormData({
      ...formData,
      priority: option,
    });
  };

  const handleAddChecklistItem = () => {
    setFormData({
      ...formData,
      checklist: [...formData.checklist, { text: '', checked: false }],
    });
  };

  const handleChecklistItemChange = (index, value) => {
    const newChecklist = [...formData.checklist];
    newChecklist[index].text = value;
    setFormData({
      ...formData,
      checklist: newChecklist
    });
  };

  const handleChecklistItemCheck = (index) => {
    const newChecklist = [...formData.checklist];
    newChecklist[index].checked = !newChecklist[index].checked;
    setFormData({
      ...formData,
      checklist: newChecklist
    });
  };

  const handleDeleteChecklistItem = (index) => {
    const newChecklist = formData.checklist.filter((item, i) => i !== index);
    setFormData({
      ...formData,
      checklist: newChecklist
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      selectedDate: date
    });
    setShowDatePicker(false);
  };

  const handleSubmit = async () => {
    const newTicket = {
      title: formData.title,
      priority: formData.priority,
      checklist: formData.checklist,
      dueDate: formData.selectedDate
    };
    onSave(newTicket);

    const result = await createTicket(formData);

    if (result) {
      alert('Ticket created successfully');
      setFormData(initialFormData); // Reset form after successful creation
    } else {
      alert('Failed to create ticket');
    }

    onRequestClose();
  };

  const getCheckedItemsCount = (checklist) => {
    return checklist.filter(item => item.checked).length;
  };

  useEffect(() => {
    console.log(formData)
  }, [formData]);

  const customStyles = {
    content: {
      width: '45%', // Change this value to your desired width
      height: '60%', // Change this value to your desired height
      margin: 'auto',
      padding: '20px',
      borderRadius: '10px',
      overflow: 'auto',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)'
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Create Ticket" style={customStyles}>
      <form>
        <div>
          <span className={styles.h4}>Title</span> <span style={{ color: "red" }}>*</span> <br />
          <input
            type="text"
            className={styles.input1} 
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            placeholder='Enter Task Title'
          />
        </div>
        <div className={styles.priDiv}>
          <div><label>Select Priority</label> <span style={{ color: "red" }}>*</span></div>
          <button
            className={`${styles.optionButton} ${formData.priority === 'HIGH PRIORITY' ? styles.selected : ''}`}
            onClick={(e) => handleOptionClick(e, "HIGH PRIORITY")}
            style={{ cursor:"pointer", borderRadius:"8px", border:"1px solid #E2E2E2", gap:"8px", width:"135px", height:"31px", color: formData.priority === 'HIGH PRIORITY' ? 'white' : '#767575',
              backgroundColor: formData.priority === 'HIGH PRIORITY' ? '#007bff' : 'white', }}
          >
            <span className={styles.reddot}></span>HIGH PRIORITY
          </button>
          <button
            className={`${styles.optionButton} ${formData.priority === 'MODERATE PRIORITY' ? styles.selected : ''}`}
            onClick={(e) => handleOptionClick(e, "MODERATE PRIORITY")}
            style={{cursor:"pointer", borderRadius:"8px", border:"1px solid #E2E2E2", gap:"8px", width:"175px", height:"31px", color: formData.priority === 'MODERATE PRIORITY' ? 'white' : '#767575',
              backgroundColor: formData.priority === 'MODERATE PRIORITY' ? '#007bff' : 'white', }}
          >
            MODERATE PRIORITY
          </button>
          <button
            className={`optionbutton ${formData.priority === "LOW PRIORITY" ? 'selected' : ''}`}
            onClick={(e) => handleOptionClick(e, "LOW PRIORITY")}
            style={{cursor:"pointer", borderRadius:"8px", border:"1px solid #E2E2E2", gap:"8px", width:"135px", height:"31px", color: formData.priority === 'LOW PRIORITY' ? 'white' : '#767575',
              backgroundColor: formData.priority === 'LOW PRIORITY' ? '#007bff' : 'white',}}
          >
            LOW PRIORITY
          </button>
        </div>
        <div >
          <span className={styles.checklistSpan}>Checklist {getCheckedItemsCount(formData.checklist)}/{formData.checklist.length})</span> <span style={{ color: "red" }}>*</span>
          <ul>
            {formData.checklist.map((item, index) => (
              <li key={index} className={styles.liInput}>
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => handleChecklistItemCheck(index)}
                />
                <input
                  className={styles.checklistInput}
                  type="text"
                  value={item.text}
                  onChange={(e) => handleChecklistItemChange(index, e.target.value)}
                />
                <img
                  src={deleteIcon}
                  alt="Delete"
                  onClick={() => handleDeleteChecklistItem(index)}
                  style={{ cursor: 'pointer' }}
                />
              </li>
            ))}
          </ul>
          <button type="button" onClick={handleAddChecklistItem}
          style={{width:"92px",height:"19px", gap:"10px", border:"none", backgroundColor:"white",color:"#767575",marginTop:"10px", cursor:"pointer"}}>+ Add New</button>
        </div>

        <div style={{display:"flex", width:"95%",  position: "absolute",  bottom: "30px"}}>
          <div style={{border:"1px solid #E2E2E2", width:"185px",height:"45px", borderRadius:"12px"}}>
          <p onClick={() => setShowDatePicker(true)} className={styles.calender}>
            {formData.selectedDate ? `${formData.selectedDate.toLocaleDateString()}` : 'Select Due Date'}
          </p>
          </div>
          {showDatePicker && (
            <DatePicker
              selected={formData.selectedDate}
              onChange={handleDateChange}
              dateFormat="MM/dd/yyyy"
              onClose={() => setShowDatePicker(false)}
              inline
            />
          )}
          <div style={{  position: "absolute", bottom: "0", right: "0%"}}>
          <button className={styles.cancle} type="button" onClick={onRequestClose}>Cancel</button>
          <button className={styles.save} type="button" onClick={handleSubmit}>Save</button>
          </div>
        </div>

        
      </form>
    </Modal>
  );
}

export default TicketForm;
