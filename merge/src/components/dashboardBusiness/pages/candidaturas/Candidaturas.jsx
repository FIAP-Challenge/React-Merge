import React from "react"
import './candidaturasStyles.css'
import './../stylesPages.css'
import * as MdIcons from "react-icons/md"
const Candidaturas = () => {

    return (
        <div className="containerPage">

            <div className="painel-candidaturas">

                <div className="count-infos">

                    <span>vagas</span>
                    <span>12</span>

                </div>

                <div className="count-infos">
                    <span>candidaturas</span>
                    <span>16</span>

                </div>

                <div className="count-infos">
                    <span>infos</span>
                    <span>12</span>
                </div>

            </div>

            <div className="space-content">

            </div>

            <div className="painel-vagas-pubs">

                <div className="edit-vaga">
                    <div className="status-vaga">
                        <span>Publicada</span>
                    </div>

                    <div>
                        <MdIcons.MdMoreVert />
                    </div>
                </div>

                <div>
                    <div className="header-vaga">
                        <h4>Nome vaga</h4>
                    </div>
                    <div className="footer-vaga">
                        <span>codigo: 0001</span>
                    </div>
                </div>

            </div>



        </div>
    )
}


export default Candidaturas;