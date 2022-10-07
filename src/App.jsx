import { useEffect, useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import ProductDetails from './Components/ProductDetails'
import Login from './Components/Login'
import Purchases from './Components/Purchases'
import MyNavbar from './Components/MyNavbar'
import Loading from './Components/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsThunk } from './store/slices/products.slice'
import ProtectedRoutes from './Components/ProtectedRoutes'
import { Container } from 'react-bootstrap'

function App() {
  const [count, setCount] = useState(0)

  const isLoading= useSelector(state=> state.isLoading)
 const dispatch= useDispatch();

  useEffect(()=>{
    dispatch(getProductsThunk())
 }, [])


  return (
  <HashRouter>
    <MyNavbar/>
    <Container className='mt-5'>
    {isLoading && <Loading/>}
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/products/:id' element={<ProductDetails/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route element={<ProtectedRoutes/>}>
      <Route path='/purchases' element={<Purchases/>}/>
      </Route>
    </Routes>
    </Container>
  </HashRouter>
  )
}

export default App
