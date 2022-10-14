import React, { useState, useEffect } from "react"
import './VagasStyles.css'
import axios from "axios";
import VagasModal from "../../../Dialogs/vagasModalShow/VagasModal";

const Vagas = () => {

    const [vagas, setVagas] = useState([]);

    useEffect(() => {
        carregaDados()

    }, [])

    const concatenar = (obj) =>{
        let valores = "";
        obj.forEach((v) => {
            valores += v.nome + ", "
        })
       valores = valores.slice(0, -1)
      return valores.slice(0, -1)
    }
   
    const carregaDados = async () => {
        axios
            .get(`http://localhost:8080/Merge/rest/vaga`)
            .then(response => {
                return response.data
            })
            .then(data => {
                console.log(data)
                setVagas(data)
            })
            .catch(error => {
                console.log(error.response.data.error)
            })
    }








    return (
        <div className="containerVagasMaster">

            {vagas.map((e, i) => (
     <div key={e.codigo} className="containerVagas">

        <div className="vagaHeader">
                        <h1 className="nomeVaga">{e.nome} - {e.cargo}</h1>
		</div>

		<div className="vagaBody">
			<p className="descricaoVaga">{e.descricaoVaga}</p>
		</div>

		<div className="vagaFooter">
			<h3 className="requisitos">Requisitos:</h3>
            <p>{concatenar(e.requisitos)}</p>
            
		</div>

		<div className="containerModal">
			<VagasModal vaga={e} />
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