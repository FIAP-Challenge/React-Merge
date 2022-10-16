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
import { useContext } from "react";
import { AuthContext } from "../../../AuthContext";
import axios from 'axios';
import { termometro } from '../../../function/functionTermometro';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';




const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const VagasModal = (props) => {
    const [modalIsOpen, setIsOpen] = useState(false)
    const { candidato, setCandidato } = useContext(AuthContext)
    const [termetro, setTermetro] = useState(0)
    const [temperatura, setTemperatura] = useState(0);
    const [candidatura, setCandidatura] = useState(false);
    const [open, setOpen] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [severity, setSeverity] = useState("");


    useEffect(() => {
       

        carregaDados()

    }, [])

    const carregaDados = async () => {
        axios
            .get(`http://localhost:8080/Merge/rest/candidatura/vaga=${props.vaga.codigo}&candidato=${candidato.codigo}`)
            .then(response => {
                return response.status
            })
            .then(() => {
                setCandidatura(false)
            })
            .catch(() => {
                setCandidatura(true)
            })
    }
    console.log(candidato)
    console.log(props)
    console.log(candidatura)


    const openModal = () => {
        var div = document.querySelector('html');
        div.style.overflow = 'hidden'
        setIsOpen(true);
    }

    console.log(props)
    const closeModal = () => {
        var div = document.querySelector('html');
        div.style.overflow = 'auto'
        setIsOpen(false);

    }


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    async function handleCandidatura() {
        let objeto = {}
        objeto['codigoCandidato'] = candidato.codigo;
        objeto['codigoVaga'] = props.vaga.codigo
        objeto['score'] = termometro(props.vaga.requisitos, {}, candidato, false)
    
        try {
            let res = await axios({
                method: 'post',
                url: 'http://localhost:8080/Merge/rest/candidatura',
                data: objeto
            });
            let data = res.data;
            setOpen(true)
            setSeverity("success")
            setMensagem("Candidatado com sucesso!")

            return data;
        } catch (error) {

            setOpen(true)
            setSeverity("error")
            setMensagem("Falha em se candidatar, tente novamente!")

            return error.response;
        }
    }

    const separador = (string) => {
        let array = string.split(",")
        return array
    }
    Modal.setAppElement('#root');
    return (
        <div className='containerModal'>

            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={4500} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                        {mensagem}
                    </Alert>
                </Snackbar>
            </Stack>

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
                            {/* <h1 className='titleVaga'>{props.vaga.status}</h1> */}
                        </div>
                        <div className='containerCloseModal'>
                            <button className='closeModal' onClick={closeModal}><AiIcons.AiOutlineClose /></button>
                        </div>

                    </div>

                    <div className='separatorHeader'>
                        <h2 className='subTitle'>{props.vaga.nome} - {props.vaga.cargo}</h2>
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
                                    <p className='info-p'><b>R$ {props.vaga.remuneracao}</b></p>
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
                                    <p className='info-p' ><b>{props.vaga.cargaHoraria}Hrs Dia</b></p>
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
                                    <p className='info-p'><b>{props.vaga.modoTrabalho}</b></p>
                                </div>
                            </div>
                        </div>

                        <hr className='style-two-modal' />

                        <div className='separatorGeneric'>
                            <h3>Descrição:</h3>
                        </div>
                        <div>
                            <p>{props.vaga.descricaoVaga}</p>
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
                                    {props.vaga.requisitos.map((obj, i) => (
                                        <span className='span-requisitos'>- {obj.nome}</span>
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
                                    {separador(props.vaga.beneficios).map((b, i) => (
                                        <span className='span-requisitos' key={i}>- {b}</span>
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
                                    value={termometro(props.vaga.requisitos, {}, candidato, false)}
                                    maxValue={100}
                                />
                            </div>

                        </div>

                    </div>

                    <div className="containerButtonVisualizar buttonBottom">
                        {candidatura ? (
                            <button onClick={() => {
                                try{
                                    setCandidatura(false)
                                    handleCandidatura()
                                }catch(err){

                                }
                              
                            }} className='btn-vagas' type="submit">Increva-se</button>
                        ):
                            <button disabled className='btn-vagas-realizada'>Candidatura realizada!</button>
                        }
                        
                    </div>






                </div>






            </Modal>
        </div>
    )
}

export default VagasModal