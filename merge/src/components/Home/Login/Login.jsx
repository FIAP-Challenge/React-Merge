import React from "react";
import logoMerge from "./../../../Assets/icon merge.svg"
import "./loginStyle.css"
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import ErroLogin from "../../Dialogs/erroLogin/ErroLogin";
import * as AiIcons from "react-icons/ai"
import { useState } from "react";




const validationSchema = yup.object({

    email: yup
        .string()
        .required("O e-mail é obrigatório"),
    senha: yup
        .string()
        .required("A senha é obrigatoria")

});

const Login = () => {
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



    return (
        <>
            <div className="containerLoginMaster fade-in-image">
                <div className="containerLogin">
                    <div className="Logo-div">
                        <Link to="/"><img className="logoMerge" src={logoMerge} alt="Logotipo Merge" /></Link>
                    </div>
                    <Formik
                        initialValues={{ email: "", senha: "" }}
                        onSubmit={async (values) => {
                            await new Promise((r) => setTimeout(r, 500));
                            if (values) {

                                if (values.email === 'teste@fiap.com.br' && values.senha === "12345678") {

                                    navigate('/dashboard/noticias');

                                }
                                else {
                                    setMostraErro(true)



                                }


                                // navigate("/dashboard/noticias")
                            }

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
                                        <label className='labelRegistrar' htmlFor="senha">Senha *</label>
                                        <Field id="senha" className="inputRegistrar" type="password" name="senha" placeholder="Senha" />
                                        <ErrorMessage className='errosInputs' component="div" name="senha" />
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

        </>
    )

}

export default Login;