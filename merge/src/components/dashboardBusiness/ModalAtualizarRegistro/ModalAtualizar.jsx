import Modal from 'react-modal';
import './ModaAtualizar.css'
import React, { useState, useContext } from 'react';
import * as AiIcons from "react-icons/ai"
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import InputMask from 'react-input-mask';
import { AuthContext } from "./../../../AuthContext";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Stepper, Step } from 'react-form-stepper';
import ButtonInfos from './../../Templates/buttonInfos/ButtonInfos';
import { BiTrash, } from 'react-icons/bi'
import api from '../../../Services/api/api';
import apiService from '../../../Services/api/apiService';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const ModalAtualizar = () => {
    const { empresa, setempresa } = useContext(AuthContext)
    const navigate = useNavigate();
    const [dadosform1, setdadosform1] = useState({});
    const [modalSucess, setModaSucess] = useState(false);
    const [unificado, setUnificados] = useState({})
    const [cep, setCep] = useState();
    const [goSteps, setGoSteps] = useState(0);
    const [open, setOpen] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [severity, setSeverity] = useState("");
    Modal.setAppElement('#root');
    function buscarCEP(cep) {
        cep = cep.toString();
        api
            .get(`/${cep}/json`)
            .then((response) => setCep(response.data))
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }

    const handleSubmitUpdate = async (valordados1) => {
        let objeto = {}
        objeto['codigo'] = empresa.codigo
        objeto['nome'] = valordados1.nome
        objeto['cnpj'] = valordados1.cnpj.replace(/[\[\].!'@,><|://\\;&* ()_+=-]/g, "")
        objeto['descricao'] = valordados1.descricao
        objeto['email'] = valordados1.email
        objeto['responsavel'] = valordados1.responsavel
        objeto['senha'] = valordados1.senha
        objeto['telefone'] = {
            'ddd': valordados1.celular.replace(/[\[\].!'@,><|://\\;&* ()_+=-]/g, "").substring(0, 3),
            'numero': valordados1.celular.replace(/[\[\].!'@,><|://\\;&* ()_+=-]/g, "").substring(3, 12),
            'tipo': "Comercial"
        }
        objeto['endereco'] = {
            'cep': valordados1.cep.replace(/[\[\].!'@,><|://\\;&* ()_+=-]/g, ""),
            'bairro': valordados1.bairro,
            'logradouro': valordados1.logradouro,
            'complemento': valordados1.complemento,
            'cidade': valordados1.cidade,
            'estado': valordados1.estado,
            'siglaEstado': valordados1.siglaEstado,
            'numeroLogradouro': valordados1.numeroLogradouro
        }
        objeto['tipoLogin'] = "E"
        try {
            let res = await apiService({
                method: 'put',
                url: `/empresa/${empresa.codigo}`,
                data: objeto
            });
            let data = res.data;
            setOpen(true)
            setSeverity("success")
            setMensagem("Atualizado com sucesso")

            localStorage.clear("__SESSION__")
            localStorage.setItem("__SESSION__", JSON.stringify(objeto))


            setInterval(() => {
                navigate("/business/candidaturas")
                window.location.reload();
            }, 2000);

            return data;
        } catch (error) {
            setOpen(true)
            setSeverity("error")
            setMensagem("Falha na atualização")
            return error.response;
        }

    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const buscarCEPTESTE = (value) => {
        value = value.replace("-", "");
        buscarCEP(value)
        return cep;

    }
    const minDate = new Date('01/01/1940').toISOString().slice(0, -14);
    const maxDate = new Date().toISOString().slice(0, -14);


    const [modalIsOpen, setIsOpen] = useState(true)

    const openModal = () => {

        setIsOpen(true);
    }
    const closeModal = () => {
        setIsOpen(false);

    }


    if (modalIsOpen) {
        var div = document.querySelector('html');
        div.style.overflow = 'hidden'
    } else {
        var div = document.querySelector('html');
        div.style.overflow = 'auto'
    }

    const validationSchema = yup.object({
        email: yup
            .string(),
        // .required("O E-mail é Obrigatório "),
        nome: yup
            .string()
            .required("O nome é Obrigatório ")
            .matches(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
                "Digite corretamente seu nome"
            ),

        descricao: yup
            .string(),
        celular: yup
            .string()
            .required("Celular é obrigatorio"),
        cpnj: yup
            .string(),
        // .min(14, "Deve haver 11 digitos")
        // .max(14, "Deve conter apenas 11 digitos")
        // .required("CPF é Obrigatório "),
        senha: yup
            .string()
            .required("Senha é obrigatória")
            .min(8, "Senha deve ter 8 digitos")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "A senha deve conter mais de 8 digitos, pelo menos uma letra maiscula e minuscula, um numero e um caractere especial"
            ),
        responsavel: yup
            .string()
            .required("Responsavel é obrigatória"),
        confirmeSenha: yup
            .string()
            .required("Obrigatorio confirmação da senha")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "A senha deve conter mais de 8 digitos, pelo menos uma letra maiscula e minuscula, um numero e um caractere especial"
            ).oneOf([yup.ref('senha'), null], 'Senha diferente da de cima'),
        cep: yup
            .string()
            .required("Obrigatório  informar o CEP"),
        logradouro: yup
            .string()
            .required("Obrigatório  informar o logradouro"),
        numeroLogradouro: yup
            .string()
            .required("Obrigatorio informar o numero do logradouro")
            .max(9, 'Número acima do permitido'),
        bairro: yup
            .string()
            .required("Obrigatório  informar o bairro"),
        complemento: yup
            .string(),
        cidade: yup
            .string()
            .required("Obrigatório  informar a cidade"),

        estado: yup
            .string()
            .required("Obrigatório  informar o estado"),
        siglaEstado: yup
            .string()
            .required("Obrigatório  informar o UF")
    });

    return (
        <div className='containerModal'>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={4500} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                        {mensagem}
                    </Alert>
                </Snackbar>
            </Stack>
            {/* <button onClick={openModal}>abir</button> */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example modal"
                overlayClassName="modal-overlay-atualizar"
                className="modal-content"
            >
                <div className='containerHeaderModal-atualizar'>
                    <div className='containerCloseModal-atualizar'>
                        <button className='closeModal' onClick={closeModal}><AiIcons.AiOutlineClose /></button>
                    </div>
                </div>
                <div>
                    <div className='stepper fade-in-image fade-out-image '>


                        <div>
                            <h1>Atualização de dados</h1>
                        </div>
                        <hr className='style-two-modal' />
                        {/* <Stepper
                            hidden
                            styleConfig={{ activeBgColor: '#14429b', borderRadius: 7, inactiveBgColor: '#2d3138', completedBgColor: '#092b70' }}
                            activeStep={goSteps}
                            connectorStyleConfig={{ activeColor: '#5b91ff', completedColor: '#5b91ff' }}
                            connectorStateColors={true}>
                            <Step onClick={() => setGoSteps(0)} label="Dados do empresa" />
                            <Step onClick={() => setGoSteps(1)} label="Curriculo" />
                        </Stepper> */}
                    </div>
                    {goSteps === 0 && (
                        <div className='containerRegistrarMaster'>

                            <Formik
                                initialValues={{ email: dadosform1.email ? dadosform1.email : empresa.email, nome: dadosform1.nome ? dadosform1.nome : empresa.nome, descricao: dadosform1.descricao ? dadosform1.descricao : empresa.descricao, celular: dadosform1.celular ? dadosform1.celular : empresa.telefone.ddd + empresa.telefone.numero, cnpj: dadosform1.cnpj ? dadosform1.cnpj : empresa.cnpj, senha: dadosform1.senha ? dadosform1.senha : empresa.senha, confirmeSenha: dadosform1.confirmeSenha ? dadosform1.confirmeSenha : empresa.senha, responsavel: dadosform1.responsavel ? dadosform1.responsavel : empresa.responsavel, cep: dadosform1.cep ? dadosform1.cep : empresa.endereco.cep, logradouro: dadosform1.logradouro ? dadosform1.logradouro : empresa.endereco.logradouro, numeroLogradouro: dadosform1.numeroLogradouro ? dadosform1.numeroLogradouro : empresa.endereco.numeroLogradouro, bairro: dadosform1.bairro ? dadosform1.bairro : empresa.endereco.bairro, complemento: dadosform1.complemento ? dadosform1.complemento : empresa.endereco.complemento, cidade: dadosform1.cidade ? dadosform1.cidade : empresa.endereco.cidade, estado: dadosform1.estado ? dadosform1.estado : empresa.endereco.estado, siglaEstado: dadosform1.siglaEstado ? dadosform1.siglaEstado : empresa.endereco.siglaEstado }}
                                onSubmit={async (values) => {
                                    await new Promise((r) => setTimeout(r, 500));

                                    handleSubmitUpdate(values)

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
                                            <div className='formsInputs'>
                                                <label className='labelRegistrar' htmlFor="email">E-mail *</label>
                                                <Field disabled id="email" className="inputRegistrar" type="email" name="email" placeholder="E-mail" />
                                                <ErrorMessage className='errosInputs' component="div" name="email" />
                                            </div>

                                            <div className='formsInputs'>
                                                <label className='labelRegistrar' htmlFor="nome">Nome empresa *</label>
                                                <Field
                                                    value={values.nome.toUpperCase()}
                                                    id="nome" className="inputRegistrar" type="text" name="nome" placeholder="Nome completo" />
                                                <ErrorMessage className='errosInputs' component="div" name="nome" />
                                            </div>

                                            <div className='formsInputs'>
                                                <label className='labelRegistrar' htmlFor="celular">Celular *</label>
                                                <Field id="celular" type="number" name="celular" className="inputRegistrar"
                                                    render={({ field }) => (
                                                        <InputMask className="inputRegistrar"
                                                            {...field}
                                                            mask="(099) 99999-9999"
                                                            placeholder='Celular'
                                                            id="celular"
                                                            name="celular"

                                                        />
                                                    )}
                                                />
                                                <ErrorMessage className='errosInputs' component="div" name="celular" />
                                            </div>

                                            <div className='formsInputs'>
                                                <label className='labelRegistrar' htmlFor="cnpj">Numero CNPJ *</label>
                                                <Field id="cnpj" className="inputRegistrar" type="number" name="cnpj" placeholder="Numero cnpj"
                                                    render={({ field }) => (
                                                        <InputMask className="inputRegistrar"
                                                            {...field}
                                                            disabled
                                                            mask="99.999.999/9999-99"
                                                            id="cnpj"
                                                            placeholder="cnpj"
                                                            name="cnpj"

                                                        />
                                                    )} />
                                                <ErrorMessage className='errosInputs' component="div" name="cpf" />
                                            </div>


                                            <div className='formsInputs'>
                                                <label className='labelRegistrar' htmlFor="responsavel">Responsável *</label>
                                                <Field id="responsavel" className="inputRegistrar" name="responsavel"></Field>

                                                <ErrorMessage className='errosInputs' component="div" name="estadoCivil" />
                                            </div>

                                            
                                            <div className='formsInputs'>
                                                <label className='labelRegistrar' htmlFor="descricao">Descrição *</label>
                                                <Field id="descricao" className="inputRegistrar" name="descricao"></Field>

                                                <ErrorMessage className='errosInputs' component="div" name="descricao" />
                                            </div>

                                            <div className='formsInputs'>
                                                <label className='labelRegistrar' htmlFor="senha">Senha *</label>
                                                <Field id="senha" className="inputRegistrar" type="password" name="senha" placeholder="Senha" />
                                                <ErrorMessage className='errosInputs' component="div" name="senha" />
                                            </div>

                                            <div className='formsInputs'>
                                                <label className='labelRegistrar' htmlFor="confirmeSenha">Confirme a senha *</label>
                                                <Field id="confirmeSenha" className="inputRegistrar" type="password" name="confirmeSenha" placeholder="Confirme a senha" />
                                                <ErrorMessage className='errosInputs' component="div" name="confirmeSenha" />
                                            </div>

                                            <div className='formsInputs'>
                                                <label className='labelRegistrar' htmlFor="cep">CEP *</label>
                                                <Field id="cep" className="inputRegistrar" type="number" name="cep" placeholder="CEP"
                                                    render={({ field }) => (
                                                        <InputMask className="inputRegistrar"

                                                            {...field}
                                                            mask="99999-999"
                                                            id="cep"
                                                            placeholder="CEP"
                                                            name="cep"

                                                        />
                                                    )} />
                                                <ErrorMessage className='errosInputs' component="div" name="cep" />
                                                <div className='divDisplayCEP'>
                                                    <button
                                                        type='button'
                                                        onClick={() => {
                                                            const infosLogradouros = buscarCEPTESTE(values.cep)

                                                            if (infosLogradouros.erro) {
                                                                values.logradouro = ""
                                                                values.bairro = ""
                                                                values.cidade = ""
                                                                values.siglaEstado = ""

                                                            } else {
                                                                values.logradouro = infosLogradouros.logradouro
                                                                values.bairro = infosLogradouros.bairro
                                                                values.cidade = infosLogradouros.localidade
                                                                values.siglaEstado = infosLogradouros.uf
                                                            }

                                                        }
                                                        }
                                                        className='buscarCEP'>Buscar CEP</button>

                                                </div>


                                            </div>
                                            <div className='endereco_line1'>
                                                <div className='formsInputs logradouro'>
                                                    <label className='labelRegistrar' htmlFor="logradouro">Logradouro *</label>
                                                    <Field value={values.logradouro.toUpperCase()} id="logradouro" className="inputRegistrar" type="text" name="logradouro" placeholder="Logradouro" />
                                                    <ErrorMessage className='errosInputs' component="div" name="logradouro" />
                                                </div>

                                                <div className='formsInputs numero-logradouro'>
                                                    <label className='labelRegistrar margin-number' htmlFor="numero">Numero *</label>
                                                    <Field value={values.numeroLogradouro.toUpperCase()} id="numero" className="inputRegistrar" type="text" name="numeroLogradouro" placeholder="Número" />
                                                    <ErrorMessage className='errosInputs' component="div" name="numeroLogradouro" />
                                                </div>
                                            </div>

                                            <div className='formsInputs'>
                                                <label className='labelRegistrar' htmlFor="bairro">Bairro *</label>
                                                <Field value={values.bairro.toUpperCase()} id="bairro" className="inputRegistrar" type="text" name="bairro" placeholder="Bairro" />
                                                <ErrorMessage className='errosInputs' component="div" name="bairro" />
                                            </div>


                                            <div className='endereco_line1'>

                                                <div className='formsInputs complemento'>
                                                    <label className='labelRegistrar' htmlFor="complemento">Complemento *</label>
                                                    <Field value={values.complemento.toUpperCase()} id="complemento" className="inputRegistrar" type="text" name="complemento" placeholder="Complemento" />
                                                    <ErrorMessage className='errosInputs' component="div" name="complemento" />
                                                </div>

                                                <div className='formsInputs cidade'>
                                                    <label className='labelRegistrar' htmlFor="logradouro">Cidade *</label>
                                                    <Field value={values.cidade.toUpperCase()} id="cidade" className="inputRegistrar" type="text" name="cidade" placeholder="Cidade" />
                                                    <ErrorMessage className='errosInputs' component="div" name="cidade" />
                                                </div>

                                            </div>
                                            <div className='endereco_line1'>

                                                <div className='formsInputs estado'>
                                                    <label className='labelRegistrar margin-number' htmlFor="estado">Estado *</label>
                                                    <Field value={values.estado.toUpperCase()} id="estado" className="inputRegistrar" type="text" name="estado" placeholder="Estado" />
                                                    <ErrorMessage className='errosInputs' component="div" name="estado" />
                                                </div>

                                                <div className='formsInputs uf'>
                                                    <label className='labelRegistrar margin-number' htmlFor="siglaEstado">UF *</label>
                                                    <Field value={values.siglaEstado.toUpperCase()} id="siglaEstado" className="inputRegistrar" type="text" name="siglaEstado" placeholder="UF" />
                                                    <ErrorMessage className='errosInputs' component="div" name="siglaEstado" />
                                                </div>
                                            </div>


                                            <div className='containerButton'>
                                                <button className='buttonUpdate' type="submit">Atualizar</button>

                                            </div>
                                        </Form>
                                    </div>
                                )}
                            </Formik>

                        </div>

                    )}
                </div>
            </Modal>
        </div>
    )
}
export default ModalAtualizar;