import axios from 'axios';
const backendUrl =`https://vivekumar192-gmail-com-cuvette-final-evaluation-nov-batch.vercel.app`;
                    
export const createTicket = async ({title, priority, checklist, dueDate, todo, backlog, progress, done,
    }) => {

    try{
        
        const reqUrl = `${backendUrl}/create`;
        
        // this is fro authorization purposes
        const token = JSON.parse(localStorage.getItem('token'));
        axios.defaults.headers.common['Authorization'] = token;
        
        const response = await axios.post(reqUrl, {
            title, priority, checklist, dueDate, 
            todo, backlog, progress, done,
        });

        console.log(response)
        return "ticket created successfully";

    }catch(error){
        console.log(error);
        alert("something went wrong at frontend create ticket");
    }
}

export const updateTicket = async (jobId) => {
    try{
        // this is fro authorization purposes
        const token = JSON.parse(localStorage.getItem('token'));
        axios.defaults.headers.common['Authorization'] = token;

    const reqUrl = `${backendUrl}/update/${jobId}`;
    const response = axios.get(reqUrl);

    console.log(response.data);
    return (await response).data;

    }catch(error){
        console.log(error);
        alert("something went wrong at frontend update ticket");
    }

}

export const getAllTickets = async ()=>{
    try{
        // this is fro authorization purposes
        const token = JSON.parse(localStorage.getItem('token'));
        axios.defaults.headers.common['Authorization'] = token;

        const reqUrl = `${backendUrl}/getAllTickets`;
        const response = axios.get(reqUrl);

    return (await response)?.data;
    }catch(error){
        console.log(error);
        alert("something went wrong at frontend getAllTickets");
    }
    
}

export const getTicketByUserId = async (userId)=>{
    try{
        // this is fro authorization purposes
        const token = JSON.parse(localStorage.getItem('token'));
        axios.defaults.headers.common['Authorization'] = token;
        
        // console.log(userId);
        const reqUrl = `${backendUrl}/getTicket/${userId}`;
        // console.log('Request URL:', reqUrl);
        const response = await axios.get(reqUrl);
        
        if (response.data && response.data.tickets) {
            return response.data.tickets;
        } else {
            // Return an empty array if no tickets are found
            return [];
        }
    } catch (error) {
        console.log(error);
        // alert("Something went wrong at frontend.");
        // Return an empty array in case of error
        return [];
    }
};

// const updateTicketByTicketId = async (ticketId)=>{
//     try{
//         // this is fro authorization purposes
//         const token = JSON.parse(localStorage.getItem('token'));
//         axios.defaults.headers.common['Authorization'] = token;
        
//         const reqUrl = `${backendUrl}/updateByUserId/${ticketId}`;
//         const response = await axios.put(reqUrl);
        
//         console.log(response)
//         return ( response).data.tickets;
        
//     }catch(error){
//         console.log(error);
//         alert("something went wrong at frontend updateTicketByUserId");
//     }
// }

export const updateTicketStatus = async (ticketId, updatedFields) => {
    try {
        const token = JSON.parse(localStorage.getItem('token'));
        axios.defaults.headers.common['Authorization'] = token;

        const reqUrl = `${backendUrl}/updateTicket/${ticketId}`;
        const response = await axios.patch(reqUrl, updatedFields);

        console.log(response);
        return response.data.tickets;
    } catch (error) {
        console.log(error);
        alert("Something went wrong at frontend updateTicketByUserId");
    }
};

const deleteTicket = async (ticketId)=>{
    try{
        // this is fro authorization purposes
        const token = JSON.parse(localStorage.getItem('token'));
        axios.defaults.headers.common['Authorization'] = token;
        
        const reqUrl = `${backendUrl}/delete/${ticketId}`;
        const response = axios.delete(reqUrl);
        
        console.log(response)
        return "ticket deleted successfully";
        
    }catch(error){
        console.log(error);
        alert("something went wrong at frontend deleteTicket");
    }
}