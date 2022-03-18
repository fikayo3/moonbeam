import React from "react";
import { BrowserRouter as Router,Route,Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LandingPage from "./components/landingpage";
import Signin from "./components/signin";
import Signup from "./components/signup";
import Deposit from "./components/deposit";
import Dashboard from "./components/dashboard";
import Transfer from "./components/transfer";
import Update from "./components/update";
import { TokenProvider,TokenContext } from "./components/tokenContext";

function App() {
  return (
    <TokenProvider>
    <div className="App">
    <Router>
      <Routes>
      <Route path="/update" element={<Update/>} />
      <Route path="/transfer" element={<Transfer/>} />
      <Route path="/deposit" element={<Deposit/>} />
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/signup" element={<Signup/>} />
      <Route path="/signin" element={<Signin/>} />
      <Route path="/" element={<LandingPage/>} />
      </Routes>
    </Router>
    </div>
    </TokenProvider>
  );
}

export default App;
