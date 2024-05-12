import { useState } from 'react'
import './App.css'
import Header from "./components/Header";
import ResetPassword from "./pages/ResetPassword";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SuccessReset from "./pages/SuccessReset";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
           <Route path="/" element={<Header />}/> 
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/reset-password/reset-success" element={<SuccessReset />}/>
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
