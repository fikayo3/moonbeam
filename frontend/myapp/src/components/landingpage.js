import {Link} from "react-router-dom"
import { TokenContext } from "./tokenContext"
import {useContext,useEffect} from "react"
import { useState } from "react"
import "./landingpage.css"

const LandingPage = ( ) => {
    const [token,setToken] = useContext(TokenContext)
    const changeToken = () => {
        console.log(token)
    }

    const displayToken = () => {
        console.log(token)
    }

    useEffect(displayToken)

    return (
        <div className= "icontainer">
        <div>
        <h1 id="mainHeading"> MOON BEAM </h1>
        <p id="otherText"> lightweight payments made easy </p>
        <div className= "buttons">
        <Link to ='/signup'><button className="buton"> Register </button></Link>
        <Link to='/signin'><button className="buton"> signin </button></Link>
        </div>
        </div>
        <div id="moonImg">
        <img  src="/images/moony2.svg" alt="" width="450" height="350"/>
        </div>
        </div>
    )
}

export default LandingPage