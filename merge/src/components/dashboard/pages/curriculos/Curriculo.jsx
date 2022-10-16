import './CurriculoStyle.css'
import './../stylesPages.css'
import { Stepper, Step } from 'react-form-stepper';
import React, { useEffect, useState, useContext } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import InputMask from 'react-input-mask';
import axios from 'axios';
import * as yup from "yup";
import ButtonInfos from '../../../Templates/buttonInfos/ButtonInfos';
import { BiTrash, } from 'react-icons/bi'
import { AuthContext } from '../../../../AuthContext';
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate, Link } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})


const Curriculo = () => {
    const navigate = useNavigate();
    const { setAuth, candidato, setCandidato } = useContext(AuthContext)
    const [open, setOpen] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [severity, setSeverity] = useState("");
    const [loading, setLoading] = useState(false);

    const handleUpdateCurriculo = async (curriculo) => {

        const request = {
            "cursos": curriculo.cursos,
            "idiomas": curriculo.idiomas,
            "formacoes": curriculo.formacoes

        }
    
        try {
            let res = await axios({
                method: 'put',
                url: `http://localhost:8080/Merge/rest/curriculo/${candidato.codigo}`,
                data: request
            });
            let data = res.data;
            setOpen(true)
            setSeverity("success")
            setMensagem("Atualizado com sucesso!")
            setInterval(() => {
                navigate("/dashboard/vagas")
            }, 2000);

            let candidatoStage = candidato;

            candidatoStage.curriculo = request;

            setCandidato(candidatoStage)
            return data;
        } catch (error) {
            setOpen(true)
            setSeverity("error")
            setMensagem("Falha na atualização, tente novamente")

            return error.response;
        }
    }



    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };



    const validationSchema2 = yup.object({
        idiomas: yup.array().of(
            yup.object().shape({
                nome: yup
                    .string()
                    .required("O idioma é Obrigatório "),
            })
        ),
        formacoes: yup.array().of(
            yup.object().shape({
                nome: yup
                    .string()
                    .required("Nome da formação é Obrigatório "),
            })
        ),
        cursos: yup.array().of(
            yup.object().shape({
                nome: yup
                    .string()
                    .required("O nome do curso é Obrigatório "),
            })
        )
    })

    return (
        <div className="containerPage">
        
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={4500} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                        {mensagem}
                    </Alert>
                </Snackbar>
            </Stack>
            <div className='stepper fade-in-image fade-out-image '>
            </div>
            <div className='containerRegistrarMaster fade-in-image fade-out-image '>
                <div className='containerRegistrar fade-out-image '>
                    <Formik
                        initialValues={{

                            idiomas: candidato.curriculo.idiomas,
                            formacoes: candidato.curriculo.formacoes,
                            cursos: candidato.curriculo.cursos
                        }}
                        onSubmit={async (values) => {
                            await new Promise((r) => setTimeout(r, 500));

                            handleUpdateCurriculo(values)


                        }}
                        validationSchema={validationSchema2}
                    >

                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,

                            isSubmitting,
                        }) => (
                            <div className='fade-in-image fade-out-image '>
                                <Form>
                                    <div className='titulos-curriculo'>
                                        <h2>Idiomas</h2>
                                    </div>
                                    <FieldArray name="idiomas">
                                        {({ insert, remove, push }) => (
                                            <div>
                                                {values.idiomas.length > 0 &&
                                                    values.idiomas.map((idiomas, index) => (
                                                        <div className="containerInputs fade-in-image" key={index}>
                                                            <div className='info'>
                                                                <ButtonInfos mensagem="Os cursos podem ser preenchidos mais tarde, basta excluir-la" />
                                                            </div>
                                                            <div className='formsInputs '>
                                                                <label className='labelRegistrar' htmlFor={`idiomas.${index}.nome`} >Nome do idioma *</label>
                                                                <Field id={`idiomas.${index}.nome`} className="inputRegistrar" type="text" name={`idiomas.${index}.nome`} placeholder="Nome do idioma" />
                                                                <ErrorMessage className='errosInputs' component="div" name={`idiomas.${index}.nome`} />
                                                            </div>

                                                            <div className="displayButton">
                                                                <button
                                                                    type="button"
                                                                    className='button-remove'
                                                                    onClick={() => remove(index)}
                                                                >
                                                                    <BiTrash className='iconTrash' />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                <button
                                                    type="button"
                                                    className='button-add'
                                                    onClick={() => push({
                                                        nome: '',
                                                    })}
                                                >
                                                    Adicionar
                                                </button>
                                            </div>
                                        )}
                                    </FieldArray>

                                    <hr className='style-two' />

                                    <div className='titulos-curriculo'>
                                        <h2>Formações</h2>
                                    </div>

                                    <FieldArray name="formacoes">
                                        {({ insert, remove, push }) => (
                                            <div>
                                                {values.formacoes.length > 0 &&
                                                    values.formacoes.map((formacoes, index) => (
                                                        <div className="containerInputs fade-in-image" key={index}>
                                                            <div className='info'>
                                                                <ButtonInfos mensagem="As formações pode ser preenchido mais tarde, basta excluir" />
                                                            </div>
                                                            <div className='formsInputs '>
                                                                <label className='labelRegistrar' htmlFor={`formacoes.${index}.nome`}>Nome da formação *</label>
                                                                <Field id={`formacoes.${index}.nome`} className="inputRegistrar" type="text" name={`formacoes.${index}.nome`} placeholder="Nome da formação" />
                                                                <ErrorMessage className='errosInputs' component="div" name={`formacoes.${index}.nome`} />
                                                            </div>

                                                            <div className="displayButton">
                                                                <button
                                                                    type="button"
                                                                    className='button-remove'
                                                                    onClick={() => remove(index)}
                                                                >
                                                                    <BiTrash className='iconTrash' />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                <button
                                                    type="button"
                                                    className='button-add'
                                                    onClick={() => push({
                                                        nome: '',
                                                    })}
                                                >
                                                    Adicionar
                                                </button>
                                            </div>
                                        )}
                                    </FieldArray>
                                    <hr className='style-two' />

                                    <div className='titulos-curriculo'>
                                        <h2>Cursos</h2>
                                    </div>
                                    <FieldArray name="cursos">
                                        {({ insert, remove, push }) => (
                                            <div>
                                                {values.cursos.length > 0 &&
                                                    values.cursos.map((cursos, index) => (
                                                        <div className="containerInputs fade-in-image" key={index}>
                                                            <div className='info'>
                                                                <ButtonInfos mensagem="Os cursos podem ser preenchidos mais tarde, basta excluir-la" />
                                                            </div>
                                                            <div className='formsInputs '>
                                                                <label className='labelRegistrar' htmlFor={`cursos.${index}.nome`} >Nome do curso *</label>
                                                                <Field id={`cursos.${index}.nome`} className="inputRegistrar" type="text" name={`cursos.${index}.nome`} placeholder="Nome do curso" />
                                                                <ErrorMessage className='errosInputs' component="div" name={`cursos.${index}.nome`} />
                                                            </div>

                                                            <div className="displayButton">
                                                                <button
                                                                    type="button"
                                                                    className='button-remove'
                                                                    onClick={() => remove(index)}
                                                                >
                                                                    <BiTrash className='iconTrash' />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                <button
                                                    type="button"
                                                    className='button-add'
                                                    onClick={() => push({
                                                        nome: '',
                                                    })}
                                                >
                                                    Adicionar
                                                </button>
                                            </div>
                                        )}
                                    </FieldArray>



                                    <div className='containerButton'>
                                        <button className='buttonNext'>Atualizar</button>
                                    </div>
                                </Form>
                            </div>
                        )}
                    </Formik>
                </div>
            </div>
            <div className='footer-curriculo'>

            </div>
        </div>
    )
}


export default Curriculo;