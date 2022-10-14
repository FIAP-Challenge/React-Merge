import React, {createContext} from 'react'
import { useState } from 'react';

export const AuthContext = createContext();


function AuthProvider({children}) {

    const[auth, setAuth] = useState(false)
    const[candidato, setCandidato] = useState({})
    return(
        <AuthContext.Provider value={{auth, setAuth, candidato, setCandidato}}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthProvider