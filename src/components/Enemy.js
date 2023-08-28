import enemyImg from '../image/images.png';

export default function Enemy({index,position,setEnemy}) {
    if(position.y>window.innerHeight+100){
        setEnemy((preEnemy)=>(
            preEnemy.filter((_,i)=> i!==index)
        ))
    }
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