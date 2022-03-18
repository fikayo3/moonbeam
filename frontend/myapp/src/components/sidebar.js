import { Link } from "react-router-dom"
import "./sidebar.css"

const Sidebar = () => {
    return(
        <div>
        <div id="container">
        <ul>
        <Link to='/dashboard'>
        <li> <div className="icon"> <img src="/images/dashboard.svg" alt="" width="30" height="30"/></div> HOME</li>
        </Link>
        <Link to='/deposit'>
        <li><div className="icon"> <img src="/images/deposit.svg" alt="" width="30" height="30"/></div> DEPOSIT </li>
        </Link>
        <Link to='/transfer'>
        <li> <div className="icon"> <img src="/images/transfer.svg" alt="" width="30" height="30"/></div> TRANSFER </li>
        </Link>
        <Link to='/update'>
        <li><div className="icon"> <img src="/images/update.svg" alt="" width="30" height="30"/></div>UPDATE</li>
        </Link>
        <Link to='/signin'>
        <li><div className="icon"> <img src="/images/logout.svg" alt="" width="30" height="30"/></div> LOGOUT</li>
        </Link>
      
        </ul>
        </div>
        </div>
    )
}

export default Sidebar