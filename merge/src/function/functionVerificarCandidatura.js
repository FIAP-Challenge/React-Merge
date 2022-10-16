import axios from 'axios';


export const verificarCandidatura = async () => {

            axios
                .get(`http://localhost:8080/Merge/rest/candidatura/vaga=${codVaga}&candidato=${codCandidato}`)
                .then(response => {
                    return response.status
                })
                .then(data => {

                    return true
                    
                })
                .catch(error => {
                    return false
                })

}