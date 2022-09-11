import React from "react";
import { Link } from "react-router-dom";
import logoMerge from "./../../../../Assets/icon merge.svg"
import "./esqueciSenhaStyle.css"


const EsqueciSenha = () => {

    return (
        <>
            <div className="containerLoginMaster">

                <div className="containerLogin">

                    <div className="Logo-div">
                        <Link to="/"><img className="logoMerge" src={logoMerge} alt="Logotipo Merge" /></Link>
                    </div>
                    <div className='formsInputsLogin'>
                        <label className='labelRegistrar' htmlFor="email">E-mail *</label>
                        <input id="email" className="inputRegistrar" type="email" name="email" placeholder="E-mail" />

                    </div>

                    <div className="div-forgot-email">
                        <span className="span-forgot-pass">Não sei meu email</span>
                    </div>
                    <div className='buttonLoginContainer'>

                        <button className='btn-login' type="submit">Redefinir senha</button>

                    </div>
                </div>
            </div>
        </>
    )
}
export default EsqueciSenha