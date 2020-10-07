import React from 'react';

const Rank = ({firstName, rank}) => {
    return (
        <div className="text-center">
            <h1 className='text-center mt-72'>Detect a Mug</h1>
            <h3 className="mt-72">Welcome, {firstName}!</h3>
            <p className="subtext-gray">You have searched {rank} pictures so far.</p>
        </div>
    );
}

export default Rank;