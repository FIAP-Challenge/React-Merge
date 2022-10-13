
import { Stepper, Step } from 'react-form-stepper';
import './registrarStyles.css'
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import InputMask from 'react-input-mask';
import api from '../../../Services/api/api';
import { BiTrash, } from 'react-icons/bi'
import ButtonInfos from '../../Templates/buttonInfos/ButtonInfos';
import Disc from '../../dashboard/pages/disc/Disc';

const Registrar = () => {
    const navigate = useNavigate();
    const [dadosform1, setdadosform1] = useState({});
    const [dadosform2, setdadosform2] = useState({});
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
            .required("O E-mail é obrigatório"),
        nomeCompleto: yup
            .string()
            .required("O nome é obrigatório")
            .matches(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,
                "Digite corretamente seu nome"
            ),
        celular: yup
            .string()
            .required("Celular é obrigatorio"),
        numCPF: yup
            .string()
            .min(14, "Deve haver 11 digitos")
            .max(14, "Deve conter apenas 11 digitos")
            .required("CPF é obrigatório"),
        dtNascimento: yup
            .date()
            .min(new Date('01/01/1940'), 'A data não permitida')
            .max(new Date(), "A data não pode ser maior que hoje")
            .required("Data de nascimento é obrigatório"),
        estCivil: yup
            .string()
            .required("Selecione um estado civil"),
        sexo: yup
            .string()
            .required("Selecione um sexo"),
        senha: yup
            .string()
            .required("Senha é obrigatória")
            .min(8, "Senha deve ter 8 digitos")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "A senha deve conter mais de 8 digitos, pelo menos uma letra maiscula e minuscula, um numero e um caractere especial"
            ),
        confirmeSenha: yup
            .string()
            .required("Obrigatorio confirmação da senha")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "A senha deve conter mais de 8 digitos, pelo menos uma letra maiscula e minuscula, um numero e um caractere especial"
            ).oneOf([yup.ref('senha'), null], 'Senha diferente da de cima'),
        cep: yup
            .string()
            .required("obrigatório informar o CEP"),
        logradouro: yup
            .string()
            .required("obrigatório informar o logradouro"),
        numero: yup
            .string()
            .required("Obrigatorio informar o numero do logradouro"),
        bairro: yup
            .string()
            .required("obrigatório informar o bairro"),
        complemento: yup
            .string(),
        cidade: yup
            .string()
            .required("obrigatório informar a cidade"),

        estado: yup
            .string()
            .required("obrigatório informar o estado"),
        uf: yup
            .string()
            .required("obrigatório informar o UF")
    });


    const validationSchema2 = yup.object({
        idiomas: yup.array().of(
            yup.object().shape({
                idioma: yup
                    .string()
                    .required("O idioma é obrigatório"),
                nivel: yup
                    .string()
                    .required("Nivel é obrigatório, selecione um")
            })
        ),
        formacoes: yup.array().of(
            yup.object().shape({
                nomeFormacao: yup
                    .string()
                    .required("Nome da formação é obrigatório"),
                tipo: yup
                    .string()
                    .required("O tipo da formação é obrigatório"),
                nomeInstituição: yup
                    .string()
                    .required("O nome da instituição é obrigatório"),
                dtInicio: yup
                    .date()
                    .required("A data de inicio é obrigatório"),
                dtFim: yup
                    .date()
                    .required("A data de conclusão é obrigatório")
            })
        ),
        habilidades: yup.array().of(
            yup.object().shape({
                nomeHabilidade: yup
                    .string()
                    .required("O nome da habilidade é obrigatório"),
            })
        ),
        cursos: yup.array().of(
            yup.object().shape({
                nomeCurso: yup
                    .string()
                    .required("O nome do curso é obrigatório"),
                nomeInstituiçãoCurso: yup
                    .string()
                    .required("O nome da instituição é obrigatório"),
                numeroCertificado: yup
                    .string()
                    .required("O numero do certificado é obrigatório"),
                descricaoCurso: yup
                    .string()
                    .required("A descrição do curso é obrigatório"),
                cargaHoraria: yup
                    .string()
                    .required("A carga horária do curso é obrigatória"),
                dtInicioCurso: yup
                    .date()
                    .required("A data de inicio é obrigatório"),
                dtFimCurso: yup
                    .date()
                    .required("A data de conclusão é obrigatório")
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
                                initialValues={{ email: dadosform1.email ? dadosform1.email : "", nomeCompleto: dadosform1.nomeCompleto ? dadosform1.nomeCompleto : "", celular: dadosform1.celular ? dadosform1.celular : "", numCPF: dadosform1.numCPF ? dadosform1.numCPF : "", dtNascimento: dadosform1.dtNascimento ? dadosform1.dtNascimento : "", estCivil: dadosform1.estCivil ? dadosform1.estCivil : "", sexo: dadosform1.sexo ? dadosform1.sexo : "", senha: dadosform1.senha ? dadosform1.senha : "", confirmeSenha: dadosform1.confirmeSenha ? dadosform1.confirmeSenha : "", cep: dadosform1.cep ? dadosform1.cep : "", logradouro: dadosform1.logradouro ? dadosform1.logradouro : "", numero: dadosform1.numero ? dadosform1.numero : "", bairro: dadosform1.bairro ? dadosform1.bairro : "", complemento: dadosform1.complemento ? dadosform1.complemento : "", cidade: dadosform1.cidade ? dadosform1.cidade : "", estado: dadosform1.estado ? dadosform1.estado : "", uf: dadosform1.uf ? dadosform1.uf : "" }}
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
                                                <label className='labelRegistrar' htmlFor="nomeCompleto">Nome completo *</label>
                                                <Field
                                                    value={values.nomeCompleto.toUpperCase()}
                                                    id="nomeCompleto" className="inputRegistrar" type="text" name="nomeCompleto" placeholder="Nome completo" />
                                                <ErrorMessage className='errosInputs' component="div" name="nomeCompleto" />
                                            </div>

                                            <div className='formsInputs'>
                                                <label className='labelRegistrar' htmlFor="celular">Celular *</label>
                                                <Field id="celular" type="number" name="celular" className="inputRegistrar"
                                                    render={({ field }) => (
                                                        <InputMask className="inputRegistrar"
                                                            {...field}
                                                            mask="(99) 99999-9999"
                                                            placeholder='Celular'
                                                            id="celular"
                                                            name="celular"

                                                        />
                                                    )}
                                                />
                                                <ErrorMessage className='errosInputs' component="div" name="celular" />
                                            </div>

                                            <div className='formsInputs'>
                                                <label className='labelRegistrar' htmlFor="numCPF">Numero CPF *</label>
                                                <Field id="numCPF" className="inputRegistrar" type="number" name="numCPF" placeholder="Numero CPF"
                                                    render={({ field }) => (
                                                        <InputMask className="inputRegistrar"
                                                            {...field}
                                                            mask="999.999.999-99"
                                                            id="numCPF"
                                                            placeholder="CPF"
                                                            name="numCPF"

                                                        />
                                                    )} />
                                                <ErrorMessage className='errosInputs' component="div" name="numCPF" />
                                            </div>

                                            <div className='formsInputs'>
                                                <label className='labelRegistrar' htmlFor="dtNascimento">Data de nascimento *</label>
                                                <Field id="dtNascimento" min={minDate} max={maxDate} className="inputRegistrar" type="date" name="dtNascimento" placeholder="Data de nascimento" />
                                                <ErrorMessage className='errosInputs' component="div" name="dtNascimento" />
                                            </div>

                                            <div className='formsInputs'>
                                                <label className='labelRegistrar' htmlFor="estCivil">Estado civil *</label>
                                                <Field id="estCivil" className="inputRegistrar" as="select" name="estCivil">
                                                    <option value="" disabled defaultValue>Selecione</option>
                                                    <option value="Solteiro">Solteiro(a)</option>
                                                    <option value="Casado">Casado(a)</option>
                                                    <option value="Divorciado">Divorciado(a)</option>
                                                    <option value="Viuvo">Viúvo(a)</option>
                                                </Field>

                                                <ErrorMessage className='errosInputs' component="div" name="estCivil" />
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
                                                        onClick={() => {
                                                            const infosLogradouros = buscarCEPTESTE(values.cep)

                                                            if (infosLogradouros.erro) {
                                                                values.logradouro = ""
                                                                values.bairro = ""
                                                                values.cidade = ""
                                                                values.uf = ""

                                                            } else {
                                                                values.logradouro = infosLogradouros.logradouro
                                                                values.bairro = infosLogradouros.bairro
                                                                values.cidade = infosLogradouros.localidade
                                                                values.uf = infosLogradouros.uf
                                                            }

                                                            console.log(typeof (infosLogradouros))
                                                            console.log(infosLogradouros)
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
                                                    <Field value={values.numero.toUpperCase()} id="numero" className="inputRegistrar" type="text" name="numero" placeholder="Número" />
                                                    <ErrorMessage className='errosInputs' component="div" name="numero" />
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
                                                    <label className='labelRegistrar margin-number' htmlFor="uf">UF *</label>
                                                    <Field value={values.uf.toUpperCase()} id="uf" className="inputRegistrar" type="text" name="uf" placeholder="UF" />
                                                    <ErrorMessage className='errosInputs' component="div" name="uf" />
                                                </div>
                                            </div>


                                            <div className='containerButton'>
                                                <button className='buttonNext' type="submit">Avançar</button>

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
                                            idioma: '',
                                            nivel: '',
                                        },
                                    ],
                                    formacoes: [
                                        {
                                            nomeFormacao: '',
                                            tipo: '',
                                            nomeInstituição: '',
                                            dtInicio: '',
                                            dtFim: ''
                                        },
                                    ],
                                    habilidades: [
                                        {
                                            nomeHabilidade: '',
                                        },
                                    ],
                                    cursos: [
                                        {
                                            nomeCurso: '',
                                            nomeInstituiçãoCurso: '',
                                            numeroCertificado: '',
                                            descricaoCurso: '',
                                            cargaHoraria: '',
                                            dtInicioCurso: '',
                                            dtFimCurso: ''

                                        },
                                    ]
                                }}
                                onSubmit={async (values) => {
                                    await new Promise((r) => setTimeout(r, 500));

                                    if (values) {
                                        setdadosform2(values)
                                        navigate('/dashboard/disc');

                        

                                    }
                                    // alert(JSON.stringify(values, null, 2));
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
                                                                        <ButtonInfos mensagem="O Idioma pode ser preenchido mais tarde, basta excluir" />
                                                                    </div>
                                                                    <div className='formsInputs '>
                                                                        <label className='labelRegistrar' htmlFor="idioma">Idioma *</label>
                                                                        <Field id="idioma" className="inputRegistrar" type="text" name={`idiomas.${index}.idioma`} placeholder="Idioma" />
                                                                        <ErrorMessage className='errosInputs' component="div" name={`idiomas.${index}.idioma`} />
                                                                    </div>
                                                                    <div className="col">
                                                                        <div className='formsInputs '>
                                                                            <label className='labelRegistrar' htmlFor="nivel">Nível *</label>
                                                                            <Field id="nivel" className="inputRegistrar" as="select" name={`idiomas.${index}.nivel`}>
                                                                                <option value="" disabled defaultValue>Selecione</option>
                                                                                <option value="Básico">Básico</option>
                                                                                <option value="Intermediário">Intermediário</option>
                                                                                <option value="Avançado">Avançado</option>
                                                                                <option value="Fluente">Fluente</option>
                                                                            </Field>

                                                                            <ErrorMessage className='errosInputs' component="div" name={`idiomas.${index}.nivel`} />
                                                                        </div>
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
                                                            onClick={() => push({ idioma: '', nivel: '' })}
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
                                                                        <label className='labelRegistrar' htmlFor="nomeFormacao">Nome da formação *</label>
                                                                        <Field id="nomeFormacao" className="inputRegistrar" type="text" name={`formacoes.${index}.nomeFormacao`} placeholder="Nome da formação" />
                                                                        <ErrorMessage className='errosInputs' component="div" name={`formacoes.${index}.nomeFormacao`} />
                                                                    </div>
                                                                    <div className="col">
                                                                        <div className='formsInputs '>
                                                                            <label className='labelRegistrar' htmlFor="tipo">Tipo formação *</label>
                                                                            <Field id="tipo" className="inputRegistrar" as="select" name={`formacoes.${index}.tipo`}>
                                                                                <option value="" disabled defaultValue>Selecione</option>
                                                                                <option value="Ensino fundamental">Ensino fundamental</option>
                                                                                <option value="Ensino médio">Ensino médio</option>
                                                                                <option value="Bacharelado">Bacharelado</option>
                                                                                <option value="Licenciatura">Licenciatura</option>
                                                                                <option value="Tecnólogo">Tecnólogo</option>
                                                                                <option value="Especialização">Especialização</option>
                                                                                <option value="MBA">MBA</option>
                                                                                <option value="Mestrado">Mestrado</option>
                                                                                <option value="Doutorado">Doutorado</option>
                                                                                <option value="Pós-doutorado">Pós-doutorado</option>
                                                                            </Field>
                                                                            <ErrorMessage className='errosInputs' component="div" name={`formacoes.${index}.tipo`} />

                                                                        </div>
                                                                    </div>

                                                                    <div className='formsInputs '>
                                                                        <label className='labelRegistrar' htmlFor="nomeInstituição">Nome da instituição *</label>
                                                                        <Field id="nomeInstituição" className="inputRegistrar" type="text" name={`formacoes.${index}.nomeInstituição`} placeholder="Nome da instituição" />
                                                                        <ErrorMessage className='errosInputs' component="div" name={`formacoes.${index}.nomeInstituição`} />
                                                                    </div>

                                                                    <div className='formsInputs'>
                                                                        <label className='labelRegistrar' htmlFor="dtInicio">Data inicio *</label>
                                                                        <Field id="dtInicio" min={minDate} className="inputRegistrar" type="date" name={`formacoes.${index}.dtInicio`} placeholder="Data inicio *" />
                                                                        <ErrorMessage className='errosInputs' component="div" name={`formacoes.${index}.dtInicio`} />
                                                                    </div>

                                                                    <div className='formsInputs'>
                                                                        <label className='labelRegistrar' htmlFor="dtFim">Data conclusão *</label>
                                                                        <Field id="dtFim" min={minDate} className="inputRegistrar" type="date" name={`formacoes.${index}.dtFim`} placeholder="Data inicio *" />
                                                                        <ErrorMessage className='errosInputs' component="div" name={`formacoes.${index}.dtFim`} />
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
                                                                nomeFormacao: '',
                                                                tipo: '',
                                                                nomeInstituição: '',
                                                                dtInicio: '',
                                                                dtFim: ''
                                                            })}
                                                        >
                                                            Adicionar
                                                        </button>
                                                    </div>
                                                )}
                                            </FieldArray>

                                            <hr className='style-two' />

                                            <div className='titulos-curriculo'>
                                                <h2>Habilidades</h2>
                                            </div>

                                            <FieldArray name="habilidades">
                                                {({ insert, remove, push }) => (
                                                    <div>
                                                        {values.habilidades.length > 0 &&
                                                            values.habilidades.map((habilidades, index) => (
                                                                <div className="containerInputs fade-in-image" key={index}>
                                                                    <div className='info'>
                                                                        <ButtonInfos mensagem="As habilidades podem ser preechidas mais tarde, basta excluir-la" />
                                                                    </div>
                                                                    <div className='formsInputs '>
                                                                        <label className='labelRegistrar' htmlFor="nomeHabilidade">Nome da habilidade *</label>
                                                                        <Field id="nomeHabilidade" className="inputRegistrar" type="text" name={`habilidades.${index}.nomeHabilidade`} placeholder="Nome da habilidade" />
                                                                        <ErrorMessage className='errosInputs' component="div" name={`habilidades.${index}.nomeHabilidade`} />
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
                                                            onClick={() => push({ nomeHabilidade: '' })}
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
                                                                        <label className='labelRegistrar' htmlFor="nomeCurso">Nome do curso *</label>
                                                                        <Field id="nomeCurso" className="inputRegistrar" type="text" name={`cursos.${index}.nomeCurso`} placeholder="Nome do curso" />
                                                                        <ErrorMessage className='errosInputs' component="div" name={`cursos.${index}.nomeCurso`} />
                                                                    </div>

                                                                    <div className='formsInputs '>
                                                                        <label className='labelRegistrar' htmlFor="nomeInstituiçãoCurso">Nome da instituiçao *</label>
                                                                        <Field id="nomeInstituiçãoCurso" className="inputRegistrar" type="text" name={`cursos.${index}.nomeInstituiçãoCurso`} placeholder="Nome da instituiçao" />
                                                                        <ErrorMessage className='errosInputs' component="div" name={`cursos.${index}.nomeInstituiçãoCurso`} />
                                                                    </div>

                                                                    <div className='formsInputs '>
                                                                        <label className='labelRegistrar' htmlFor="numeroCertificado">Número do certificado *</label>
                                                                        <Field id="numeroCertificado" className="inputRegistrar" type="text" name={`cursos.${index}.numeroCertificado`} placeholder="Número do certificado" />
                                                                        <ErrorMessage className='errosInputs' component="div" name={`cursos.${index}.numeroCertificado`} />
                                                                    </div>

                                                                    <div className='formsInputs '>
                                                                        <label className='labelRegistrar' htmlFor="descricaoCurso">Descreva sobre o curso *</label>
                                                                        <Field id="descricaoCurso" className="inputRegistrar" type="text" name={`cursos.${index}.descricaoCurso`} placeholder="Descreva sobre o curso" />
                                                                        <ErrorMessage className='errosInputs' component="div" name={`cursos.${index}.descricaoCurso`} />
                                                                    </div>

                                                                    <div className='formsInputs '>
                                                                        <label className='labelRegistrar' htmlFor="cargaHoraria">Carga horaria *</label>
                                                                        <Field id="cargaHoraria" className="inputRegistrar" type="text" name={`cursos.${index}.cargaHoraria`} placeholder="Carga horaria" />
                                                                        <ErrorMessage className='errosInputs' component="div" name={`cursos.${index}.cargaHoraria`} />
                                                                    </div>

                                                                    <div className='formsInputs'>
                                                                        <label className='labelRegistrar' htmlFor="dtInicio">Data inicio *</label>
                                                                        <Field id="dtInicio" min={minDate} className="inputRegistrar" type="date" name={`cursos.${index}.dtInicioCurso`} placeholder="Data inicio *" />
                                                                        <ErrorMessage className='errosInputs' component="div" name={`cursos.${index}.dtInicioCurso`} />
                                                                    </div>

                                                                    <div className='formsInputs'>
                                                                        <label className='labelRegistrar' htmlFor="dtFim">Data conclusão *</label>
                                                                        <Field id="dtFim" min={minDate} className="inputRegistrar" type="date" name={`cursos.${index}.dtFimCurso`} placeholder="Data inicio *" />
                                                                        <ErrorMessage className='errosInputs' component="div" name={`cursos.${index}.dtFimCurso`} />
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
                                                                nomeCurso: '',
                                                                nomeInstituiçãoCurso: '',
                                                                numeroCerticado: '',
                                                                descricaoCurso: '',
                                                                cargaHoraria: '',
                                                                dtInicioCurso: '',
                                                                dtFimCurso: ''
                                                            })}
                                                        >
                                                            Adicionar
                                                        </button>
                                                    </div>
                                                )}
                                            </FieldArray>



                                            <div className='containerButton'>
                                                <button className='buttonNext' type="submit">Registrar-se</button>
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