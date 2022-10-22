import React, { useState, useEffect, useContext } from "react"
import './candidaturasStyles.css'
import './../stylesPages.css'
import * as HiIcon from "react-icons/hi"
import { AuthContext } from './../../../../AuthContext'
import Masonry from 'react-masonry-component';
import CandidaturasModal from "./candidaturasModal/CandidaturasModal"
import apiService from './../../../../Services/api/apiService'

const masonryOptions = {
    transitionDuration: 0
};

const imagesLoadedOptions = { background: '.my-bg-image-el'}

const Candidaturas = () => {
    const { empresa } = useContext(AuthContext)
    const [vagas, setVagas] = useState([]);
    const [candidaturas, setCandidaturas] = useState([]);
    const [guarda, setGuarda] = useState()

    const imagesLoadedOptions = { background: '.my-bg-image-el' }

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

    useEffect(() => {
        const carregaDados = async () => {
            apiService
                .get(`/vaga/${empresa.codigo}`)
                .then(response => {
                    return response.data
                })
                .then(data => {
                    setVagas(data)
                })
                .catch(error => {
                })

            apiService
                .get(`/candidatura`)
                .then(response => {
                    return response.data
                })
                .then(data => {
                    setCandidaturas(data)
                })
                .catch(error => {
                })
        }


        carregaDados()




    }, [])


    return (
        <div className="cotent-space">
            <div className="painel-candidaturas">

                <div className="count-infos">

                    <span>Quantidade vagas</span>
                    <span className="count-span">{vagas.length}</span>

                </div>

                <div className="count-infos">
                    <span>Quantidade Candidaturas</span>
                    <span className="count-span">{candidaturas.length}</span>

                </div>

            </div>
            <dir className="align-vagas-candidaturas">
                {vagas.map((v) => {
                    return (
                        <div key={v.codigo} className="painel-vagas-pubs">
                            <div className="edit-vaga">
                                <div className="status-vaga">
                                    <span>Publicada</span>
                                </div>
                            </div>
                            <div>
                                <div className="header-vaga">
                                    <h4>{v.nome.toUpperCase()} - {v.cargo.toUpperCase()}</h4>
                                </div>
                                <div className="body-vaga">
                                    <span className="vaga-describre">Descrição:</span>
                                    <span>{v.descricaoVaga}</span>
                                </div>
                                <div className="footer-vaga div-codigo">
                                    <div>
                                        <span className="span-days">Prazo: {countDays(v.dataFim)}</span>
                                    </div>
                                    <div >
                                        <span className="span-codigo">vaga: 000{v.codigo}</span>
                                    </div>
                                </div>

                                <div className="separator-vagas-modal">
                                    <CandidaturasModal vaga={v} />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </dir>


        </div >
    )
}


export default Candidaturas;