import React from 'react';
import {Link} from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <p>MERN STACK SOCIAL MEDIA AUTHENTICATION</p>
            <Link to='/login'>LOGIN</Link>
        </div>
    )
};

export default Home;
