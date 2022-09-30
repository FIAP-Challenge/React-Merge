import React, { useState, useEffect } from "react"
import './VagasStyles.css'
import axios from "axios";
import VagasModal from "../../../Dialogs/vagasModalShow/VagasModal";

const Vagas = () => {

    const [vagas, setVagas] = useState([]);

    useEffect(() => {
        carregaDados()

    }, [])

    const carregaDados = async () => {
        axios
            .get("http://localhost:3000/vagas.json")
            .then((res) => setVagas(res.data.vagas))
            .catch(err => console.log(err))
    }








    return (
        <div className="containerVagasMaster">

            {vagas.map((e) => (
                <div key={e.vaga.idVaga} className="containerVagas">

                    <div className="vagaHeader">
                        <h1 className="nomeVaga">{e.vaga.nomeVaga} - {e.vaga.nomeCargo}</h1>
                    </div>

                    <div className="vagaBody">
                        <p className="descricaoVaga">{e.vaga.descricao}</p>
                    </div>

                    <div className="vagaFooter">
                        <h3 className="requisitos">Requisitos:</h3>
                        <p className="pRequisitos">{e.vaga.requisitos}</p>
                    </div>

                    <div className="containerModal">
                        <VagasModal vaga={e.vaga} />
                    </div>
                

                    {/* <div className="containerButtonVisualizar">
                        <button className='btn-vagas' type="submit">Visualizar</button>
                    </div> */}



                </div>
            ))}



        </div>
    )
}


export default Vagas;