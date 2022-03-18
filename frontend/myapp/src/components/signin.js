import {useState} from "react"
import axios from "axios"
import { TokenContext } from "./tokenContext"
import { useContext } from "react"
import { useNavigate } from 'react-router-dom';
import "./signin.css"

const Signin = () => {
    const [emailaddress,setEmail] = useState("")
    const [passwordHash,setPassword]  = useState("")
    const [token,setToken] = useContext(TokenContext)
    const [err,setError] = useState("")
    const navigate = useNavigate();

    const Submit = (e)=> {
        e.preventDefault()
        const formData = {emailaddress,passwordHash}  
          axios.post('http://localhost:5000/auth/login',formData)
          .then((response) => {
            console.log(response)
            if (response.status === 200){
                let newToken = response.data.token
                setToken(newToken)
                setEmail("")
                setPassword("")
                console.log(token)
                navigate('/dashboard');
            } 
          }).catch(err => {
            console.log(err.response)
            setError(err.response.data.msg)
          });
    }
  
    return (
        <div className="signin">
            <header>
                <div id="heading"> MOONBEAM <small>LOGIN</small> </div>
            </header>
            <div class= "formContainer"> 
            <form id="signInForm" onSubmit={Submit}>
            <div class="form-group">
            <p id="errMsg">{err}</p>
            <label className="inputLabels" for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" 
            aria-describedby="emailHelp" placeholder="Enter email" value={emailaddress} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div class="form-group">
            <label className="inputLabels" for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" value={passwordHash} onChange={(e)=> 
            (setPassword(e.target.value))}/>
            </div>
            <button type="submit" id="submitt" class="btn btn-primary">Submit</button>
            </form>
            </div>
        </div>
    )
}

export default Signin