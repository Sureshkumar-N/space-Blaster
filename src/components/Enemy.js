import { useEffect } from 'react';
import enemyImg from '../image/images.png';

export default function Enemy({id,position,setEnemy,shipPosition}) {
    //console.log(window.height);
    
    useEffect(()=> {
        if(position.y+51>window.innerHeight){
            setEnemy((preEnemy)=>(
                preEnemy.filter((obj)=> obj.id!==id)
            ))
        }
        if(shipPosition.x<=position.x && shipPosition.x<=position.x+75 && shipPosition.y-100<=position.y+50) {
            console.log("efef");
        }

    },[position])
    return(
        <img src={enemyImg} alt='enemy' style={{
            position:'absolute',
            left:`${position.x}px`,
            top:`${position.y}px`,
            width:'50px',
            height:'50px'
        }}/>
    );
}