import React, { useState, useContext } from "react"
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as yup from "yup";
import { BiTrash, } from 'react-icons/bi'
import InputMask from 'react-input-mask';
import CurrencyInput from 'react-currency-masked-input'
import ButtonInfos from "../../../Templates/buttonInfos/ButtonInfos";
import { requisitosForm } from '../../../../json/JsonRequisitos';
import { beneficiosForm } from "../../../../json/beneficios";
import './cadastrarVagaStyles.css'
import AuthContext from './../../../../AuthContext'
import { useNavigate, Link } from "react-router-dom";
import apiService from "../../../../Services/api/apiService";

import './../stylesPages.css'


const CadastrarVagas = () => {
    const [dadosform1, setdadosform1] = useState({});
    const dados = JSON.parse(localStorage.getItem("__SESSION__"))


    const navigate = useNavigate();

    const minDate = new Date('01/01/1940').toISOString().slice(0, -14);
    const maxDate = new Date().toISOString().slice(0, -14);

    const concatenarString = (array) => {
        let string = "";
        array.forEach((e) => {
            string += e.nome + ","
        })

        return string.substring(0, string.length - 1)

    }




    async function handleCreateVaga(param) {
        let objeto = {}
        objeto['nome'] = param.nome
        objeto['codigoEmpresa'] = dados.codigo
        objeto['cargo'] = param.cargo
        objeto['descricaoCargo'] = param.descricaoCargo
        objeto['historiaEmpresa'] = 'mocado'
        objeto['descricaoVaga'] = param.descricaoVaga
        objeto['remuneracao'] = param.remuneracao
        objeto['modoTrabalho'] = param.modoTrabalho
        objeto['requisitos'] = param.requisitos
        objeto['cargaHoraria'] = param.cargaHoraria
        objeto['beneficios'] = concatenarString(param.beneficios)
        objeto['dataInscricao'] = new Date(param.dataInscricao).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
        objeto['dataFim'] = new Date(param.dataFim).toLocaleDateString('pt-BR', { timeZone: 'UTC' })

        try {
            let res = await apiService({
                method: 'post',
                url: `/vaga`,
                data: objeto
            });
            let data = res.data;
            navigate("/business/candidaturas")
            window.location.reload();


            return data;
        } catch (error) {



            return error.response;
        }
    }





    const validationSchema = yup.object({
        nome: yup
            .string()
            .required("Nome da vaga é obrigatório"),
        cargo: yup
            .string()
            .required("Cargo da vaga é obrigatório"),
        modoTrabalho: yup
            .string()
            .required("Modo trabalho é obrigatório"),
        remuneracao: yup
            .string()
            .required("Remuneração é obrigátorio"),
        dataInscricao: yup
            .date()
            .required("Informe uma data inicial para inscrições"),
        dataFim: yup
            .date()
            .required("Digite uma data para o fim das incrições"),
        descricaoVaga: yup
            .string()
            .required("Digite uma breve descrição sobre a vaga"),
        descricaoCargo: yup
            .string()
            .required("Digite uma breve descrição sobre o cargo"),
        cargaHoraria: yup
            .number()
            .required("Digite um valor para a carga horaria"),
        beneficios: yup.array().of(
            yup.object().shape({
                nome: yup
                    .string()
                    .required("O beneficio é Obrigatório "),
            })
        ),
        requisitos: yup.array().of(
            yup.object().shape({
                nome: yup
                    .string()
                    .required("O requisito é Obrigatório "),
            })
        ),
    });



    return (
        <div className='containerRegistrarMaster fade-in-image fade-out-image '>
            <div className='containerRegistrar separador fade-out-image '>

                <Formik
                    initialValues={{
                        nome: "",
                        cargo: "",
                        modoTrabalho: "",
                        remuneracao: "",
                        dataInscricao: "",
                        dataFim: "",
                        descricaoVaga: "",
                        descricaoCargo: "",
                        cargaHoraria: "",
                        beneficios: [
                            {
                                nome: ""
                            }
                        ],
                        requisitos: [
                            {
                                nome: ""
                            }
                        ]
                    }}
                    onSubmit={async (values) => {
                        await new Promise((r) => setTimeout(r, 500));

                        handleCreateVaga(values)
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
                                <div className='formsInputs-vagas'>
                                    <label className='labelRegistrar' htmlFor="nome">Nome da vaga *</label>
                                    <Field id="nome" className="inputRegistrar" name="nome" placeholder="Nome da vaga" />
                                    <ErrorMessage className='errosInputs' component="div" name="nome" />
                                </div>

                                <div className='formsInputs-vagas'>
                                    <label className='labelRegistrar' htmlFor="cargo">Nome do cargo *</label>
                                    <Field
                                        id="cargo" className="inputRegistrar" type="text" name="cargo" placeholder="Nome do cargo" />
                                    <ErrorMessage className='errosInputs' component="div" name="cargo" />
                                </div>

                                <div className='formsInputs-vagas'>
                                    <label className='labelRegistrar' htmlFor="modoTrabalho">Modelo de trabalho *</label>
                                    <Field id="modoTrabalho" className="inputRegistrar" as="select" name="modoTrabalho">
                                        <option value="" disabled defaultValue>Selecione</option>
                                        <option value="Híbrido">Híbrido</option>
                                        <option value="HomeOffice">HomeOffice</option>
                                        <option value="Presencial">Presencial</option>
                                    </Field>
                                    <ErrorMessage className='errosInputs' component="div" name="modoTrabalho" />
                                </div>

                                <div className='formsInputs-vagas'>
                                    <label className='labelRegistrar' htmlFor="remuneracao">Valor da remuneração *</label>
                                    <Field id="remuneracao" className="inputRegistrar" name="remuneracao" placeholder="Valor da remuneração"
                                        render={({ field }) => (
                                            <CurrencyInput className="inputRegistrar"
                                                {...field}
                                                id="remuneracao"
                                                placeholder="Valor da remuneração"
                                                name="remuneracao"

                                            />
                                        )} />
                                    <ErrorMessage className='errosInputs' component="div" name="remuneracao" />
                                </div>

                                <div className='formsInputs-vagas'>
                                    <label className='labelRegistrar' htmlFor="dataInscricao">Data inicial incrições *</label>
                                    <Field id="dataInscricao" min={minDate} className="inputRegistrar" type="date" name="dataInscricao" placeholder="Data inicial incrições" />
                                    <ErrorMessage className='errosInputs' component="div" name="dataInscricao" />
                                </div>

                                <div className='formsInputs-vagas'>
                                    <label className='labelRegistrar' htmlFor="dataFim">Data limite incrições *</label>
                                    <Field id="dataFim" min={minDate} className="inputRegistrar" type="date" name="dataFim" placeholder="Data limite incrições" />
                                    <ErrorMessage className='errosInputs' component="div" name="dataFim" />
                                </div>

                                <div className='formsInputs-vagas'>
                                    <label className='labelRegistrar' htmlFor="descricaoVaga">Descrição da vaga *</label>
                                    <Field id="descricaoVaga" className="inputRegistrar" name="descricaoVaga" placeholder="Descrição da vaga" />
                                    <ErrorMessage className='errosInputs' component="div" name="descricaoVaga" />
                                </div>

                                <div className='formsInputs-vagas'>
                                    <label className='labelRegistrar' htmlFor="descricaoCargo">Descrição do cargo *</label>
                                    <Field id="descricaoCargo" className="inputRegistrar" name="descricaoCargo" placeholder="Descrição do cargo" />
                                    <ErrorMessage className='errosInputs' component="div" name="descricaoCargo" />
                                </div>

                                <div className='formsInputs-vagas'>
                                    <label className='labelRegistrar' htmlFor="cargaHoraria">Carga horária *</label>
                                    <Field id="cargaHoraria" className="inputRegistrar" type="number" name="cargaHoraria" placeholder="Carga horária" />
                                    <ErrorMessage className='errosInputs' component="div" name="cargaHoraria" />
                                </div>



                                <FieldArray name="beneficios">
                                    {({ insert, remove, push }) => (
                                        <div>
                                            {values.beneficios.length > 0 &&
                                                values.beneficios.map((beneficios, index) => (
                                                    <div className="containerInputs fade-in-image" key={index}>
                                                        <div className='info'>
                                                            <ButtonInfos mensagem="É obrigátorio colocar beneficios" />
                                                        </div>
                                                        <div className='formsInputs '>
                                                            <label className='labelRegistrar' htmlFor={`beneficios.${index}.nome`} >Nome do beneficio *</label>
                                                            <Field id={`beneficios.${index}.nome`} className="inputRegistrar" as="select" name={`beneficios.${index}.nome`}>
                                                                <option value="" disabled defaultValue>Selecione</option>
                                                                {beneficiosForm.map((r) => <option value={r.label}>{r.label}</option>)}

                                                            </Field>
                                                            <ErrorMessage className='errosInputs' component="div" name={`beneficios.${index}.nome`} />
                                                        </div>

                                                        {index === 0 ? "" : (<div className="displayButton">
                                                            <button

                                                                type="button"
                                                                className='button-remove'
                                                                onClick={() => remove(index)}
                                                            >
                                                                <BiTrash className='iconTrash' />
                                                            </button>
                                                        </div>)}

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

                                <FieldArray name="requisitos">
                                    {({ insert, remove, push }) => (
                                        <div>
                                            {values.requisitos.length > 0 &&
                                                values.requisitos.map((requisitos, index) => (
                                                    <div className="containerInputs fade-in-image" key={index}>
                                                        <div className='info'>
                                                            <ButtonInfos mensagem="É obrigátorio colocar beneficios" />
                                                        </div>
                                                        <div className='formsInputs '>
                                                            <label className='labelRegistrar' htmlFor={`requisitos.${index}.nome`} >Nome dos requisitos *</label>
                                                            <Field id={`requisitos.${index}.nome`} className="inputRegistrar" as="select" name={`requisitos.${index}.nome`}>
                                                                <option value="" disabled defaultValue>Selecione</option>
                                                                {requisitosForm.map((r) => <option value={r.label}>{r.label}</option>)}

                                                            </Field>
                                                            <ErrorMessage className='errosInputs' component="div" name={`requisitos.${index}.nome`} />
                                                        </div>

                                                        {index === 0 ? "" : (<div className="displayButton">
                                                            <button

                                                                type="button"
                                                                className='button-remove'
                                                                onClick={() => remove(index)}
                                                            >
                                                                <BiTrash className='iconTrash' />
                                                            </button>
                                                        </div>)}

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
                                    <button className='buttonUpdate' type="submit">Atualizar</button>

                                </div>
                            </Form>
                        </div>
                    )}
                </Formik>

            </div>
        </div>

    )
}


export default CadastrarVagas;