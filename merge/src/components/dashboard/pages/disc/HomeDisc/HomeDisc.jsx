import React, { useState } from "react";
import './homeDisc.css'
import { Stepper, Step } from 'react-form-stepper';
import Disc from "../Disc";
import imgErrado from "./../../../../../Assets/printExemploErrado.png"
import imgCorreto from "./../../../../../Assets/printExemploCerto.png"

const HomeDisc = () => {
    const [goSteps, setGoSteps] = useState(0);
    return (
        <>
            <div className="stepper fade-in-image fade-out-image">

                <Stepper
                    styleConfig={{ activeBgColor: '#14429b', borderRadius: 7, inactiveBgColor: '#2d3138', completedBgColor: '#092b70' }}
                    activeStep={goSteps}
                    connectorStyleConfig={{ activeColor: '#5b91ff', completedColor: '#5b91ff' }}
                    connectorStateColors={true}>
                    <Step onClick={() => setGoSteps(0)} label="Metodologia Disc" />
                    <Step onClick={() => setGoSteps(1)} label="Instruções" />
                    <Step onClick={() => setGoSteps(2)} label="Questíonario" />
                </Stepper>
            </div>

            <div className="containerHomeDiscMaster">
                {goSteps === 0 && (
                    <div className="containerHomeDisc">
                        <div className="headerTitle">
                            <h1>Métolodolgia disc</h1>
                        </div>
                        <div className="body">
                            <div>


                            <div>
                            </div>

                                <div className='stepper fade-in-image fade-out-image '>
                                    
                                    <div className="informativo">
                                        <p>
                                            Muito conhecida e utilizada por profissionais que trabalham com gestão de pessoas e desenvolvimento humano, a Metodologia DISC tem como base a identificação de traços comportamentais predominantes em cada indivíduo. A lógica é que, se sabemos as principais tendências de comportamento de uma pessoa, temos mais embasamento para tomar decisões e fazer análises.
                                        </p>
                                    </div>
                                    <div className="informativo" >
                                        <h2 className="informativo">O surgimento da Metodologia DISC</h2>

                                        <p className="informativo">
                                            Na década de 1920, William Marston, PhD em Psicologia pela Universidade de Harvard, elaborou a teoria DISC para explicar as reações emocionais dos seres humanos. Em seu livro “As emoções das pessoas normais”, ele descreve quatro tipos comportamentais principais, os quais originaram a expressão DISC:
                                        </p>

                                        <ul className="informativo">
                                            <li><b> Dominance (dominância): remete ao controle, poder e assertividade</b></li>
                                            <li><b>Influence (influência): relacionada à comunicação e às relações sociais</b></li>
                                            <li><b>Steadiness (estabilidade): diz respeito à paciência e persistência</b></li>
                                            <li><b>Conscientiousness (cautela): relativa à organização e à estrutura</b></li>
                                        </ul>

                                        <p className="informativo">Apesar de Marston ter sido o primeiro a sistematizar a metodologia e falar de comportamento, a inspiração para a divisão em quatro perfis tem como precursores Hipócrates e Galeno, que moldaram as expressões colérico, sanguíneo, fleumático e melancólico em seus estudos de medicina.</p>

                                        <div>
                                            <img className="imgDisc" src="https://blog.solides.com.br/wp-content/uploads/2015/09/d.png" alt="" />
                                        </div>

                                        <div>
                                            <p className="informativo">
                                                Queremos te ajudar usando essa ferramenta incrivel e por isso te disponibilizamos com todo carinho do mundo!
                                            </p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='containerButton'>
                                <button onClick={() => setGoSteps(1)} className='buttonNext' type="submit">Avançar</button>

                            </div>
                        </div>
                    </div>

                )}
                {goSteps === 1 && (
                    <div className="containerHomeDisc">
                        <div className="headerTitle">
                            <h1>Instruções para a realização do questionário</h1>
                        </div>
                        <div className="body">
                            <div>
                                <div className='stepper fade-in-image fade-out-image '>

                                    <div className="informativo" >

                                        <h3 className="informativo">
                                            1. Analise as opções e enumere as mesmas de 1 a 4. A opção com a qual você MAIS se identifica, insira o NÚMERO 4 na respectiva caixinha, e aquela com a qual você MENOS tem afinidade, assinale com um NÚMERO 1.
                                        </h3>

                                        <p className="informativo"><b>NÃO PENSE MUITO PARA RESPONDER</b>, o primeiro pensamento que vem à mente é o mais instintivo, livre de filtros ou direcionamentos.</p>

                                        <p className="informativo">Por exemplo:</p>


                                        <p className="informativo">Para o disc funcionar não pode haver valores repetidos:</p>
                                        <div className="align">
                                            <img className="imgErrado" src={imgErrado} alt="" />
                                        </div>

                                        <p className="informativo">A maneira correta é não ter numeros repetidos igual na imagem abaixo:</p>
                                        <div className="align">
                                            <img className="imgErrado" src={imgCorreto} alt="" />
                                        </div>

                                        <p className="informativo">Dessa forma vamos conseguir uma precisão maior em seu preenchimento</p>


                                        <h3 className="informativo">2. Quando terminar de enumerar as opções por seu grau de identifiação, passe para a aba Gráfico, para ver seu fator(es) dominante (s).
                                            Quantos para a letra A, para a letra B, para a C e para a D.
                                        </h3>
                                        <h3 className="informativo">3. Uma vez  terminado o questionário, você saberá que estilo de comportamento é o seu estilo principal. Lembre-se que não podem ocorrer empates. Um mesmo número não pode ser usado duas vezes na mesma questão.
                                            Se obtiver valores iguais para qualquer uma das letras, você deverá refazer o questionário, assinalando um valor diferente a cada uma das opções nas respostas.
                                            .
                                        </h3>

                                        <h3>Eai está preparado?</h3>
                                    </div>
                                </div>
                            </div>
                            <div className='containerButton'>
                                <button onClick={() => setGoSteps(2)} className='buttonNext' type="submit">Avançar</button>
                            </div>
                        </div>
                    </div>
                )}

                {goSteps === 2 && (
                    <Disc />
                )}



            </div>

        </>

    )
}

export default HomeDisc;