import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getPersons = ()=>{
    const req = axios.get(baseUrl)
    return req.then(res=>res.data)    
}

const addPersons = (newdata)=>{
    const req = axios.post(baseUrl,newdata)
    return req.then(res=>res.data)    
}

export default { getPersons, addPersons }