import React, {createContext} from 'react'
import { useState } from 'react';

export const AuthContext = createContext();


function AuthProvider({children}) {

    const[auth, setAuth] = useState(false)
    const[candidato, setCandidato] = useState({})
    const[empresa, setEmpresa] = useState({})
    return(
        <AuthContext.Provider value={{auth, setAuth, candidato, setCandidato, empresa, setEmpresa}}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthProvider