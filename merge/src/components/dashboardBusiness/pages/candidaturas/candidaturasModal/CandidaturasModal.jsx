import React, { useEffect, useContext, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import './candidaturasModalStyle.css'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as RiIcons from 'react-icons/ri'
import apiService from '../../../../../Services/api/apiService';
import { AuthContext } from '../../../../../AuthContext';
import TabelaCandidaturas from '../tabelaCandidaturas/TabelaCandidaturas';
import * as HiIcon from "react-icons/hi"
import EditarVagaModal from '../../cadastrarVagas/editarVaga/EditarVagaModal';
import { useNavigate, Link } from "react-router-dom";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: `90%`,
  height: `80%`,
  borderRadius: "10px",
  bgcolor: '#1b1f25',
  border: '2px solid #1a81e2',
  overflow: 'auto',
  boxShadow: 24,
  p: 4,
};


export default function CandidaturasModal(props) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const [candidaturas, setCandidaturas] = useState()
  const [listaCandidatos, setListaCandidatos] = useState({})
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { empresa } = useContext(AuthContext);
  console.log(props)
  useEffect(() => {
    const carregaDados = async () => {
      apiService
        .get(`/candidatura/vaga=${props.vaga.codigo}`)
        .then(response => {
          return response.data
        })
        .then(data => {
          setCandidaturas(data.length)
        })
        .catch(error => {
        })

    }
    carregaDados()
  }, {})


  const handleDeleteVaga = () => {
    apiService
      .delete(`/vaga/${props.vaga.codigo}`)
      .then(response => {
        return response.data
      })
      .then(data => {
        navigate("/business/candidaturas")
        window.location.reload();
      })
      .catch(error => {
      })

  }



  const separador = (string) => {
    let array = string.split(",")
    return array
  }

  return (
    <div className='modal-box'>
      <Button className='button-visualizar-vaga' onClick={handleOpen}>Visualizar</Button>
      <Modal
        style={{ fontFamily: '"Manjari", sans-serif' }}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box className='modal-box' sx={style}>
            <div className='utils-modals'>


              <div>
                <RiIcons.RiCloseFill className='div-close' onClick={() => handleClose()} />
              </div>
            </div>

            <Typography id="transition-modal-title" variant="h6" component="h2">
              <h2 className='titulo-modal-candidaturas'>{props.vaga.nome.toUpperCase()} - {props.vaga.cargo.toUpperCase()}</h2>


            </Typography>

            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <h3 className='sub-modal-title'>Descrição: </h3>
              <span className='span-requisitos'>{props.vaga.descricaoVaga}</span>
            </Typography>

            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <h3 className='sub-modal-title'>Requisitos: </h3>
              {props.vaga.requisitos.map((obj, i) => (
                <span className='span-requisitos'>- {obj.nome}</span>
              ))}
            </Typography>

            <Typography>
              <h3 className='sub-modal-title'>Beneficios: </h3>
              {separador(props.vaga.beneficios).map((b, i) => (
                <span className='span-requisitos' key={i}>- {b}</span>
              ))}
            </Typography>

            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <h4 className='sub-modal-title'>Qtd. Candidaturas: <span className='span-candidaturas'>{candidaturas}</span></h4>
            </Typography>

            {candidaturas == 0 ?
              (
                <div className='div-no-candidaturas'>
                  <h3>Sem há candidaturas para listar</h3>
                </div>
              ) : (<div>
                <TabelaCandidaturas idVaga={props.vaga.codigo} />
              </div>)}

            <div className='align-bottons'>
              <div className='buttons-div'>
                <EditarVagaModal vagaEdit={props.vaga} />
              </div>
              <div className='buttons-div'>
                <Button className='button-delete-vaga' onClick={() => handleDeleteVaga()}>Deletar</Button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
