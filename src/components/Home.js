import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
    const navigate=useNavigate();
    return(
        <div className="home">
            <div className='container'>
                <h1 className='title'>Space Blasters</h1>
                <input className='input' type='tex' placeholder='Enter Username'/>
                <button className='btn' onClick={()=>navigate('/game')}>Let's Go</button>
            </div>
        </div>
    );
}
