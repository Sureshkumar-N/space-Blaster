import enemyImg from '../image/images.png';

export default function Enemy({id,position,setEnemy}) {
    //console.log(window.height);
    if(position.y+51>window.innerHeight){
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