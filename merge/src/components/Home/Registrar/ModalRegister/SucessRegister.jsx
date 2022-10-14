import Modal from 'react-modal';
import './sucessRegister.css'
import React, { useState, useEffect } from 'react';
import * as AiIcons from "react-icons/ai"


const ErroLogin = (props) => {

    const [modalIsOpen, setIsOpen] = useState()

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);

    }

    setTimeout(() => {
        closeModal()
    }, 4000);


    return (
        <div className='containerModalSucess'>
            <button onClick={openModal}>abir</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example modal"
                overlayClassName="modal-overlay-sucess"
                className="modal-content-sucess"
            >

                <div className='containerHeaderModalSucess'>
                    <h2>Registrado com sucesso</h2>
                    {/* <div className='containerCloseModal'>
                        <button className='closeModal' onClick={closeModal}><AiIcons.AiOutlineClose /></button>
                    </div> */}

                </div>
               
                <hr className='style-two-modal' />
                <p>
                    Você será direcionado em breve
                </p>
                <div className='align-loading'>
                    <div className='loader'></div>

                </div>

            </Modal>
        </div>
    )

}

export default ErroLogin