import { useState } from 'react'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Footer from './Components/Footer'
import Loader from './Components/Loader'


function App() {
  const [count, setCount] = useState(0)

  return (
<>

<Router>

   
        <Routes>
          <Route path="/" element={<Loader />} />
          <Route path="/home" element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          } />
          <Route path="/patientlogin" element={
            <>
              <Navbar />
              <Footer />
            </>
          } />
  </Routes>

</Router>

</>
  )
}

export default App
