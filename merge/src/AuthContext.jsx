import React, {createContext} from 'react'
import { useNavigate, Link } from "react-router-dom";
import { useState } from 'react';

export const AuthContext = createContext();


function AuthProvider({children}) {
    
    const[auth, setAuth] = useState(false)
    const[candidato, setCandidato] = useState({})
    const[empresa, setEmpresa] = useState({})
    const[isEmpresa, setIsEmpresa] = useState(false)

  

    return(
        <AuthContext.Provider value={{auth, setAuth, candidato, setCandidato, empresa, setEmpresa, isEmpresa, setIsEmpresa}}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthProvider