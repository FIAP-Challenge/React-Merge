import React from "react"
import './SuporteStyle.css'
import './../stylesPages.css'



const Suporte = () => {

    return(
        <div className="containerPage">

            <div class="containerDiscMaster">

            <div class="containerSuporte">
                
                <div class="containerTexto">
                    <h1>Contate com nosso suporte</h1>
                </div >
                <div class="containerTexto">
                    <p>Está com algum problema ou dúvida? Nossa equipe é composta de profissionais capacitados e está aqui para ajudar você!</p>
                </div>
                <div class="containerTexto">
                    <h2>Envie para este campo abaixo: </h2>
                </div>
                
                

                    <form action="">
                        <div>
                            <input className="campoReporte" type="text" />
                        </div>
                        <div className="containerButton">
                            <input className="buttonEnviar" type="button" value="Enviar" />
                        </div>

                    </form>

                </div>
            </div>

        </div>
    )
}


export default Suporte;