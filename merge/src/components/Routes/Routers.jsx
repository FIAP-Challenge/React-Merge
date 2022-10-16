import { Routes, Route, Navigate, NavLink } from 'react-router-dom'
import Home from '../Home/Home'
import Login from '../Home/Login/Login'
import Registrar from '../Home/Registrar/Registrar'
import EsqueciSenha from '../Home/Login/esqueciSenha/EsqueciSenha'
import Dashboard from '../dashboard/Dashboard'
import Footer from '../Home/Footer/Footer'
import Menu from '../Home/Menu/Menu'
import Vagas from '../dashboard/pages/vagas/Vagas'
import Curriculo from '../dashboard/pages/curriculos/Curriculo'
import Entrevistas from '../dashboard/pages/entrevistas/Entrevistas'
import Informacoes from '../dashboard/pages/informacoes/Informacoes'
import Suporte from '../dashboard/pages/suporte/Suporte'
import PaginaNaoLocalizada from '../paginaNaoLocalizado/PaginaNaoLocalizada'
import Disc from '../dashboard/pages/disc/Disc'
import HomeDisc from '../dashboard/pages/disc/HomeDisc/HomeDisc'
import React, { useContext } from "react"
import { AuthContext } from '../../AuthContext'

const ProtectedRoute = ({ user, children }) => {

  if (!user) { //validar aq
    return <Navigate to="/login" replace />;
  }

  return children;
};

const Routers = () => {
  const { auth } = useContext(AuthContext)

  return (

    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registrar' element={<Registrar />} />
        <Route path='/esqueciSenha' element={<EsqueciSenha />} />
        <Route path="/dashboard/disc" element={<ProtectedRoute user={auth}> <Dashboard/> <HomeDisc/></ProtectedRoute>} />
        <Route path="/dashboard/disc/perguntas" element={<ProtectedRoute user={auth}> <Dashboard/> <Disc/></ProtectedRoute>} />
        <Route path="/dashboard/curriculo" element={<ProtectedRoute user={auth}><Dashboard/><Curriculo /></ProtectedRoute>} />
        <Route path="/dashboard/vagas" element={<ProtectedRoute user={auth}><Dashboard/><Vagas /></ProtectedRoute>} />
        {/* <Route path="/dashboard/entrevistas" element={<ProtectedRoute user={auth}><Dashboard/><Entrevistas /></ProtectedRoute>} /> */}
        {/* <Route path="/dashboard/informacoes" element={<ProtectedRoute user={auth}><Dashboard/><Informacoes /></ProtectedRoute>} /> */}
        {/* <Route path="/dashboard/suporte" element={<ProtectedRoute user={auth}><Dashboard/><Suporte/></ProtectedRoute>} /> */}
        <Route path="/*" element={<PaginaNaoLocalizada/>} />
       
      </Routes>
    </>

  )
}

export default Routers;

