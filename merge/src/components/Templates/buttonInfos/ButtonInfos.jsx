import React from "react";
import { BsInfoCircle, } from 'react-icons/bs'
import Tippy from '@tippyjs/react/headless';
import './ButtonInfosStyles.css'


const ButtonInfos = (props) => {

    return (
        <div>

            <Tippy 
                render={attrs => (
                    <div className="box" tabIndex="-1" {...attrs}>
                        {props.mensagem}
                    </div>
                )}
            >
               <button type="button" className="buttonInfos"> <BsInfoCircle /></button>
            </Tippy>

        </div>
    )
}

export default ButtonInfos;