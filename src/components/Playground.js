import {useState,useEffect} from 'react';
import Playerspaceship from './Playerspaceship';
import Bullet from './Bullet';
import Enemy from './Enemy';
import blastimg from '../image/blast.gif';
export default function Playground() {
    //console.log(window.innerHeight);
    const [position,setPosition] =useState({x:780,y:window.screen.height-160});
    const [bullets,setBullets] =useState([]);
    const [isShoot, setShoot] = useState(false);
    const [enemy,setEnemy]=useState([]);
    const [blast,setBlast]=useState(null);
    useEffect(()=>{
        const handlekeydown = (event) =>{
           if(event.key===" ")
                setShoot(true);
        };
        const handlekeyup = (event) =>{
            if(event.key===" ")
                setShoot(false);
        };
        window.addEventListener('keydown',handlekeydown);
        window.addEventListener('keyup',handlekeyup);
        return () => {
            window.removeEventListener('keydown', handlekeydown);
            window.removeEventListener('keyup', handlekeyup);
        };
    },[]);
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
    // console.log(bullets);
    useEffect(() => {
        if(bullets.length>0) {
        const bulletSpeed = 10;
        const bulletUpdateInterval = setInterval(() => {
          setBullets((prevBullets) =>
            prevBullets.map((bullet) => ({
              ...bullet,
              y: bullet.y - bulletSpeed,
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
            console.log(newEnemy);
            setEnemy((preEnemy)=>(
                [...preEnemy,newEnemy]
            ))
        },4000);
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
                    setBullets((prevBullets)=>prevBullets.filter((_,index)=>index!==i));
                    setEnemy((preEnemy)=>preEnemy.filter((_,index)=>index!==j));
                    //console.log(enemy[j]);
                    setBlast({
                        position:'absolute',
                        left:enemy[j].x,
                        right:enemy[j].y,
                        width:'200px',
                        height:'200px'
                    });
                    setTimeout(()=>setBlast(null),1000);
                    return;
                }
            }
        }
    },[enemy,bullets]);
   // console.log(blast);
    return(
        <div>
            <Playerspaceship position={position} setPosition={setPosition}/>
            {
                
                bullets.map((bullet,i)=>{
                    return <Bullet key={i} index={i} bullet={bullet} setBullets={setBullets}/>
                })
            }
            { 
                enemy.map((obj,i)=>{
                    return <Enemy key={obj.id} id={obj.id} position={obj} setEnemy={setEnemy} />
                })
            }
            {blast!==null ? <img src={blastimg} style={blast} alt='blast'/> : null}
        </div>
    );
}
function random(){
    return Math.floor(Math.random()*(window.screen.width-10)+10);
}

function checkcollision(bullet,enemy) {
    if((bullet.x>=enemy.x && bullet.x<=enemy.x+50)&&(bullet.y+30>enemy.y && bullet.y<enemy.y+50)) {
        return true;
    }
    return false;
}
