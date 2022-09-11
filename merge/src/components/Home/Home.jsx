import React, { useState, useEffect } from "react"
import Menu from "./Menu/Menu"
import Footer from "./Footer/Footer"
import './homeStyle.css'
import svgImg from './../../Assets/Good team-pana 1.svg'
import svgIBM from './../../Assets/IBM-Logo 1.svg'
import svgFIAP from './../../Assets/fiap 1.svg'
import imgsBoxHover0 from './../../Assets/Online report-bro.svg'
import imgsBoxHover1 from './../../Assets/Audit-amico.svg'
import imgsBoxHover2 from './../../Assets/Hand coding-amico.svg'
import imgsBoxHover3 from './../../Assets/Binary code-amico.svg'




const Home = () => {

    const [imagem, setImagem] = useState(imgsBoxHover0)


    useEffect(() => {

    })


    function changeImg(imgChanger) {
        document.querySelector('#slider').src = imgChanger;


    }



    return (
        <>

            <div className="containerHome fade-in-image">

                <div className="mergeContent">
                    <h1>Conte com a Merge para conseguir seu emprego dos sonhos!</h1>
                    <p>Usando a teconologia a nosso favor, vamos conseguir achar a tão sonhada vaga que você deseja, conte com a gente!</p>
                </div>

                <div >
                    <img className="imgContentMerge fade-in-image" src={svgImg} alt="MERGE LOGO" />
                </div>

            </div>

            <div className="containerPartners">
                <div>
                    <h1>Parceiros</h1>

                </div>
                <div className="containerLogo">
                    <img className="logoIBM" src={svgIBM} alt="Logo da ibm" />
                    <img className="logoFIAP" src={svgFIAP} alt="Logo da FIAP" />
                </div>

            </div>

            <div className="container-box">
                <div className="box-hover-cotent fade-in-image">
                    <img id="slider" className="img-backgroud-hover fade-in-image" src={imagem} alt="" />


                </div>

                <div>
                    <h1 className="fade-in-image">Facilidade e praticidade no jeito de usar e de pensar</h1>
                    <div className="sub-text-box fade-in-image">
                        <p >Com a interação da inteligencia artificial, vamos conseguir vagas melhores para você, alem da facilidade de você ter a usabilidade do nosso sistema</p>
                    </div>

                    <div className="coluna-hover fade-in-image">
                        <div id="hover1" className="box-hover fade-in-image" onMouseEnter={() => changeImg(imgsBoxHover1)} >
                            <div>
                                <h6>Práticidade</h6>
                            </div>
                            <div>
                                <p>Nosso objetivo é deixar o sistema de fácil entendimento e sem muita dificuldades de utilizar.</p>
                            </div>

                        </div>
                        <div id="hover2" className="box-hover fade-in-image" onMouseEnter={() => changeImg(imgsBoxHover2)} >
                            <div>
                                <h6>Autonomia</h6>
                            </div>
                            <div>
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim assumenda et quod ea? </p>
                            </div>

                        </div>
                        <div id="hover3" className="box-hover fade-in-image"  onMouseEnter={() => changeImg(imgsBoxHover3)}>
                            <div>
                                <h6>Ganho de tempo</h6>
                            </div>
                            <div>
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim assumenda et quod ea?</p>
                            </div>

                        </div>





                    </div>
                </div>


            </div>

           

        </>
    )
}

export default Home;