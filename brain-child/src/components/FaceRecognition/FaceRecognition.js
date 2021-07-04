import React from 'react';
import './FaceRecognition.css';

const FaceRecognition=({box, imageURL})=>{
    return(
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputImage' src={imageURL}  alt='' width='auto' height='245px' />
                <div className='bounding-box' style={{top:box.topRow, right:box.rightCol, bottom:box.bottomRow, left:box.leftCol}}>

                </div>
            </div>
        </div>    
    );
}
export default FaceRecognition;