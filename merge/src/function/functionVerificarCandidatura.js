
import apiService from '../Services/api/apiService';


export const verificarCandidatura = async () => {

            apiService
                .get(`/candidatura/vaga=${codVaga}&candidato=${codCandidato}`)
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