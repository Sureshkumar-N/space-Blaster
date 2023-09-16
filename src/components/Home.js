import './Home.css';
import { useNavigate } from 'react-router-dom';
import {useRef} from 'react';
import img from '../image/spaceship-png.png';
export default function Home() {
    const ip_ref=useRef();
    const navigate=useNavigate();
    return(
        <div className="home">
            <div className='container'>
                <h1 className='title'>Space Blasters</h1>
                <input ref={ip_ref} className='input' type='tex' placeholder='Enter Username'/>
                <div className='img-container'>
                    
                </div>
                <button className='btn' onClick={()=>navigate('/game',{state:{value:ip_ref.current.value}})}>Let's Go</button>
            </div>
        </div>
    );
}
