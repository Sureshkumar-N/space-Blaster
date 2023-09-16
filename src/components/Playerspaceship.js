import Spaceship from '../image/spaceship-png.png';


export default function Playerspaceship({position}) {
    return (
        <div className="space">
          <img
            src={Spaceship}
            alt="Spaceship"
            style={{
                position: 'relative',
                left: `${position.x-45}px`,
                top: `${position.y}px`,
                width: '75px', 
                height: '75px',
                transition:'0.25s'
            }}
            />
        </div>
    );
}