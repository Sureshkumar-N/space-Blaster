import bulletImg from '../image/bullet.png';


export default function Bullet({index,bullet,setBullets})  {
    if(bullet.y===0){
        setBullets((preBullet)=>{
            console.log(preBullet,index);
           return preBullet.filter((_,i)=> index!==i);
           
        });
    }
    return(
        <img src={bulletImg} alt='bullet' 
        style={{
            position:'absolute',
            left:`${bullet.x}px`,
            top:`${bullet.y}px`
        }}
        />
    );
} 