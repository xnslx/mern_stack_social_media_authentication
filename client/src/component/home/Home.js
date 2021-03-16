import React from 'react';
import {Link} from 'react-router-dom';
import classes from './Home.module.css';

const Home = () => {
    return (
        <div className={classes.Container}>
            <p>Welcome to my MERN stack authentication.</p>
            <Link to='signup' className={classes.Link}>SIGN UP</Link>
            <Link to='/login' className={classes.Link}>LOG IN</Link>
        </div>
    )
};

export default Home;
