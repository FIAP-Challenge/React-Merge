import React, { useState } from "react";
import "./discStyle.css";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as yup from "yup";
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import { DiscData } from "./DiscData";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';



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

    })


    return (
        <div className="containerDiscMaster">

            <div className="containerDisc">
                <Formik
                    initialValues={{

                        perguntas: [
                            {
                                pergunta: '',
                                respostaA: '',
                                respostaB: '',
                                respostaC: '',
                                respostaD: ''
                            },
                        ],
                    }}
                    onSubmit={async (values) => {
                        await new Promise((r) => setTimeout(r, 500));

                        if (values) {
                            // setdadosform2(values)
                            // navigate('/dashboard/disc');



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
                        isSubmitting,
                    }) => (
                        <Form>


                            <FieldArray name="perguntas">
                                {({ insert, remove, push }) => (
                                    <div>
                                        {values.perguntas.length > 0 &&
                                            values.perguntas.map((perguntas, index) => (
                                                <div key={index}>
                                                    <div className="discHeader">
                                                        <h2>{DiscData[activeStep].pergunta}</h2>
                                                    </div>

                                                    <div className="discBody">
                                                        <div className="discRespostas">
                                                            <div>
                                                                <Field name="`perguntas.${index}.respostaA`" className="selectFieldDisc" as="select" id="respostaA">
                                                                    <option value="" defaultValue></option>
                                                                    <option value="1">1</option>
                                                                    <option value="2">2</option>
                                                                    <option value="3">3</option>
                                                                    <option value="4">4</option>
                                                                </Field>
                                                                <ErrorMessage className='errosInputs' component="div" name="respostaA" />
                                                            </div>

                                                            <div>
                                                                <p>{DiscData[activeStep].a.respostaA}</p>
                                                            </div>
                                                        </div>
                                                        <div className="discRespostas">
                                                            <div>
                                                                <Field name="`perguntas.${index}.respostaB`" className="selectFieldDisc" as="select" id="respostaB">
                                                                    <option value="" defaultValue></option>
                                                                    <option value="1">1</option>
                                                                    <option value="2">2</option>
                                                                    <option value="3">3</option>
                                                                    <option value="4">4</option>
                                                                </Field>
                                                                <ErrorMessage className='errosInputs' component="div" name="respostaB" />
                                                            </div>
                                                            <div>
                                                                <p>{DiscData[activeStep].b.respostaB}</p>
                                                            </div>
                                                        </div>
                                                        <div className="discRespostas">
                                                            <div>
                                                                <Field name="`perguntas.${index}.respostaC`" className="selectFieldDisc" as="select" id="respostaC">
                                                                    <option value="" defaultValue></option>
                                                                    <option value="1">1</option>
                                                                    <option value="2">2</option>
                                                                    <option value="3">3</option>
                                                                    <option value="4">4</option>
                                                                </Field>
                                                                <ErrorMessage className='errosInputs' component="div" name="respostaC" />
                                                            </div>
                                                            <div>
                                                                <p>{DiscData[activeStep].c.respostaC}</p>
                                                            </div>
                                                        </div>
                                                        <div className="discRespostas">
                                                            <div>
                                                                <Field name="`perguntas.${index}.respostaD`" className="selectFieldDisc" as="select" id="respostaD">
                                                                    <option value="" defaultValue></option>
                                                                    <option value="1">1</option>
                                                                    <option value="2">2</option>
                                                                    <option value="3">3</option>
                                                                    <option value="4">4</option>
                                                                </Field>
                                                                <ErrorMessage className='errosInputs' component="div" name="respostaD" />
                                                            </div>
                                                            <div>
                                                                <p>{DiscData[activeStep].d.respostaD}</p>
                                                            </div>
                                                        </div>
                                                    </div>
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
                                                            onClick={handleNext}
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
                                                        onClick={handleBack} 
                                                        disabled={activeStep === 0}>
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
                                        {/* <button
                                            type="button"
                                            className='button-add'
                                            onClick={() => push({ nomeHabilidade: '' })}
                                        >
                                            Adicionar
                                        </button> */}
                                    </div>
                                )}
                            </FieldArray>





                        </Form>
                    )}

                </Formik>
            </div>



            <div className='containerButton'>
                <button className='buttonNext' type="submit">Enviar</button>
            </div>
        </div >

    )
}
export default Disc;