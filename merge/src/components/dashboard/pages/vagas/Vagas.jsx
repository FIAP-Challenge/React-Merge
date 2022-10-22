import React, { useState, useEffect } from "react"
import './VagasStyles.css'
import axios from "axios";
import VagasModal from "../../../Dialogs/vagasModalShow/VagasModal";
import ModalAtualizar from './../../ModalAtualizarRegistro/ModalAtualizar'
import apiService from "../../../../Services/api/apiService";

const masonryOptions = {
    transitionDuration: 3
};
const Vagas = () => {

    const [vagas, setVagas] = useState([]);


    const countDays = (param) => {

        const diffInMs = new Date(param) - new Date()
        if (diffInMs < 0) {
            return "Finalizada"
        } else if (diffInMs == 0) {
            return "Ultimo dia"
        } else {
            return `${Math.round(diffInMs / (1000 * 60 * 60 * 24))} dias`
        }

    }

    const imagesLoadedOptions = { background: '.my-bg-image-el' }

    useEffect(() => {
        const carregaDados = async () => {
            apiService
                .get(`/vaga`)
                .then(response => {
                    return response.data
                })
                .then(data => {
                    setVagas(data)
                })
                .catch(error => {
                })
        }

        carregaDados()

    }, [])

    const concatenar = (obj) => {
        let valores = "";
        obj.forEach((v) => {
            valores += v.nome + ", "
        })
        valores = valores.slice(0, -1)
        return valores.slice(0, -1)
    }


    return (
        <div className="cotent-space align-vagas-candidaturas">

            {vagas.map((v) => {
                return (

                    <div key={v.codigo} className="painel-vagas-pubs">
                        <div>
                            <div className="header-vaga">
                                <h4>{v.nome.toUpperCase()} - {v.cargo.toUpperCase()}</h4>
                            </div>

                            <div className="body-vaga">
                                <span className="vaga-describre">Descrição:</span>
                                <span>{v.descricaoVaga}</span>

                                <div className="vagas-requisitos">
                                    <h3 className="title-requisitos">Requisitos: </h3>
                                    {v.requisitos.map((obj, i) => (
                                        <span className='span-requisitos'>- {obj.nome}</span>
                                    ))}
                                </div>

                            </div>
                            <div className="footer-vaga div-codigo" >
                                <div>
                                    <span className="span-days">Prazo: {countDays(v.dataFim)}</span>
                                </div>
                                <div >
                                    <span className="span-codigo">vaga: 000{v.codigo}</span>
                                </div>

                            </div>

                            <div className="separator-vagas-modal">
                                <VagasModal vaga={v} />
                            </div>

                        </div>

                    </div>
                )


            })}
       
        </div>

    )
}


export default Vagas;