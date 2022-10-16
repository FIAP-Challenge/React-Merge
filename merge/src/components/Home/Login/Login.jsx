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
import Menu from '../Menu/Menu'
import Footer from '../Footer/Footer'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const verificarLocalStorageCandidato = JSON.parse(localStorage.getItem("__SESSION__"))


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
    const { setAuth, setCandidato } = useContext(AuthContext)
    const [open, setOpen] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [severity, setSeverity] = useState("");


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    // if (verificarLocalStorageCandidato) {
    //     setAuth(true)
    //     setCandidato(verificarLocalStorageCandidato)
    //     navigate("/")
    // }



    async function handleLogin(objeto) {
        try {
            let res = await axios({
                method: 'post',
                url: 'http://localhost:8080/Merge/rest/login',
                data: objeto
            });
            let data = res.data;
            // alert("Sucesso!")
            setCandidato({})
            if (res.data.tipoLogin) {
                setCandidato(res.data)

                setAuth(true)
                localStorage.setItem('__SESSION__', JSON.stringify(res.data));
                navigate("/dashboard/vagas")


            } else {
            }
            return data;
        } catch (error) {
            setOpen(true)
            setSeverity("error")
            setMensagem("Falha na autenticação, tente novamente!")

            return error.response;
        }

    }
    return (
        <>

            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={4500} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                        {mensagem}
                    </Alert>
                </Snackbar>
            </Stack>
            <Menu />
            <div className="containerLoginMaster fade-in-image">
                <div className="containerLogin">
                    <div className="Logo-div">
                        <Link to="/"><img className="logoMerge" src={logoMerge} alt="Logotipo Merge" /></Link>
                    </div>
                    <Formik
                        initialValues={{ email: "", senha: "" }}
                        onSubmit={async (values) => {
                            await new Promise((r) => setTimeout(r, 500));
                            handleLogin(values)

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

            <Footer />
        </>
    )

}

export default Login;