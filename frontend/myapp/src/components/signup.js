import { useState } from "react"
import axios from "axios"
import { TokenContext } from "./tokenContext"
import { useContext } from "react"
import { useNavigate } from 'react-router-dom';
import "./signup.css"

const Signup = () => {
    const [emailaddress,setEmail] = useState("")
    const [username,setUsername] = useState("")
    const [companyname,setCompanyName] = useState("")
    const [passwordHash,setPassword] = useState("")
    const [token,setToken] = useContext(TokenContext)
    const [err,setError] = useState("")
    const navigate = useNavigate();

    const submit = (e) => {
        e.preventDefault()
        const formData = {emailaddress,username,companyname,passwordHash}
        axios.post('http://localhost:5000/auth/signup',formData)
        .then((response) => {
          console.log(formData)
          console.log(response)
          let newToken = response.data.token
          setToken(newToken)
          console.log(token)
          navigate('/dashboard');
          }).catch(err => {
            console.log(err.response)
            setError(err.response.data.msg)
          });
        }
    
    return (
    <div className="signup">
    <header>
        <div id="heading"> MOONBEAM <small>register</small> </div>
    </header>
    <div class= "formContainer"> 
    <form id="signUpForm" onSubmit={submit}>
    <p id="errMsg">{err}</p>
    <div class="form-group">
    <label className="inputLabels" for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" 
    aria-describedby="emailHelp" placeholder="Enter email" value={emailaddress} onChange={(e)=>{setEmail(e.target.value)}} />
    </div>
    <div class="form-group">
    <label className="inputLabels" for="exampleInputEmail1">Username</label>
    <input type="text" class="form-control" id="" 
    aria-describedby="emailHelp" placeholder="Enter Username" value={username} 
    onChange={(e)=>{setUsername(e.target.value)}} />
    </div>
    <div class="form-group">
    <label className="inputLabels" for="exampleInputEmail1">CompanyName</label>
    <input type="text" class="form-control" id="" 
    aria-describedby="emailHelp" placeholder="Enter Company name"  value={companyname} 
    onChange={(e)=>{setCompanyName(e.target.value)}}/>
    </div>
    <div class="form-group">
    <label className="inputLabels" for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" 
    value={passwordHash} onChange={(e)=>{setPassword(e.target.value)}}/>
    </div>
    <button type="submit" className="submit">Submit</button>
    </form>
    </div>
    </div>
)
}

export default Signup 