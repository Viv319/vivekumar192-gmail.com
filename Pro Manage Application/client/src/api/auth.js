import axios from 'axios';
const backendUrl =`http://localhost:3001/api/v1/auth`;

export const registerUser = async ({email,password, name})=>{
    try{
        const reqUrl = `${backendUrl}/register`;
        const response = await axios.post(reqUrl,{
            email,
            password,
            name,
        });
        console.log(response)
        return true;
    }catch(error){
        console.log(error);
        alert("Something went wrong");
    }
}

export const loginUser = async ({email,password})=>{
    try{
        const reqUrl = `${backendUrl}/login`;
        const response = await axios.post(reqUrl,{
            email,
            password
        });
        if(response.data?.token){
            localStorage.setItem("token", JSON.stringify(response.data?.token));
            localStorage.setItem("name", JSON.stringify(response.data?.name));
        }
        return true;
        
    }catch(error){
        console.log(error);
        alert("Something went wrong");
    }
}

export const updateUser = async ({email, name, password})=>{
    try{
        
        // const token = JSON.parse(localStorage.getItem('token'));
        // axios.defaults.headers.common['Authorization'] = token;
        


            // yaha par mujhe id fetch karna hai tabhi data fetch ho paega;
            // const reqUrl = `${backendUrl}/update/${id}`;
            const reqUrl =`${backendUrl}/update`;

            const responseUser = await axios.get(reqUrl,{
                name, email, password
            });
            
            console.log(responseUser)
            return true;
                
    }
    catch(error){
        console.log(error);
        alert("Something went wrong");
    }
}

// export const findUserById = async ({id}) =>{
//     try{
//         const reqUrl = `${backendUrl}/getUser/${id}`;
//         const token = JSON.parse(localStorage.getItem('token'));
//         axios.defaults.headers.common['Authorization'] = token;
        
//         const response = await axios.get(reqUrl);
//         return true;
        
//     }catch(error){
//         console.log(error);
//         alert("Something went while finding user by Id");
//     }
    
// }