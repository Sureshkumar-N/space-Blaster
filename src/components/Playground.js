import './Playground.css';
import {useState,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import Playerspaceship from './Playerspaceship';
import Bullet from './Bullet';
import Enemy from './Enemy';
import blastimg from '../image/blast.gif';
import heart from '../image/icons8-heart-32.png';
export default function Playground() {
    const [position,setPosition] =useState({x:780,y:window.screen.height-160});
    const [bullets,setBullets] =useState([]);
    const [isShoot, setShoot] = useState(false);
    const [enemy,setEnemy]=useState([]);
    const [blast,setBlast]=useState(null);
    const [left,setLeft] =useState(false);
    const [right,setRight] =useState(false);
    const location = useLocation();
    const [score,setScore] =useState(0);
    const [shipStatus,setStatus]=useState(false);
    const [count,setCount] = useState(3);
    const screenWidth=window.innerWidth;
    useEffect(()=>{
        const handlekeydown = (event) =>{
            switch(event.key) {
                case "ArrowLeft":
                    setLeft(true);
                    break;
                case "ArrowRight":
                    setRight(true);
                    break;
                case " ":
                    setShoot(true);
            }
        };
        const handlekeyup = (event) =>{
            switch(event.key) {
                case "ArrowLeft":
                    setLeft(false);
                    break;
                case "ArrowRight":
                    setRight(false);
                    break;
                case " ":
                    setShoot(false);
            }
        };
        window.addEventListener('keydown',handlekeydown);
        window.addEventListener('keyup',handlekeyup);
        return () => {
            window.removeEventListener('keydown', handlekeydown);
            window.removeEventListener('keyup', handlekeyup);
        };
    },[]);

    useEffect(()=>{
        const spaceshipSpeed = 20;
        let newPosition = { ...position };
        if (left && newPosition.x >= 50) {
            newPosition.x -= spaceshipSpeed;
            setLeft(false);
        }
        if (right && newPosition.x<screenWidth-260) {
            newPosition.x += spaceshipSpeed;
            setRight(false);
        }
        setPosition(newPosition);
    },[left,right]);

    useEffect(()=>{
        if(isShoot) {
            const newBullet={
                x:position.x-10,
                y:position.y
            };
            const newBullets=[...bullets];
            newBullets.push(newBullet);
            setBullets(newBullets);
        }
    },[isShoot]);
   
    useEffect(() => {
        
        if(bullets.length>0) {
            const bulletSpeed = 10;
            const bulletUpdateInterval = setInterval(() => {
                setBullets((prevBullets) =>
                        prevBullets.map((bullet) => ({
                        ...bullet,
                        y: bullet.y - bulletSpeed
                    }))
                );
                setShoot(false);
            }, 40);
            
            return () => {
                clearInterval(bulletUpdateInterval);
            };
        }   
    }, [bullets]);
    useEffect(()=>{
       const Interval= setInterval(()=>{
            const newEnemy={id:Date.now(),x:random(),y:0};
            //console.log(newEnemy);
            setEnemy((preEnemy)=>(
                [...preEnemy,newEnemy]
            ))
        },3000);
        return ()=>{
            clearInterval(Interval);
        }
    },[]);
    useEffect(()=>{
        if(enemy.length>0) {
           const Interval= setInterval(()=>{
                setEnemy((preenemy)=>{
                    return preenemy.map((val)=>({
                        ...val,
                        y:val.y+10
                    }))
                });
            },300);
            return () => {
                clearInterval(Interval);
            };
        }
    },[enemy]);
    useEffect(()=>{ 
        for(var i=0;i<bullets.length;i++) {
            for(var j=0;j<enemy.length;j++) {
                if(checkcollision(bullets[i],enemy[j])) {
                    const pos=enemy[j];
                    setBullets((prevBullets)=>prevBullets.filter((_,index)=>index!==i));
                    setEnemy((preEnemy)=>preEnemy.filter((_,index)=>index!==j));
                    //console.log(pos,"td");
                    setBlast({
                        position:'absolute',
                        left:pos.x-50,
                        top:pos.y-65,
                        width:'200px',
                        height:'200px'
                    });
                    setScore(s=>s+1);
                    //console.log(blast,"gf");
                    setTimeout(()=>setBlast(null),1000);
                    return;
                }
            }
        }
    },[enemy,bullets]);
   // console.log(blast);
    return(
        <div className='ground'>
            <div className='field'>
                {!shipStatus ? (
                    <Playerspaceship position={position} />
                    ):(
                        <img src={blastimg} style={{height:'100px',width:'100px'}} alt='blast' />
                    )}
                {
                    bullets.map((bullet,i)=>{
                        return <Bullet key={i} index={i} bullet={bullet} setBullets={setBullets}/>
                    })
                }
                { 
                    enemy.map((obj,i)=>{
                        return <Enemy key={obj.id} id={obj.id} position={obj} setEnemy={setEnemy} shipPosition={position} setCount={setCount} setStatus={setStatus}/>
                    })
                }
                { blast!==null ? <img src={blastimg} style={blast} alt='blast'/> : null}
            </div>
            <div className='score'>
                <div className='life-icon'>
                    {
                        Array.from({length:count}).map((_,i)=>(
                            <Lifeicon key={i} icon={heart}/>
                        ))}
                </div>
                <div>
                    <h1>{location.state.value}</h1>
                    <h1>Your Score</h1>
                    <h1>{score}</h1>
                </div>
            </div>
        </div>
    );
}

function random(){
    var pos=Math.floor(Math.random()*(window.screen.width-10)+10);
    return pos>700 ? pos-200:pos;
}

function checkcollision(bullet,enemy) {
    if((bullet.x>=enemy.x-25 && bullet.x<=enemy.x+50)&&(bullet.y+30>enemy.y && bullet.y<enemy.y+50)) {
        return true;
    }
    return false;
}

function Lifeicon({icon}) {
    return <img src={icon} alt="heart" style={{width:'40px',height:'40px'}}/>
}
