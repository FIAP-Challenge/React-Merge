import React from "react";
import "./discStyle.css";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as yup from "yup";
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import { DiscData } from "./DiscData";
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useState } from "react";



const Disc = () => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = DiscData.length;
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const validationSchema = yup.object({
        perguntas: yup.array().of(
            yup.object().shape({
                respostaA: yup
                    .string()
                    .required("Obrigátorio")
                    .notOneOf([yup.ref('respostaB'), null], 'Valor já foi escolhido')
                    .notOneOf([yup.ref('respostaC'), null], 'Valor já foi escolhido')
                    .notOneOf([yup.ref('respostaD'), null], 'Valor já foi escolhido'),


                respostaB: yup
                    .string()
                    .required("Obrigátorio")
                    .notOneOf([yup.ref('respostaA'), null], 'Valor já foi escolhido')
                    .notOneOf([yup.ref('respostaC'), null], 'Valor já foi escolhido')
                    .notOneOf([yup.ref('respostaD'), null], 'Valor já foi escolhido'),
                respostaC: yup
                    .string()
                    .required("Obrigátorio")
                    .notOneOf([yup.ref('respostaA'), null], 'Valor já foi escolhido')
                    .notOneOf([yup.ref('respostaB'), null], 'Valor já foi escolhido')
                    .notOneOf([yup.ref('respostaD'), null], 'Valor já foi escolhido'),
                respostaD: yup
                    .string()
                    .required("Obrigátorio")
                    .notOneOf([yup.ref('respostaA'), null], 'Valor já foi escolhido')
                    .notOneOf([yup.ref('respostaB'), null], 'Valor já foi escolhido')
                    .notOneOf([yup.ref('respostaC'), null], 'Valor já foi escolhido'),
            })
        )

    })

    return (
        <div className="containerDiscMaster">

            <div className="containerDisc">
                <Formik
                    initialValues={{

                        perguntas: [
                            {
                                pergunta: activeStep + 1,
                                respostaA: '',
                                respostaB: '',
                                respostaC: '',
                                respostaD: ''
                            },
                        ],
                    }}
                    onSubmit={async (values) => {
                        await new Promise((r) => setTimeout(r, 500));
                        console.log(JSON.stringify(values, null, 2))
                        alert(JSON.stringify(values, null, 2));
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
                        isSubmitting,
                    }) => (
                        <Form>
                            <FieldArray name="perguntas">
                                {({ insert, remove, push }) => (
                                    <div >
                                        {values.perguntas.length > 0 &&
                                            values.perguntas.map((perguntas, index) => (

                                                <div key={index}>
                                                    {index == activeStep ? <div key={index} name={`objeto.${index}`}>
                                                        <div className="discHeader">
                                                            <h2>{DiscData[index].pergunta}</h2>
                                                        </div>
                                                        <div className="discBody" >
                                                            <div className="discRespostas" >
                                                                <div className="separator">
                                                                    <div>
                                                                        <Field name={`perguntas.${index}.respostaA`} className="selectFieldDisc" as="select" id="respostaA">
                                                                            <option value="" defaultValue></option>
                                                                            <option value="1">1</option>
                                                                            <option value="2">2</option>
                                                                            <option value="3">3</option>
                                                                            <option value="4">4</option>
                                                                        </Field>
                                                                    </div>
                                                                </div>


                                                                <div>
                                                                    <p>{DiscData[index].a.respostaA}</p>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <ErrorMessage className='errosInputs' component="div" name={`perguntas.${index}.respostaA`} />
                                                            </div>
                                                            <div className="discRespostas">
                                                                <div>
                                                                    <Field name={`perguntas.${index}.respostaB`} className="selectFieldDisc" as="select" id="respostaB">
                                                                        <option value="" defaultValue></option>
                                                                        <option value="1">1</option>
                                                                        <option value="2">2</option>
                                                                        <option value="3">3</option>
                                                                        <option value="4">4</option>
                                                                    </Field>

                                                                </div>
                                                                <div>
                                                                    <p>{DiscData[activeStep].b.respostaB}</p>
                                                                </div>

                                                            </div>
                                                            <div>
                                                                <ErrorMessage className='errosInputs' component="div" name={`perguntas.${index}.respostaB`} />
                                                            </div>
                                                            <div className="discRespostas">
                                                                <div>
                                                                    <Field name={`perguntas.${index}.respostaC`} className="selectFieldDisc" as="select" id="respostaC">
                                                                        <option value="" defaultValue></option>
                                                                        <option value="1">1</option>
                                                                        <option value="2">2</option>
                                                                        <option value="3">3</option>
                                                                        <option value="4">4</option>
                                                                    </Field>

                                                                </div>
                                                                <div>
                                                                    <p>{DiscData[activeStep].c.respostaC}</p>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <ErrorMessage className='errosInputs' component="div" name={`perguntas.${index}.respostaB`} />
                                                            </div>

                                                            <div className="discRespostas">
                                                                <div>
                                                                    <Field name={`perguntas.${index}.respostaD`} className="selectFieldDisc" as="select" id="respostaD">
                                                                        <option value="" defaultValue></option>
                                                                        <option value="1">1</option>
                                                                        <option value="2">2</option>
                                                                        <option value="3">3</option>
                                                                        <option value="4">4</option>
                                                                    </Field>

                                                                </div>
                                                                <div>
                                                                    <p>{DiscData[activeStep].d.respostaD}</p>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <ErrorMessage className='errosInputs' component="div" name={`perguntas.${index}.respostaB`} />
                                                            </div>
                                                        </div>

                                                    </div> :
                                                        ""}
                                                </div>
                                            ))}

                                        <div className="discFooter">

                                            <div className="flexAlign-disc">
                                                <MobileStepper
                                                    className="MobileStepper"
                                                    variant="text"
                                                    steps={maxSteps}
                                                    position="static"
                                                    activeStep={activeStep}
                                                    nextButton={
                                                        <Button

                                                            className="buttonAvançar"
                                                            size="small"

                                                            onClick={() => {
                                                                push({
                                                                    pergunta: (activeStep + 2),
                                                                    respostaA: '',
                                                                    respostaB: '',
                                                                    respostaC: '',
                                                                    respostaD: ''
                                                                })
                                                                handleNext()
                                                            }}
                                                            disabled={activeStep === maxSteps - 1}
                                                        >
                                                            Próximo
                                                            {theme.direction === 'rtl' ? (
                                                                <KeyboardArrowLeft />
                                                            ) : (
                                                                <KeyboardArrowRight />
                                                            )}
                                                        </Button>
                                                    }
                                                    backButton={
                                                        <Button
                                                            
                                                            className="buttonVoltar"
                                                            size="small"

                                                            onClick={() => {
                                                                remove(activeStep)
                                                                handleBack()

                                                            }}
                                                            disabled={true}>
                                                            {theme.direction === 'rtl' ? (
                                                                <KeyboardArrowRight />
                                                            ) : (
                                                                <KeyboardArrowLeft />
                                                            )}
                                                            Voltar
                                                        </Button>
                                                    }
                                                />
                                            </div>
                                        </div>

                                    </div>
                                )}
                            </FieldArray>

                            <div className='containerButton'>
                                <button className='buttonNext' type="submit">Enviar</button>
                            </div>

                        </Form>

                    )}

                </Formik>
            </div>




        </div >

    )
}
export default Disc;