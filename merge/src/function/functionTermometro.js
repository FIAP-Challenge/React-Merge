export const termometro = (requisitos, requisitoDisc = {}, curriculo, boolean) => {
    let curriculoArray = [];
    let requisitosArray = [];

    requisitos.forEach((r) => {
        requisitosArray.push(r.nome.toUpperCase())
    })

    
    curriculo.curriculo.cursos.forEach((c) => {
        curriculoArray.push(c.nome.toUpperCase())


    })

    curriculo.curriculo.formacoes.forEach((f) => {
        curriculoArray.push(f.nome.toUpperCase())

    })


    curriculo.curriculo.idiomas.forEach((c) => {
        curriculoArray.push(c.nome.toUpperCase())


    })


    if (boolean) {
        let discArray = [];
        let requisitosDiscArray = [];
        discArray.push(curriculo.disc['dominante'])
        discArray.push(curriculo.disc['estavel'])
        discArray.push(curriculo.disc['influente'])
        discArray.push(curriculo.disc['condescendente'])
        requisitosDiscArray.push(requisitoDisc['dominante'])
        requisitosDiscArray.push(requisitoDisc['estavel'])
        requisitosDiscArray.push(requisitoDisc['influente'])
        requisitosDiscArray.push(requisitoDisc['condescendente'])


        let countComtempla = 0;

        requisitosArray.forEach((reqs) => {
            if (curriculoArray.includes(reqs)) {
                countComtempla += 1;
            }
        })
        let countDisc = 0;
        requisitosArray.forEach((reqs, i) => {
            if (discArray[i] >= reqs) {
                countDisc += 1;
            }
        })
        let totalComtemplasCurriculo = countDisc + countComtempla
        let totalRequisitos = requisitoDisc.legth + requisitosArray.length

        const perc = Math.round((totalComtemplasCurriculo / totalRequisitos) * 100);
        return perc;
    }
    let countComtempla = 0;
    requisitosArray.forEach((reqs) => {
        if (curriculoArray.includes(reqs)) {
            countComtempla += 1;
        }
    })
    const perc = (Math.round((countComtempla / requisitosArray.length) * 100));     
    return perc;
}
