import { Routes, Route, Navigate, NavLink } from 'react-router-dom'
import Home from '../Home/Home'
import Login from '../Home/Login/Login'
import Registrar from '../Home/Registrar/Registrar'
import EsqueciSenha from '../Home/Login/esqueciSenha/EsqueciSenha'

const PublicRouter = () => {

 
  return (

    <>
      <Routes>
        <Route path='/' element={ <Home />} />
        <Route path='/login' element={ <Login />} />
        <Route path='/registrar' element={<Registrar /> } />
        <Route path='/esqueciSenha' element={<EsqueciSenha /> }/>
    
      </Routes>
    </>

  )
}

export default PublicRouter;

