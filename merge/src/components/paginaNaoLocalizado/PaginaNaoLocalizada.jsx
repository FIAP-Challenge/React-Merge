import React from "react";
import './PaginaNaoLocalizadaStyle.css'
import mergeLogo from './../../Assets/Merge.svg'
import iconMerge from './../../Assets/icon merge.svg'
import img404 from './../../Assets/404 Error-rafiki.svg'
import { Link } from 'react-router-dom'

const PaginaNaoLocalizada = () => {
    return (
        <>
            <div className="notFoundContainer">

                <div>
                    <img className="mergeLogo" src={mergeLogo} alt="logo da merge" />
                    <p>Desculpe essa página não existe</p>

                    <Link to="/">
                        <button className="backToHome">Voltar para o home</button>
                    </Link>
                </div>
                {/* <img src={iconMerge} alt="" /> */}

                <div>
                    <img className="img404" src={img404} alt="imagem de 404 pagina nao encontrada" />
                </div>


            </div>
        </>
    )
}

export default PaginaNaoLocalizada;