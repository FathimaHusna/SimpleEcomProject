
import Signup from './components/Auth/Signup'
import Login from './components/Auth/Login'

import './App.css'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ProductList from './components/Products/ProductList'
import Cart from './components/Cart/Cart'

function App() {
  const isAuthenticated = useSelector((state)=> state.auth.isAuthenticated)

  return (
  

    <Router>
      <Routes>
        
        <Route path='/login' element={!isAuthenticated ? <Login/>  : <Navigate to="/" />}/>
        <Route path='/signup' element = {!isAuthenticated ? <Signup/>: <Navigate to="/login" />}/>
        <Route path = '/' element = {isAuthenticated ? <ProductList/>:<Navigate to="/login"/> }/>
        <Route path='/cart' element= {isAuthenticated ? <Cart/> : <Navigate to={"/login"}/>}/>


     
      </Routes>
    </Router>
    
  )
}

export default App
