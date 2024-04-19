import axios from "axios";

const baseUrl = "http://localhost:3001/api/persons";

const getPersons = ()=>{
    const req = axios.get(baseUrl)
    return req.then(res=>res.data)    
}

const addPersons = (newdata)=>{
    const req = axios.post(baseUrl,newdata)
    return req.then(res=>res.data)    
}

const removePersons = (id)=>{
   const req = axios.delete(`${baseUrl}/${id}`)
   return req.then(res=>res.data)
}

export default { getPersons, addPersons, removePersons }