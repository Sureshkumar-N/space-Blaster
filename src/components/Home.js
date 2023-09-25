import './Home.css';
import { useNavigate } from 'react-router-dom';
import {useRef} from 'react';

export default function Home() {
    const ip_ref=useRef();
    const navigate=useNavigate();
    
    const handleClick= ()=>{
        if(!ip_ref.current.value) {
            ip_ref.current.focus();
            return;
        }
        navigate('/game',{state:{value:ip_ref.current.value}});
    };

    return(
        <div className="home">
            <div className='container'>
                <h1 className='title'>Space Blasters</h1>
                <input ref={ip_ref} className='input' type='text' placeholder='Enter Username'/>
                <button className='btn' onClick={()=>handleClick()}>Let's Go</button>
            </div>
        </div>
    );
}
