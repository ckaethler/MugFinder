import React from 'react';

const Rank = ({firstName, rank}) => {
    return (
        <div className='white f3'>
            {firstName + ', your current rank is...'}
            <div className='white f1'>
                {rank}
            </div>
        </div>
        
    );
}

export default Rank;