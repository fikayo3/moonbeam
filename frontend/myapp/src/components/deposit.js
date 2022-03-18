import { useState } from "react"
import Sidebar from "./sidebar"
import { TokenContext } from "./tokenContext"
import { useContext } from "react"
import "./deposit.css"

const Deposit = () => {
    const [newAmount,setAmount] = useState("")
    const [alert,setAlert]= useState("")
    const [token,setToken] = useContext(TokenContext)
    const [active,setActive] = useState(false)
    const [side,setSide] = useState(true)

    const toggleState = () => {
      setActive(value => !value)
    }

    const submit = (e) => {
        e.preventDefault()
        const data = {
            newAmount
        }
        fetch('http://localhost:5000/api/wallet/deposit', {
            method: 'POST',
            headers: { "Content-Type": "application/json", "x-auth-token": token },
            body:JSON.stringify(data)
          }).then(res => {
              console.log(data)
                return res.json()
          }).then(data=>{
              console.log(data)
              setActive(true)
              setAlert(data.msg)
              setAmount("")
          })
          .catch(err => {
            console.log(err.status)
          });
    }

    const toggleSideBar = ()=>{
      setSide(value => !value)
    }
    return(
        <div>
        
        <div id="headerDep">
             <div onClick={toggleSideBar} className="menuIcon">
             <img src="/images/menu2.svg" alt="" width="40" height="40"/>
            </div>
              <div className="menuHeading">
                <h1 id="dashboardHeader"> MOONBEAM <small> deposit </small></h1>
              </div>
        </div>
        <main>
            <div className="container">
            <div className="row">
            <div id={side === true ? "depositSideBox":"sideHide"} className="col-md-3">
            <Sidebar/>
            </div>
            <div className="col-md-9">
            <div className="container">
            <div className={active === true ? "show":"hide"} id="alertBox">
              <div className="xBox">
                <button  onClick={toggleState} id="x">
                  x
                </button>
              </div>
              <div  className="alertText">
              <p id="alert"> {alert} </p>
              </div>
            </div>
            <div className="depositBox">
            <div className="inputs">
            <form onSubmit={submit}> 
            <div className="labelBox">
            <label className="depositLabels" for="exampleInputEmail1">Enter Amount</label>
            </div>
            <input type="text" class="form-control" id="exampleInputPassword1"
             placeholder="amount" value={newAmount} onChange={(e)=> setAmount(parseInt(e.target.value))}/>
             <div id="butBox">
             <button id="depositButton">deposit</button>
            </div>
            </form>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </main>
        </div>
    )
}

export default Deposit