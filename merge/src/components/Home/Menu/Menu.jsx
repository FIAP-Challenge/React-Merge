import './menuStyle.css'
import mergeLogo from './../../../Assets/Merge.svg'
import { Link } from 'react-router-dom'


const Menu = () => {
    return(
        <>
            <div className='container'>
                <Link to="/"><img src={mergeLogo} alt="" /></Link>
                <div>
                <Link to="/login"><button className='buttonLogin'>Login/Registrar</button></Link>
                    
                </div>
            </div>
            
        </>
    )
}
export default Menu;


