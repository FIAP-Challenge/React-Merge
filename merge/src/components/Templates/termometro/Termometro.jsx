import React from "react"
import Thermometer from 'react-thermometer-ecotropy'
import './TermometroStyle.css'



const Termometro = (props) => {


    return (

        <div className="align-itens">
            <Thermometer
                theme="dark"
                value={props.value}
                max="100"
                tooltipValue={false}
                steps="4"
                format=""
                size="large"
                height="200"
            />

            <div>
                <h2 className="value-termotro">
                    {props.value}%
                </h2>
            </div>


        </div>
    )
}

export default Termometro;