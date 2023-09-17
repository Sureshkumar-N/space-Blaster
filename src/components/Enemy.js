import { useEffect } from 'react';
import enemyImg from '../image/enemy.png';

export default function Enemy({id,position,setEnemy,shipPosition,setCount,setStatus}) {
    //console.log(window.height);
    
    useEffect(()=> {
        if(position.y+51>window.innerHeight){
            setEnemy((preEnemy)=>(
                preEnemy.filter((obj)=> obj.id!==id)
            ));
        }
        if((shipPosition.x-35<=position.x+25 && shipPosition.x+35>=position.x-25) && (shipPosition.y-25<=position.y+20 && shipPosition.y+35>=position.y-25)) {
            setCount(s=>s-1);
            setStatus(true);
            setTimeout(()=>setStatus(false),1000);
            setEnemy((preEnemy)=>(
                preEnemy.filter((obj)=> obj.id!==id)
            ));
        }
    },[position])
    return(
        <img src={enemyImg} alt='enemy' style={{
            position:'absolute',
            left:`${position.x}px`,
            top:`${position.y}px`,
            width:'50px',
            height:'40px'
        }}/>
    );
}