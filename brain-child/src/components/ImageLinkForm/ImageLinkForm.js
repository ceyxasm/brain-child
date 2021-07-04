import React from 'react';
import './ImageLinkForm.css';

const ImagLinkForm=({onInputChange, onSubmit})=>{
    return(
        <div>
            <p>
                {'The brainChild will detect faces in your photos. Give it a try!'}
            </p>
            <div className='center'>
                <div className='pa4 br3 shadow-5 center form' >
                    <input 
                        className='f4 pa2 w-70 center' 
                        type='text' onChange={onInputChange} 
                    />
                    <button 
                        className='w-30 f4 grow link ph3 pv2 dib white bg-green'
                        onClick={onSubmit}
                    >
                          Detect!
                    </button>
                </div>
            </div>
        </div>    
    );
}
export default ImagLinkForm;