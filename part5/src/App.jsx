import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import axios from 'axios'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    // functionality of showing the blogs of the logged in user is not yet implemented
    // as of now all the blogs are shown
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  },[])

  useEffect(()=>{
      let userInfo = localStorage.getItem("loggedInUser")
      if(userInfo){
        setUser(JSON.parse(userInfo))
      }
  },[])

  const handleLogin = (e) =>{
    e.preventDefault()
    console.log(e)
    axios.post("/api/login",{username,password})
    .then(res => localStorage.setItem("loggedInUser",JSON.stringify(res.data)))
    .then(res => setUser(res))    
    .then(res => setUsername(""))
    .then(res => setPassword(""))    
    .catch(error => console.log(error)) 
  }

  if(user === null){
    return(
      <div>
        <h1>login to the application</h1>
        <form onSubmit={(e)=>handleLogin(e)}>
          <input type='text' placeholder='Enter the username' onChange={(e)=>setUsername(e.target.value)}/>
          <input type='password' placeholder='Enter the password' onChange={(e)=>setPassword(e.target.value)}/>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <h3>{user.name} has logged in</h3>
      <button onClick={()=>{
        localStorage.removeItem("loggedInUser")
        setUser(null)
      }}>logout</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App