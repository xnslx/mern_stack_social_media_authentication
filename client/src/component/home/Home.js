import React from 'react';
import {Link} from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <p>MERN STACK SOCIAL MEDIA AUTHENTICATION</p>
            <Link to='/login'>LOG IN</Link>
            <Link to='signup'>SIGN UP</Link>
        </div>
    )
};

export default Home;
