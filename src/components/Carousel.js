import './Carousel.css';
import { useState } from 'react';
export default function Carousel(props) {
    const {images} = props;
    const [slide,setSlide] =useState(0);
    const handleleftClick=()=>{
        setSlide((preSlide)=> preSlide===0 ? preSlide.length-1:preSlide-1);
    };
    const handlerightClick = ()=>{
        setSlide((preSlide)=> preSlide===images.length-1?0:preSlide+1);
    };

    return (
        <div className='carousel-container'>
            <button className='left' onClick={handleleftClick}>&lt;</button>
            <div className='carousel-wrapper'>
                {
                    images.map((img, index)=>(
                        <div key={index} className={`slide${index===slide?'active':''}`}>
                            {img}
                        </div>
                    ))
                }
            </div>
            <button className='right' onClick={handlerightClick}>&gt;</button>
        </div>
    );
}