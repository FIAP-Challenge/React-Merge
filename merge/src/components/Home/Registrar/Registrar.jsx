
import { Stepper, Step } from 'react-form-stepper';
import './registrarStyles.css'
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as yup from "yup";
import { useNavigate, Link, json } from "react-router-dom";
import InputMask from 'react-input-mask';
import api from '../../../Services/api/api';
import { BiTrash, } from 'react-icons/bi'
import ButtonInfos from '../../Templates/buttonInfos/ButtonInfos';
import axios from 'axios';
import SucessRegister from './ModalRegister/SucessRegister';


const Registrar = () => {
    const navigate = useNavigate();
    const [dadosform1, setdadosform1] = useState({});
    const [modalSucess, setModaSucess] = useState(false);
    const [unificado, setUnificados] = useState({})
    const [cep, setCep] = useState();
    const [goSteps, setGoSteps] = useState(0);
    function buscarCEP(cep) {
        cep = cep.toString();
        api
            .get(`/${cep}/json`)
            .then((response) => setCep(response.data))
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }




    const handleSubmitRegister = (valordados1, valordados2) => {

        let objeto = {}
        objeto['nome'] = valordados1.nome
        objeto['cpf'] = valordados1.cpf.replace(/[\[\].!'@,><|://\\;&* ()_+=-]/g, "")
        objeto['dtNascimento'] = new Date(valordados1.dataNascimento).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
        objeto['estadoCivil'] = valordados1.estadoCivil
        objeto['sexo'] = valordados1.sexo
        objeto['email'] = valordados1.email
        objeto['senhaLogin'] = valordados1.senhaLogin
        objeto['telefone'] = {
            'ddd': valordados1.celular.replace(/[\[\].!'@,><|://\\;&* ()_+=-]/g, "").substring(0, 3),
            'numero': valordados1.celular.replace(/[\[\].!'@,><|://\\;&* ()_+=-]/g, "").substring(3, valordados1.celular.length - 1),
            'tipo': "Pessoal"
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

        objeto['curriculo'] = {
            data: new Date().toLocaleDateString('pt-BR', { timeZone: 'UTC' }),
            cursos: valordados2.cursos,
            formacoes: valordados2.formacoes,
            idiomas: valordados2.idiomas
        }
      

        axios.post(`http://localhost:8080/Merge/rest/candidato`, objeto)
            .then(res => {
             

                if (res.request.status == 201) {
                    { }
                    setModaSucess(true)
                    setTimeout(() => {
                        navigate('/login');

                    }, 3000);
                }
            })

    }
    const buscarCEPTESTE = (value) => {
        value = value.replace("-", "");
        buscarCEP(value)
        return cep;

    }


    const minDate = new Date('01/01/1940').toISOString().slice(0, -14);
    const maxDate = new Date().toISOString().slice(0, -14);





    const validationSchema = yup.object({
        email: yup
            .string()
            .required("O E-mail ?? Obrigat??rio "),
        nome: yup
            .string()
            .required("O nome ?? Obrigat??rio ")
            .matches(/^[A-Za-z?????????????????????????????????????????????????????????????? ]+$/,
                "Digite corretamente seu nome"
            ),
        celular: yup
            .string()
            .required("Celular ?? obrigatorio"),
        cpf: yup
            .string()
            .min(14, "Deve haver 11 digitos")
            .max(14, "Deve conter apenas 11 digitos")
            .required("CPF ?? Obrigat??rio "),
        dataNascimento: yup
            .date()
            .min(new Date('01/01/1940'), 'A data n??o permitida')
            .max(new Date(), "A data n??o pode ser maior que hoje")
            .required("Data de nascimento ?? Obrigat??rio "),
        estadoCivil: yup
            .string()
            .required("Selecione um estado civil"),
        sexo: yup
            .string()
            .required("Selecione um sexo"),
        senhaLogin: yup
            .string()
            .required("Senha ?? obrigat??ria")
            .min(8, "Senha deve ter 8 digitos")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "A senha deve conter mais de 8 digitos, pelo menos uma letra maiscula e minuscula, um numero e um caractere especial"
            ),
        confirmeSenha: yup
            .string()
            .required("Obrigatorio confirma????o da senha")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "A senha deve conter mais de 8 digitos, pelo menos uma letra maiscula e minuscula, um numero e um caractere especial"
            ).oneOf([yup.ref('senhaLogin'), null], 'Senha diferente da de cima'),
        cep: yup
            .string()
            .required("Obrigat??rio  informar o CEP"),
        logradouro: yup
            .string()
            .required("Obrigat??rio  informar o logradouro"),
        numeroLogradouro: yup
            .string()
            .required("Obrigatorio informar o numero do logradouro")
            .max(9, 'N??mero acima do permitido'),
        bairro: yup
            .string()
            .required("Obrigat??rio  informar o bairro"),
        complemento: yup
            .string(),
        cidade: yup
            .string()
            .required("Obrigat??rio  informar a cidade"),

        estado: yup
            .string()
            .required("Obrigat??rio  informar o estado"),
        siglaEstado: yup
            .string()
            .required("Obrigat??rio  informar o UF")
    });


    const validationSchema2 = yup.object({
        idiomas: yup.array().of(
            yup.object().shape({
                nome: yup
                    .string()
                    .required("O idioma ?? Obrigat??rio "),
            })
        ),
        formacoes: yup.array().of(
            yup.object().shape({
                nome: yup
                    .string()
                    .required("Nome da forma????o ?? Obrigat??rio "),
            })
        ),
        cursos: yup.array().of(
            yup.object().shape({
                nome: yup
                    .string()
                    .required("O nome do curso ?? Obrigat??rio "),
            })
        )
    })

    return (
        <>
            <div>
                <div className='stepper fade-in-image fade-out-image '>

                    <Stepper
                        styleConfig={{ activeBgColor: '#14429b', borderRadius: 7, inactiveBgColor: '#2d3138', completedBgColor: '#092b70' }}
                        activeStep={goSteps}
                        connectorStyleConfig={{ activeColor: '#5b91ff', completedColor: '#5b91ff' }}
                        connectorStateColors={true}>
                        <Step onClick={() => setGoSteps(0)} label="Dados do candidato" />
                        <Step onClick={() => setGoSteps(1)} label="Curriculo" />
                    </Stepper>
                </div>
                {goSteps === 0 && (
                    <div className='containerRegistrarMaster'>
                        <div className='containerRegistrar'>
                            <Formik
                                initialValues={{ email: dadosform1.email ? dadosform1.email : "", nome: dadosform1.nome ? dadosform1.nome : "", celular: dadosform1.celular ? dadosform1.celular : "", cpf: dadosform1.cpf ? dadosform1.cpf : "", dataNascimento: dadosform1.dataNascimento ? dadosform1.dataNascimento : "", estadoCivil: dadosform1.estadoCivil ? dadosform1.estadoCivil : "", sexo: dadosform1.sexo ? dadosform1.sexo : "", senhaLogin: dadosform1.senhaLogin ? dadosform1.senhaLogin : "", confirmeSenha: dadosform1.confirmeSenha ? dadosform1.confirmeSenha : "", cep: dadosform1.cep ? dadosform1.cep : "", logradouro: dadosform1.logradouro ? dadosform1.logradouro : "", numeroLogradouro: dadosform1.numeroLogradouro ? dadosform1.numeroLogradouro : "", bairro: dadosform1.bairro ? dadosform1.bairro : "", complemento: dadosform1.complemento ? dadosform1.complemento : "", cidade: dadosform1.cidade ? dadosform1.cidade : "", estado: dadosform1.estado ? dadosform1.estado : "", siglaEstado: dadosform1.siglaEstado ? dadosform1.siglaEstado : "" }}
                                onSubmit={async (values) => {
                                    await new Promise((r) => setTimeout(r, 500));
                                    if (values) {
                                        setGoSteps(1)
                                        setdadosform1(values)
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
                                            <div className='formsInputs'>
                                                <label className='labelRegistrar' htmlFor="email">E-mail *</label>
                                                <Field id="email" className="inputRegistrar" type="email" name="email" placeholder="E-mail" />
                                                <ErrorMessage className='errosInputs' component="div" name="email" />
                                            </div>

                                            <div className='formsInputs'>
                                                <label className='labelRegistrar' htmlFor="nome">Nome completo *</label>
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
                                                <label className='labelRegistrar' htmlFor="cpf">Numero CPF *</label>
                                                <Field id="cpf" className="inputRegistrar" type="number" name="cpf" placeholder="Numero CPF"
                                                    render={({ field }) => (
                                                        <InputMask className="inputRegistrar"
                                                            {...field}
                                                            mask="999.999.999-99"
                                                            id="cpf"
                                                            placeholder="CPF"
                                                            name="cpf"

                                                        />
                                                    )} />
                                                <ErrorMessage className='errosInputs' component="div" name="cpf" />
                                            </div>

                                            <div className='formsInputs'>
                                                <label className='labelRegistrar' htmlFor="dataNascimento">Data de nascimento *</label>
                                                <Field id="dataNascimento" min={minDate} max={maxDate} className="inputRegistrar" type="date" name="dataNascimento" placeholder="Data de nascimento" />
                                                <ErrorMessage className='errosInputs' component="div" name="dataNascimento" />
                                            </div>

                                            <div className='formsInputs'>
                                                <label className='labelRegistrar' htmlFor="estadoCivil">Estado civil *</label>
                                                <Field id="estadoCivil" className="inputRegistrar" as="select" name="estadoCivil">
                                                    <option value="" disabled defaultValue>Selecione</option>
                                                    <option value="Solteiro">Solteiro(a)</option>
                                                    <option value="Casado">Casado(a)</option>
                                                    <option value="Divorciado">Divorciado(a)</option>
                                                    <option value="Viuvo">Vi??vo(a)</option>
                                                </Field>

                                                <ErrorMessage className='errosInputs' component="div" name="estadoCivil" />
                                            </div>

                                            <div className='formsInputs'>
                                                <label className='labelRegistrar' htmlFor="sexo">Sexo *</label>
                                                <Field id="sexo" className="inputRegistrar" as="select" name="sexo">
                                                    <option value="" disabled defaultValue>Selecione</option>
                                                    <option value="Masculino">Masculino</option>
                                                    <option value="Feminino">Feminino</option>
                                                    <option value="Outros">Outros</option>
                                                </Field>
                                                <ErrorMessage className='errosInputs' component="div" name="sexo" />
                                            </div>

                                            <div className='formsInputs'>
                                                <label className='labelRegistrar' htmlFor="sesenhaLoginnha">Senha *</label>
                                                <Field id="senhaLogin" className="inputRegistrar" type="password" name="senhaLogin" placeholder="Senha" />
                                                <ErrorMessage className='errosInputs' component="div" name="senhaLogin" />
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
                                                    <Field value={values.numeroLogradouro.toUpperCase()} id="numero" className="inputRegistrar" type="text" name="numeroLogradouro" placeholder="N??mero" />
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
                                                <button className='buttonNext' type="submit">Avan??ar</button>

                                            </div>




                                        </Form>
                                    </div>
                                )}
                            </Formik>




                        </div>

                    </div>

                )}
                {goSteps === 1 && (
                    <div className='containerRegistrarMaster fade-in-image fade-out-image '>
                        <div className='containerRegistrar fade-out-image '>
                            <Formik
                                initialValues={{

                                    idiomas: [
                                        {
                                            nome: '',
                                        },
                                    ],
                                    formacoes: [
                                        {
                                            nome: '',

                                        },
                                    ],
                                    cursos: [
                                        {
                                            nome: '',
                                        },
                                    ]
                                }}
                                onSubmit={async (values) => {
                                    await new Promise((r) => setTimeout(r, 500));
                                    if (values) {


                                    }
                                    // alert(JSON.stringify(values, null, 2));
                                    handleSubmitRegister(dadosform1, values)

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
                                                <h2>Forma????es</h2>
                                            </div>

                                            <FieldArray name="formacoes">
                                                {({ insert, remove, push }) => (
                                                    <div>
                                                        {values.formacoes.length > 0 &&
                                                            values.formacoes.map((formacoes, index) => (
                                                                <div className="containerInputs fade-in-image" key={index}>
                                                                    <div className='info'>
                                                                        <ButtonInfos mensagem="As forma????es pode ser preenchido mais tarde, basta excluir" />
                                                                    </div>
                                                                    <div className='formsInputs '>
                                                                        <label className='labelRegistrar' htmlFor={`formacoes.${index}.nome`}>Nome da forma????o *</label>
                                                                        <Field id={`formacoes.${index}.nome`} className="inputRegistrar" type="text" name={`formacoes.${index}.nome`} placeholder="Nome da forma????o" />
                                                                        <ErrorMessage className='errosInputs' component="div" name={`formacoes.${index}.nome`} />
                                                                    </div>
                                                                    {/* <div className="col">
                                                                        <div className='formsInputs '>
                                                                            <label className='labelRegistrar' htmlFor="tipo">Tipo forma????o *</label>
                                                                            <Field id="tipo" className="inputRegistrar" as="select" name={`formacoes.${index}.tipo`}>
                                                                                <option value="" disabled defaultValue>Selecione</option>
                                                                                <option value="Ensino fundamental">Ensino fundamental</option>
                                                                                <option value="Ensino m??dio">Ensino m??dio</option>
                                                                                <option value="Bacharelado">Bacharelado</option>
                                                                                <option value="Licenciatura">Licenciatura</option>
                                                                                <option value="Tecn??logo">Tecn??logo</option>
                                                                                <option value="Especializa????o">Especializa????o</option>
                                                                                <option value="MBA">MBA</option>
                                                                                <option value="Mestrado">Mestrado</option>
                                                                                <option value="Doutorado">Doutorado</option>
                                                                                <option value="P??s-doutorado">P??s-doutorado</option>
                                                                            </Field>
                                                                            <ErrorMessage className='errosInputs' component="div" name={`formacoes.${index}.tipo`} />

                                                                        </div>
                                                                    </div> */}

                                                                    {/* <div className='formsInputs '>
                                                                        <label className='labelRegistrar' htmlFor="nomeInstitui????o">Nome da institui????o *</label>
                                                                        <Field id="nomeInstitui????o" className="inputRegistrar" type="text" name={`formacoes.${index}.nomeInstitui????o`} placeholder="Nome da institui????o" />
                                                                        <ErrorMessage className='errosInputs' component="div" name={`formacoes.${index}.nomeInstitui????o`} />
                                                                    </div> */}

                                                                    {/* <div className='formsInputs'>
                                                                        <label className='labelRegistrar' htmlFor="dtInicio">Data inicio *</label>
                                                                        <Field id="dtInicio" min={minDate} className="inputRegistrar" type="date" name={`formacoes.${index}.dtInicio`} placeholder="Data inicio *" />
                                                                        <ErrorMessage className='errosInputs' component="div" name={`formacoes.${index}.dtInicio`} />
                                                                    </div> */}

                                                                    {/* <div className='formsInputs'>
                                                                        <label className='labelRegistrar' htmlFor="dtFim">Data conclus??o *</label>
                                                                        <Field id="dtFim" min={minDate} className="inputRegistrar" type="date" name={`formacoes.${index}.dtFim`} placeholder="Data inicio *" />
                                                                        <ErrorMessage className='errosInputs' component="div" name={`formacoes.${index}.dtFim`} />
                                                                    </div> */}

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

                                                                    {/* <div className='formsInputs '>
                                                                        <label className='labelRegistrar' htmlFor="nomeInstitui????oCurso">Nome da institui??ao *</label>
                                                                        <Field id="nomeInstitui????oCurso" className="inputRegistrar" type="text" name={`cursos.${index}.nomeInstitui????oCurso`} placeholder="Nome da institui??ao" />
                                                                        <ErrorMessage className='errosInputs' component="div" name={`cursos.${index}.nomeInstitui????oCurso`} />
                                                                    </div> */}

                                                                    {/* <div className='formsInputs '>
                                                                        <label className='labelRegistrar' htmlFor="numeroCertificado">N??mero do certificado *</label>
                                                                        <Field id="numeroCertificado" className="inputRegistrar" type="text" name={`cursos.${index}.numeroCertificado`} placeholder="N??mero do certificado" />
                                                                        <ErrorMessage className='errosInputs' component="div" name={`cursos.${index}.numeroCertificado`} />
                                                                    </div> */}

                                                                    {/* <div className='formsInputs '>
                                                                        <label className='labelRegistrar' htmlFor="descricaoCurso">Descreva sobre o curso *</label>
                                                                        <Field id="descricaoCurso" className="inputRegistrar" type="text" name={`cursos.${index}.descricaoCurso`} placeholder="Descreva sobre o curso" />
                                                                        <ErrorMessage className='errosInputs' component="div" name={`cursos.${index}.descricaoCurso`} />
                                                                    </div> */}

                                                                    {/* <div className='formsInputs '>
                                                                        <label className='labelRegistrar' htmlFor="cargaHoraria">Carga horaria *</label>
                                                                        <Field id="cargaHoraria" className="inputRegistrar" type="text" name={`cursos.${index}.cargaHoraria`} placeholder="Carga horaria" />
                                                                        <ErrorMessage className='errosInputs' component="div" name={`cursos.${index}.cargaHoraria`} />
                                                                    </div> */}

                                                                    {/* <div className='formsInputs'>
                                                                        <label className='labelRegistrar' htmlFor="dtInicio">Data inicio *</label>
                                                                        <Field id="dtInicio" min={minDate} className="inputRegistrar" type="date" name={`cursos.${index}.dtInicioCurso`} placeholder="Data inicio *" />
                                                                        <ErrorMessage className='errosInputs' component="div" name={`cursos.${index}.dtInicioCurso`} />
                                                                    </div> */}

                                                                    {/* <div className='formsInputs'>
                                                                        <label className='labelRegistrar' htmlFor="dtFim">Data conclus??o *</label>
                                                                        <Field id="dtFim" min={minDate} className="inputRegistrar" type="date" name={`cursos.${index}.dtFimCurso`} placeholder="Data inicio *" />
                                                                        <ErrorMessage className='errosInputs' component="div" name={`cursos.${index}.dtFimCurso`} />
                                                                    </div> */}

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
                                                <button className='buttonNext'>Registrar-se</button>
                                            </div>
                                        </Form>
                                    </div>
                                )}
                            </Formik>
                        </div>

                    </div>
                )}

            </div>

        </>
    )
}


export default Registrar;