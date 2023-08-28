import {useState,useEffect} from 'react';
import Playerspaceship from './Playerspaceship';
import Bullet from './Bullet';
import Enemy from './Enemy';
export default function Playground() {
    const [position,setPosition] =useState({x:750,y:720});
    const [bullets,setBullets] =useState([]);
    const [isShoot, setShoot] = useState(false);
    const [timer,setTimer] = useState(30000);
    const enemy1={x:Math.floor(((Math.random()*1000)%window.innerWidth)),y:0};
    const enemy2={x:Math.floor(((Math.random()*1000)%window.innerWidth)),y:0};
    const enemy3={x:Math.floor(((Math.random()*1000)%window.innerWidth)),y:0};
    const enemy4={x:Math.floor(((Math.random()*1000)%window.innerWidth)),y:0};
    const enemy5={x:Math.floor(((Math.random()*1000)%window.innerWidth)),y:0};
    const [enemy,setEnemy]=useState([enemy1,enemy2,enemy3,enemy4,enemy5]);
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
                x:position.x,
                y:position.y-10
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
        if(enemy.length>0) {
            setInterval(()=>{
                setEnemy((preenemy)=>{
                    return preenemy.map((val)=>({
                        ...val,
                        y:val.y+10
                    }))
                });
            },1000);
            setTimer((time)=>time-1);
        }else {
            alert("game over");
        }
    },[enemy]);
    console.log(enemy);
    return(
        <div>
            <button onClick={()=>setTimer((time)=>time-1)} >start</button>
            <Playerspaceship position={position} setPosition={setPosition}/>
            {
                bullets.map((bullet,i)=>{
                    return <Bullet key={i} index={i} bullet={bullet} setBullets={setBullets}/>
                })
            }
            {
                enemy.map((obj,i)=>{
                    return <Enemy key={i} index={i} position={obj} setEnemy={setEnemy}/>
                })
            }
        </div>
    );
}