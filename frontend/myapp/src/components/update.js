import Sidebar from "./sidebar"
import { useState } from "react"
import { TokenContext } from "./tokenContext"
import { useContext } from "react"
import "./update.css"

const Update = () => {
    const [newCompanyname,setCompany] = useState("")
    const [newEmail,setMAil] = useState("")
    const [alert,setAlert]= useState("")
    const [token,setToken] = useContext(TokenContext)
    const [active,setActive] = useState(false)
    const [side,setSide] = useState(true)

    const toggleState = () => {
      setActive(value => !value)
    }

    const data = {newEmail,newCompanyname}
    const submit = (e) => {
      e.preventDefault()
      console.log(data)
      fetch('http://localhost:5000/api/wallet/updateWallet', {
        method: 'POST',
        headers: { "Content-Type": "application/json", "x-auth-token": token },
        body:JSON.stringify(data)
      }).then(res => {
          console.log(data)
            return res.json()
      }).then(data=>{
          console.log(data)
          setAlert(data.msg)
          setActive(true)
          setCompany("")
          setMAil("")
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
          <div className="updateHeader">
          <div onClick={toggleSideBar} className="menuIcon">
             <img src="/images/menu2.svg" alt="" width="40" height="40"/>
            </div>
              <div className="menuHeading">
                <h1 id="dashboardHeader"> MOONBEAM <small> update ya wallet </small></h1>
              </div>
        </div>
        <main>
            <div className="container">
            <div className="row">
            <div id={side === true ? "updateSideBox":"sideHide"} className="col-md-3">
            <Sidebar/>
            </div>
            <div className="col-md-9">
            <div className="container">
            <div className={active === true ? "show":"hide"} id="alertBox">
              <div className="xBox">
                <button onClick={toggleState} id="x">
                  x
                </button>
              </div>
              <div className="alertText">
              <p id="alert"> {alert} </p>
              </div>
            </div>
            <div className="updateBox">
            <div className="inputs">
            <form onSubmit={submit}> 
            <div className="labelBox">
            <label className="updateLabels" for="exampleInputEmail1">Enter New Email</label>
            </div>
               <input type="email" class="form-control" id="exampleInputPassword1"
             placeholder="new mail" value={newEmail} onChange={(e)=> setMAil(e.target.value)}/>
            <div className="labelBox">
            <label className="updateLabels" for="exampleInputEmail1">New companyName</label>
            </div>
            <input type="text" class="form-control" id="exampleInputPassword1"
             placeholder="New company name" value={newCompanyname} onChange={(e)=> setCompany(e.target.value)}/>
              <div className="ox" id="butBox">
              <button id="updateButton">update</button>
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

export default Update