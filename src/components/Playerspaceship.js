import { useState,useEffect } from "react";
import Spaceship from '../image/spaceship-png.png';

export default function Playerspaceship({position,setPosition}) {
    const[left,setLeft] =useState(false);
    const[right,setRight] =useState(false);
    const screenWidth=window.innerWidth;
    useEffect(()=>{
        const handlekeydown = (event) =>{
            if (event.key === 'ArrowLeft') {
                setLeft(true);
            } else if (event.key === 'ArrowRight') {
                setRight(true);
            }
        };
        const handlekeyup = (event) => {
            if (event.key === 'ArrowLeft') {
              setLeft(false);
            } else if (event.key === 'ArrowRight') {
              setRight(false);
            }
        };
        window.addEventListener('keydown', handlekeydown);
        window.addEventListener('keyup', handlekeyup);
        return () => {
            window.removeEventListener('keydown', handlekeydown);
            window.removeEventListener('keyup', handlekeyup);
        };
    },[]); 
    useEffect(()=>{
        const spaceshipSpeed = 20;
        let newPosition = { ...position };

        if (left && newPosition.x >= 50) {
            newPosition.x -= spaceshipSpeed;
            setLeft(false);
        }
        if (right && newPosition.x<screenWidth) {
            newPosition.x += spaceshipSpeed;
            setRight(false);
        }
        setPosition(newPosition);
    },[left,right]);
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
                height: '75px'
            }}
            />
        </div>
    );
}