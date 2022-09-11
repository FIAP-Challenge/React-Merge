import React from "react";
import * as FaIcons from "react-icons/fa" 
import * as AiIcons from "react-icons/ai" 
import * as IoIcons from "react-icons/io" 


export const SidebarDate = [
    {
        title: 'Noticias',
        path: "/dashboard/noticias",
        icon: <FaIcons.FaEnvelopeOpenText/>,
        cName: 'nav-text'
    },
    {
        title: 'Curriculo',
        path: "/dashboard/curriculo",
        icon: <IoIcons.IoIosPaper/>,
        cName: 'nav-text'
    },
    {
        title: 'Vagas',
        path: "/dashboard/vagas",
        icon: <FaIcons.FaCartPlus/>,
        cName: 'nav-text'
    },
    {
        title: 'Entrevistas',
        path: "/dashboard/entrevistas",
        icon: <IoIcons.IoMdPeople/>,
        cName: 'nav-text'
    },
    {
        title: 'Informações',
        path: "/dashboard/informacoes",
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text'
    },
    
    {
        title: 'Suporte',
        path: "/dashboard/suporte",
        icon: <IoIcons.IoMdHelpCircle/>,
        cName: 'nav-text'
    },

]