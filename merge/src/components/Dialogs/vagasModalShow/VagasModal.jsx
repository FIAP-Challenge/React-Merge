import Modal from 'react-modal';
import './vagasModalStyle.css'
import React, { useState, useEffect } from 'react';
import * as AiIcons from "react-icons/ai"
import * as MdMonei from "react-icons/md"
import * as BsIcons from "react-icons/bs"
import * as RiIcons from "react-icons/ri"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReactStoreIndicator from 'react-score-indicator'
import ButtonInfos from './../../Templates/buttonInfos/ButtonInfos'





const VagasModal = (props) => {
    const [modalIsOpen, setIsOpen] = useState(false)

    const openModal = () => {
        var div = document.querySelector('html');
        div.style.overflow = 'hidden'
        setIsOpen(true);
    }

    const closeModal = () => {
        var div = document.querySelector('html');
        div.style.overflow = 'auto'
        setIsOpen(false);

    }

    const separador = (string) => {
        let array = string.split(",")
        return array
    }
    Modal.setAppElement('#root');
    return (
        <div className='containerModal'>
            <div onClick={openModal} className="containerButtonVisualizar">
                <button className='btn-vagas' type="submit">Visualizar</button>
            </div>

            <Modal
                ariaHideApp={false}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example modal"
                overlayClassName="modal-overlay"
                className="modal-content fade-in-image "
            >
                <div className='containerHeaderModal'>
                    <div className='align-Header separatorHeader'>
                        <div>
                            <h1 className='titleVaga'>{props.vaga.status}</h1>
                        </div>
                        <div className='containerCloseModal'>
                            <button className='closeModal' onClick={closeModal}><AiIcons.AiOutlineClose /></button>
                        </div>

                    </div>

                    <div className='separatorHeader'>
                        <h2 className='subTitle'>{props.vaga.nomeVaga} - {props.vaga.nomeCargo}</h2>
                    </div>

                </div>




                <div className='containerBodyModal'>
                    <div className='descricao'>
                        <hr className='style-two-modal' />

                        <div className='infos'>

                            <div className='info-content'>
                                <div>
                                    <RiIcons.RiCoinsLine />
                                </div>
                                <div>
                                    <p>Remuneração</p>
                                </div>
                                <div className='separatorGeneric'>
                                    <p className='info-p'><b>R$ {props.vaga.remuneracao.toFixed(2)}</b></p>
                                </div>
                            </div>


                            <div className='info-content'>
                                <div>
                                    <BsIcons.BsHourglass />
                                </div>
                                <div>
                                    <p>Carga horarária</p>
                                </div>
                                <div className='separatorGeneric'>
                                    <p className='info-p' ><b>{props.vaga.cargaHoraria}</b></p>
                                </div>
                            </div>
                            <div className='info-content'>
                                <div>
                                    <MdMonei.MdOutlineMapsHomeWork />
                                </div>
                                <div>
                                    <p>Modalidade</p>
                                </div>
                                <div className='separatorGeneric'>
                                    <p className='info-p'><b>{props.vaga.modalidadeTrabalho}</b></p>
                                </div>
                            </div>
                        </div>

                        <hr className='style-two-modal' />

                        <div className='separatorGeneric'>
                            <h3>Descrição:</h3>
                        </div>
                        <div>
                            <p>{props.vaga.descricao}</p>
                        </div>

                    </div>

                    <div className='detailsGeneric'>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Requisitos</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    {separador(props.vaga.requisitos).map((obj) => (
                                        <p>- {obj}</p>
                                    ))}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography>Benefícios</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    {separador(props.vaga.beneficios).map((obj) => (
                                        <p>- {obj}</p>
                                    ))}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                    </div>


                    <div className='termometer'>
                        <div className='termoter-content'>
                            <h3>Termômetro</h3>
                        </div>

                        <div className='termoter-content'>
                            <div className='tooltip-termoter'>
                                <ButtonInfos className="tool-tip"
                                mensagem="O Termômetro é o seu indice de sucesso com a vaga, ele é calculado de acordo com os requisitos estabelecidos pela empresa que criou a vaga" />
                            </div>

                            <div>
                                <ReactStoreIndicator
                                    fadedOpacity={20}
                                    className="num"
                                    width={100}
                                    value={props.vaga.score}
                                    maxValue={100}
                                />
                            </div>

                        </div>

                    </div>



                    <div className="containerButtonVisualizar buttonBottom">
                        <button className='btn-vagas' type="submit">Increva-se</button>
                    </div>






                </div>






            </Modal>
        </div>
    )
}

export default VagasModal