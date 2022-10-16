export function checkDisc(DiscData, DiscResp) {

    let dominante = 0;
    let influente = 0;
    let estavel = 0;
    let condescendente = 0;
    
    for (let i = 0; i < DiscData.length; i++) {
        if (DiscData[i].a.index === 1) {
            dominante += parseInt(DiscResp.perguntas[1].respostaA);
        } else if (DiscData[i].b.index === 1) {
            dominante += parseInt(DiscResp.perguntas[i].respostaB);
        } else if (DiscData[i].c.index === 1) {
            dominante += parseInt(DiscResp.perguntas[i].respostaC);
        } else {
            dominante += parseInt(DiscResp.perguntas[i].respostaD);
        }

        if (DiscData[i].a.index === 2) {
            influente += parseInt(DiscResp.perguntas[i].respostaA);

        } else if (DiscData[i].b.index === 2) {
            influente += parseInt(DiscResp.perguntas[i].respostaB);

        } else if (DiscData[i].c.index === 2) {
            influente += parseInt(DiscResp.perguntas[i].respostaC);
        } else {
            influente += parseInt(DiscResp.perguntas[i].respostaD);
        }

        if (DiscData[i].a.index === 3) {
            estavel += parseInt(DiscResp.perguntas[i].respostaA);
        } else if (DiscData[i].b.index === 3) {
            estavel += parseInt(DiscResp.perguntas[i].respostaB);
        } else if (DiscData[i].c.index === 3) {
            estavel += parseInt(DiscResp.perguntas[i].respostaC);
        } else {
            estavel += parseInt(DiscResp.perguntas[i].respostaD);
        }

        if (DiscData[i].a.index === 4) {
            condescendente += parseInt(DiscResp.perguntas[i].respostaA);
        } else if (DiscData[i].b.index === 4) {
            condescendente += parseInt(DiscResp.perguntas[i].respostaB);
        } else if (DiscData[i].c.index === 4) {
            condescendente += parseInt(DiscResp.perguntas[i].respostaC);
        } else {
            condescendente += parseInt(DiscResp.perguntas[i].respostaD);
        }
    }
    let sum = dominante + influente + estavel + condescendente;
    dominante = Math.round(dominante * 100 / sum);
    influente = Math.round(influente * 100 / sum);
    estavel = Math.round(estavel * 100 / sum);
    condescendente = 100 - (dominante + influente + estavel);
   
    return [dominante, influente, estavel, condescendente];
};