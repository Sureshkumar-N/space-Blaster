import enemyImg from '../image/images.png';

export default function Enemy({id,position,setEnemy}) {
    if(position.y>710){
        setEnemy((preEnemy)=>(
            preEnemy.filter((obj)=> obj.id!==id)
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