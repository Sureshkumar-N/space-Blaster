import { useEffect } from 'react';
import enemyImg from '../image/enemy.png';

export default function Enemy({id,position,setEnemy,shipPosition,setCount,setStatus,setScore}) {
    //console.log(window.height);
    
    useEffect(()=> {
        if(position.y+51>window.innerHeight){
            setScore((s)=>s-1);
            setEnemy((preEnemy)=>(
                preEnemy.filter((obj)=> obj.id!==id)
            ));
        }
        const indexLeft=shipPosition.x-35;
        const indexRight=shipPosition.x+35;
        const top=shipPosition.y-32.6;
        const bottom=shipPosition.y+32.5;

        if((indexLeft<=position.x+30 && indexRight>=position.x-20) && (top<=position.y+20 && bottom>=position.y-20)) {
            console.log(position);
            console.log(shipPosition);
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