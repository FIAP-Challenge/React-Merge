import Modal from 'react-modal';
import './ErroLoginStyle.css'
import React, { useState, useEffect } from 'react';
import * as AiIcons from "react-icons/ai"


const ErroLogin = () => {

    const [modalIsOpen, setIsOpen] = useState(false)


    const openModal = () => {
        setIsOpen(true);
    }


    const closeModal = () => {
        setIsOpen(false);
        
    }

   




    return (
        <div className='containerModal'>
            {/* <button onClick={openModal}>abir</button> */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example modal"
                overlayClassName="modal-overlay"
                className="modal-content"
            >

                <div className='containerHeaderModal'>
                    <h2>Falha no login</h2>
                    <div className='containerCloseModal'>
                        <button className='closeModal' onClick={closeModal}><AiIcons.AiOutlineClose /></button>
                    </div>

                </div>
                <hr className='style-two-modal' />
                <p>Falha na autenticação
                    OBS: na fase de teste para autenticar:  <br />
                    <b>E-mail:</b>  teste@fiap.com.br <br />
                    <b>senha:</b>12345678

                </p>

            </Modal>
        </div>
    )

}

export default ErroLogin