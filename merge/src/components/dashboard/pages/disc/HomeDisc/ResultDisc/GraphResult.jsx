import React from "react";
import { __DATA__ } from "./data";
import {
    MainContainer,
    Container,
    BarChartContainer,
    Number,
    BlackLine,
    MakeBar,
    Span
} from "./styles";



const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function GraphResult(props) {

    const objeto = [
        {
            disc: props.disc.dominante,
            colors: ["#ff4242", "#ff4242"],
            legenda: "Dominante"
        },
        {
            disc: props.disc.influente,
            colors: ["#00C49F", "#1da890"],
            legenda: "Influente"
        },
        {
            disc: props.disc.estavel,
            colors: ["#0088FE", "#0088FE"],
            legenda: "Estabilidade"
        },
        {
            disc: props.disc.condescendente,
            colors: ["#FFBB28", "#FFBB28"],
            legenda: "Cautela"
        }
    ];

    return (
        <Container>
            <MainContainer>
                {objeto.map(({ disc, colors, legenda }, i) => {
                    return (
                        <>
                            <BarChartContainer key={i}>

                                <Number color={colors[1]}>{disc}%</Number>
                                <Span color={colors[1]} className="span-legenda">{legenda}</Span>
                                <MakeBar height={disc * 1.5} colors={colors} />

                            </BarChartContainer>

                        </>
                    );
                })}
            </MainContainer>
            <BlackLine />

        </Container>
    );
}
