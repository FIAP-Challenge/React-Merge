import { Routes, Route, Navigate, NavLink } from 'react-router-dom'
import Home from '../Home/Home'
import Login from '../Home/Login/Login'
import Registrar from '../Home/Registrar/Registrar'
import EsqueciSenha from '../Home/Login/esqueciSenha/EsqueciSenha'
import Dashboard from '../dashboard/Dashboard'
import Vagas from '../dashboard/pages/vagas/Vagas'
import Curriculo from '../dashboard/pages/curriculos/Curriculo'
import PaginaNaoLocalizada from '../paginaNaoLocalizado/PaginaNaoLocalizada'
import Disc from '../dashboard/pages/disc/Disc'
import HomeDisc from '../dashboard/pages/disc/HomeDisc/HomeDisc'
import React, { useContext } from "react"
import DashboardBusiness from '../dashboardBusiness/DashboardBusiness'
import { AuthContext } from '../../AuthContext'
import Candidaturas from './../dashboardBusiness/pages/candidaturas/Candidaturas'
import CadastrarVagas from '../dashboardBusiness/pages/cadastrarVagas/CadastraVagas'
import Footer from '../Home/Footer/Footer'

const ProtectedRoute = ({ user, children }) => {

  if (!user) { //validar aq
    return <Navigate to="/login" replace />;
  }

  return children;
};


const ProtectedBusiness = ({ user, business, children }) => {

  if (!user && !business) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

const Routers = () => {
  const { auth, isEmpresa } = useContext(AuthContext)

  return (

    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registrar' element={<Registrar />} />
        <Route path='/esqueciSenha' element={<EsqueciSenha />} />
        <Route path="/*" element={<PaginaNaoLocalizada />} />

        <Route path="/dashboard/disc" element={<ProtectedRoute user={auth}> <Dashboard /> <HomeDisc /></ProtectedRoute>} />
        <Route path="/dashboard/disc/perguntas" element={<ProtectedRoute user={auth}> <Dashboard /> <Disc /></ProtectedRoute>} />
        <Route path="/dashboard/curriculo" element={<ProtectedRoute user={auth}><Dashboard /><Curriculo /></ProtectedRoute>} />
        <Route path="/dashboard/vagas" element={<ProtectedRoute user={auth}><Dashboard /><Vagas /></ProtectedRoute>} />

        <Route path="/business/candidaturas" element={<ProtectedRoute user={isEmpresa}> <DashboardBusiness /> <Candidaturas /></ProtectedRoute>} />
        <Route path="/business/cadastrar" element={<ProtectedBusiness user={isEmpresa}>  <DashboardBusiness /> <CadastrarVagas /></ProtectedBusiness>} />
      </Routes>
    </>

  )
}

export default Routers;

