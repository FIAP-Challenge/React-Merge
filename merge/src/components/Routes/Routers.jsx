import { Routes, Route, Navigate, NavLink } from 'react-router-dom'
import Home from '../Home/Home'
import Login from '../Home/Login/Login'
import Registrar from '../Home/Registrar/Registrar'
import EsqueciSenha from '../Home/Login/esqueciSenha/EsqueciSenha'
import { isAuth } from '../../Auth'
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


const ProtectedRoute = ({ user, children }) => {

  if (!user) { //validar aq
    return <Navigate to="/login" replace />;
  }

  return children;
};

const Routers = () => {

  return (

    <>
      <Routes>
        <Route path='/' element={<ProtectedRoute user={true}><Menu/> <Home /> <Footer/> </ProtectedRoute>} />
        <Route path='/login' element={<ProtectedRoute user={true}> <Menu/> <Login /> <Footer/> </ProtectedRoute>} />
        <Route path='/registrar' element={<ProtectedRoute user={true}> <Menu/><Registrar /> <Footer/></ProtectedRoute>} />
        <Route path='/esqueciSenha' element={<ProtectedRoute user={true}> <Menu/><EsqueciSenha /> <Footer/></ProtectedRoute>} />
        <Route path="/dashboard/disc" element={<ProtectedRoute user={isAuth()}> <Dashboard/> <HomeDisc/></ProtectedRoute>} />
        <Route path="/dashboard/disc/perguntas" element={<ProtectedRoute user={isAuth()}> <Dashboard/> <Disc/></ProtectedRoute>} />
        <Route path="/dashboard/curriculo" element={<ProtectedRoute user={isAuth()}><Dashboard/><Curriculo /></ProtectedRoute>} />
        <Route path="/dashboard/vagas" element={<ProtectedRoute user={isAuth()}><Dashboard/><Vagas /></ProtectedRoute>} />
        <Route path="/dashboard/entrevistas" element={<ProtectedRoute user={isAuth()}><Dashboard/><Entrevistas /></ProtectedRoute>} />
        <Route path="/dashboard/informacoes" element={<ProtectedRoute user={isAuth()}><Dashboard/><Informacoes /></ProtectedRoute>} />
        <Route path="/dashboard/suporte" element={<ProtectedRoute user={isAuth()}><Dashboard/><Suporte/></ProtectedRoute>} />
        <Route path="/*" element={<PaginaNaoLocalizada/>} />
    
      </Routes>
    </>

  )
}

export default Routers;

