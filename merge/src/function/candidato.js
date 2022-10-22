
export function parseCandidato(param, score) {

    console.log("TO no candidato.js " + score)

    function formataCPF(cpf) {
        //retira os caracteres indesejados...
        cpf = cpf.replace(/[^\d]/g, "");

        //realizar a formatação...
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }


    function idade(nascimento, hoje) {
        var diferencaAnos = hoje.getFullYear() - nascimento.getFullYear();
        if ( new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()) < 
             new Date(hoje.getFullYear(), nascimento.getMonth(), nascimento.getDate()) )
            diferencaAnos--;
        return `${diferencaAnos} anos`;
    }


let candidato = {}
candidato['codigo'] = param.codigo
candidato['nome'] = param.nome
candidato['cpf'] = formataCPF(param.cpf)
candidato['curriculo'] = param.curriculo
candidato['dtNascimento'] = `${new Date(param.dtNascimento).toLocaleDateString()} - ${idade(new Date(param.dtNascimento), new Date())} `
candidato['email'] = param.email
candidato['sexo'] = param.sexo
candidato['telefone'] = `(${param.telefone.ddd}) ${param.telefone.numero}`
candidato['endereco'] = `${param.endereco.logradouro.toUpperCase()}, ${param.endereco.numeroLogradouro}, ${param.endereco.cidade.toUpperCase()}, ${param.endereco.siglaEstado.toUpperCase()} - ${param.endereco.cep}`
candidato['disc'] = param.disc.dominante == 0 ? "Não preencheu" : `D: (${param.disc.dominante}) I:(${param.disc.influente}) S: (${param.disc.estavel}) C: (${param.disc.condescendente})`
candidato['score'] = param.score

return candidato

}