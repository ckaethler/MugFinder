import React from 'react';

const Rank = ({firstname, rank}) => {
    return (
        <div className="text-center">
            <h1 className='text-center mt-72'>Detect a Mug</h1>
            <h3 className="mt-72">Welcome, {firstname}!</h3>
            <p className="subtext-gray">You have searched {rank} pictures so far.</p>
        </div>
    );
}

export default Rank;