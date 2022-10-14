import React from "react";
import logoMerge from "./../../../Assets/icon merge.svg"
import "./loginStyle.css"
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import ErroLogin from "../../Dialogs/erroLogin/ErroLogin";
import * as AiIcons from "react-icons/ai"
import { useState, useContext } from "react";
import { AuthContext } from "../../../AuthContext";
import axios from 'axios';
import Menu from './../Menu/Menu'
import Footer from './../Footer/Footer'




const validationSchema = yup.object({

    email: yup
        .string()
        .required("O e-mail é obrigatório"),
    senhaLogin: yup
        .string()
        .required("A senha é obrigatoria")

});

const Login = () => {
    const { setAuth, auth, candidato, setCandidato } = useContext(AuthContext)


    const navigate = useNavigate();
    const [mostraErro, setMostraErro] = useState(false);
    const [erro, setErro] = useState(
        <div className="containerErro">
            <div>
                <h2>Falha no login</h2>
            </div>
            <hr className='style-two-modal' />
            <p>Falha na autenticação
                OBS: na fase de teste para autenticar:  <br />
                <b>E-mail: </b>  teste@fiap.com.br <br />
                <b>senha: </b>12345678

            </p>
        </div>)


    async function handleLogin(objeto) {
        try {
            let res = await axios({
                method: 'post',
                url: 'http://localhost:8080/Merge/rest/candidato',
                data: objeto
            });
            let data = res.data;
            alert("Sucesso!")
            setCandidato({})
            setCandidato(res.data)
            setAuth(true)
            navigate("/dashboard/vagas")

            return data;
        } catch (error) {
            setMostraErro(true)
            // alert("Falha na auth")
            console.log(error.response); // this is the main part. Use the response property from the error object
            return error.response;
        }

    }


    return (
        <>  
            <Menu/>
            <div className="containerLoginMaster fade-in-image">
                <div className="containerLogin">
                    <div className="Logo-div">
                        <Link to="/"><img className="logoMerge" src={logoMerge} alt="Logotipo Merge" /></Link>
                    </div>
                    <Formik
                        initialValues={{ email: "", senhaLogin: "" }}
                        onSubmit={async (values) => {
                            await new Promise((r) => setTimeout(r, 500));
                            handleLogin(values)


                            // if (values) {
                            //     if (values.email === 'teste@fiap.com.br' && values.senha === "12345678") {
                            //         navigate('/dashboard/vagas');
                            //     }
                            //     else {
                            //         setMostraErro(true)

                            //     }


                            //     // navigate("/dashboard/noticias")
                            // }

                            // alert(JSON.stringify(values, null, 2));
                        }}
                        validationSchema={validationSchema}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting
                        }) => (
                            <div>
                                <Form>
                                    <div className='formsInputsLogin'>
                                        <label className='labelRegistrar' htmlFor="email">E-mail *</label>
                                        <Field id="email" className="inputRegistrar" type="email" name="email" placeholder="E-mail" />
                                        <ErrorMessage className='errosInputs' component="div" name="email" />
                                    </div>
                                    <div className='formsInputsLogin'>
                                        <label className='labelRegistrar' htmlFor="senhaLogin">Senha *</label>
                                        <Field id="senhaLogin" className="inputRegistrar" type="password" name="senhaLogin" placeholder="Senha" />
                                        <ErrorMessage className='errosInputs' component="div" name="senhaLogin" />
                                    </div>
                                    <div className="forgotContainer">

                                        <Link className="forgot-password" to="/esqueciSenha">Esqueci a senha</Link>

                                    </div>

                                    {mostraErro ? erro : ""}




                                    <div className='buttonLoginContainer'>
                                        <button className='btn-login' type="submit">Login</button>
                                    </div>
                                    {/* <div className="buttonLoginContainer">
                                        <Link className="link-btn-login" to="/dashboard/noticias">
                                            <div className="btn-login">
                                                <span className="span-btn-login">Login</span>
                                            </div>
                                        </Link>
                                    </div> */}



                                </Form>
                            </div>
                        )}
                    </Formik>


                    <div className="containerRegistrarPass">
                        <div>
                            <p>Primeira vez aqui?</p>
                        </div>

                        <div >
                            <Link className="registrar-se" to="/registrar">Registrar-se</Link>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer/>
        </>
    )

}

export default Login;