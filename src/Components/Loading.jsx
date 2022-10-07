import React from 'react';
import '../styles/isloading.css'

const Loading = () => {
    return (
        <div className='overlay'>
            <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
           </div>
    );
};

export default Loading;