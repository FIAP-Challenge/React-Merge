export function FunctionDisc(DiscData, DiscResp) {

    let dominante = 0;
    let influente = 0;
    let estavel = 0;
    let condescendente = 0;

    for (let i = 0; i < DiscData.length; i++) {

        if (DiscData[i].a.index === 1) {
            dominante += parseInt(DiscResp[i].respostaA);
        } else if (DiscData[i].b.index === 1) {
            dominante += parseInt(DiscResp[i].respostaB);
        } else if (DiscData[i].c.index === 1) {
            dominante += parseInt(DiscResp[i].respostaC);
        } else {
            dominante += parseInt(DiscResp[i].respostaD);
        }

        if (DiscData[i].a.index === 2) {
            influente += parseInt(DiscResp[i].respostaA);

        } else if (DiscData[i].b.index === 2) {
            influente += parseInt(DiscResp[i].respostaB);

        } else if (DiscData[i].c.index === 2) {
            influente += parseInt(DiscResp[i].respostaC);
        } else {
            influente += parseInt(DiscResp[i].respostaD);
        }

        if (DiscData[i].a.index === 3) {
            estavel += parseInt(DiscResp[i].respostaA);
        } else if (DiscData[i].b.index === 3) {
            estavel += parseInt(DiscResp[i].respostaB);
        } else if (DiscData[i].c.index === 3) {
            estavel += parseInt(DiscResp[i].respostaC);
        } else {
            estavel += parseInt(DiscResp[i].respostaD);
        }

        if (DiscData[i].a.index === 4) {
            condescendente += parseInt(DiscResp[i].respostaA);
        } else if (DiscData[i].b.index === 4) {
            condescendente += parseInt(DiscResp[i].respostaB);
        } else if (DiscData[i].c.index === 4) {
            condescendente += parseInt(DiscResp[i].respostaC);
        } else {
            condescendente += parseInt(DiscResp[i].respostaD);
        }

    }

    return [dominante, influente, estavel, condescendente];
};