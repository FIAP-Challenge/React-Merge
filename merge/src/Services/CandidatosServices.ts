import React from "react"
import axios from "axios"


export default class CandidatoService{


    buscarCEP(cep){
        axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            .then(res => {
                console.log(res)
            })
    }

}