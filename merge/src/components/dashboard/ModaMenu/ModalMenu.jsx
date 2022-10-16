import * as BsIcon from "react-icons/bs"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from 'react-modal';
import React, { useState, useContext } from "react";
import { AuthContext } from "../../../AuthContext";
import './ModalMenu.css'
import { useNavigate, Link } from "react-router-dom";
import ModalAtualizar from './../ModalAtualizarRegistro/ModalAtualizar'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ModalMenu = () => {
    const navigate = useNavigate();
    const { setAuth, candidato } = useContext(AuthContext)
    const [openModalAtt, setopenModalAtt] = useState(false)
    const [open, setOpen] = useState(false);




    if (open) {
        document.addEventListener('mouseup', function (e) {
            var container = document.getElementById('container-menu');
            if (!container.contains(e.target)) {
                container.style.display = 'none';
            }
        });
    }


    return (
        <>
            <div onClick={() => setOpen(!open)} >

                <div className="usuario-login-nome" >
                    <span>{candidato.nome.split(" ")[0].toUpperCase()}</span>
                    
                </div>
                <div className="usuario-login" >

                    <BsIcon.BsPersonCircle />
                </div>
                

            </div>



            {open ? (
                <div id="container-menu" className="show-layout-options">
                    <nav>
                        <ul>
                            <li onClick={() => {
                                setopenModalAtt(!openModalAtt)

                            }}>Meus dados</li>
                            <li onClick={() => {

                                localStorage.removeItem("__SESSION__")
                                setInterval(() => {
                                    setAuth(false)

                                }, 1000);

                                window.location.reload(); 

                            }}>Sair</li>
                        </ul>
                    </nav>
                </div>
            ) : ""
            }

            {openModalAtt ? (<ModalAtualizar />) : ""}
        </>
    )
}

export default ModalMenu;