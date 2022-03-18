import { TokenContext } from "./tokenContext"
import { useContext } from "react"
 import { useState,useEffect} from "react"
 import Sidebar from "./sidebar"
 import "./dashboard.css"

 const Dashboard = ()=> {
    const [token,setToken] = useContext(TokenContext)
    const [username,setUsername] = useState("")
    const [balance,setBalance] = useState("")
    const [side,setSide] = useState(true)
    const [transactions,setTransactions] = useState([])

    const getUser = () => {
      fetch('http://localhost:5000/api/wallet/dashboard', {
      method: 'Get',
      headers: { "Content-Type": "application/json", "x-auth-token": token },
    }).then(res => {
          return res.json()
    }).then(data=>{
        console.log(data)
        setUsername(data.username)
        setBalance(data.amount)
        getUserTransactions()
    })
    .catch(err => {
      console.log(err.status)
    })
    }

    const getUserTransactions = () => {
      fetch('http://localhost:5000/api/wallet/userTransactions', {
        method: 'Get',
        headers: { "Content-Type": "application/json", "x-auth-token": token },
      }).then(res => {
            return res.json()
      }).then(data=>{
          console.log(data)
          setTransactions(data) 
      })
      .catch(err => {
        console.log(err.status)
      });
    }

    useEffect(() =>{
      getUser()
  }, [])

  const toggleSideBar = ()=>{
    setSide(value => !value)
  }

      return (
        <div>
           <div id="headerContain">
             <div onClick={toggleSideBar} className="menuIcon">
             <img src="/images/menu2.svg" alt="" width="40" height="40"/>
              </div>
              <div className="menuHeading">
                <h1 id="dashboardHeader"> MOONBEAM <small>dashboard</small></h1>
              </div>
              <div className="headerRight">
                <h1 id="dhRight"> hello {username} </h1>
              </div>
            </div>
            <main id="main">
            <div className="container">
            <div className="row">
            <div id={side === true ? "sideBox":"sideHide"} className="col-md-3">
            <Sidebar/>
            </div>
            <div className="col-md-9">
            <div id="col" className="container">
            <div className="walletBox">
            <h1 id="walletBalance">  ---WALLET--- </h1>
            <div className="w">
            <div className="nairaicon">
            <img src="/images/naira.svg" alt="" width="150" height="70"/> 
            </div>
            <div className="amountBalance">
            <h1 id="bal">{balance}</h1>
            </div>
            </div>
            </div>
            <div className="recentTransactions">
            <div className="tBox">
            <h1 id="transactions">RecentTransactions</h1>
              </div>
            {transactions.length > 0 ? 
            (
                 <table class="table table-hover table-responsive">
                        <thead id="tableHead" style={{color:'black',fontFamily:'cursive',fontSize:'8px',fontWeight:"bold"}}>
                        <tr>
                        <th  scope="col">transaction </th>
                        <th  scope="col">sender </th>
                        <th  scope="col">receiver</th>
                        <th  scope="col">amount</th>
                        </tr>
                        </thead>
                  <tbody id="tableBody" style={{color:"black",fontSize:'6px',fontFamily:'monospace',fontWeight:"bold"}} >
                  {transactions.map(data => (
                      <tr>
                      <td>{data.transactionType}</td>
                      <td>{data.sender}</td>
                      <td>{data.receiver}</td>
                      <td>{data.amountSent}</td>
                      </tr>
                      ))}
                  </tbody>     
                  </table>
               ): 
               (<div className="noTransactions">
            <p id="tranText"> NO TRANSACTIONS YET KINDLY DEPOSIT </p>
            <div className="dangerBox">
            <img src="/images/danger.svg" alt="" width="50" height="100"/>
            </div>
            </div>
            )}
            </div>
            </div>
            </div>
            </div>
            </div>
            </main>
        </div>        
    )
}

export default Dashboard
