
import './Home.css';

export default function Home() {
    return(
        <div className="home">
            <div className='container'>
                <h1 className='title'>Space Blasters</h1>
                <input className='input' type='tex' placeholder='Enter Username'/>
                <button className='btn' >Let's Go</button>
            </div>
        </div>
    );
}
