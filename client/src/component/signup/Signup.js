import React, {useState, useEffect} from 'react';
import {signupUser} from '../../action/index';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import { Link } from 'react-router-dom';
import classes from './Signup.module.css';

const Signup = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState([]);


    const newUser = {
        name:name,
        email:email,
        password:password,
        confirmPassword:confirmPassword
    }

    useEffect(() => {
        getErrorMessage()
    }, [])

    let errorMessage;

    const getErrorMessage = () => {
        if(props.error.type === "validator") {
        setError(props.error.message.errors);
        errorMessage = (
                <ul >{error.map((err, index) => (
                    <li className={classes.ErrorMessage} key={index}>{err.msg}</li>
                ))}</ul>
            )
        } else if(props.error.type === "passport") {
            setError(props.error.message.message);
            errorMessage = (
                <p>{error}</p>
            )
        }
    }


    console.log('error',error)
    console.log('errorMessage', errorMessage)
        
    const submitHandler = (e) => {
        e.preventDefault();
        props.dispatch(signupUser(newUser, props.history))
    }


    return (
        <div className={classes.Container}>
            <Link to='/' className={classes.CloseLink} >X</Link>
            <h1 style={{textAlign:'center'}}>SIGN UP</h1>
            {/* {props.error? props.error.errors.map((err,index)=> <ul className={classes.ErrorMessage} key={index}><li>{err.msg}</li></ul>):null} */}
            {/* {error.length> 0? error.map((err,index) => <ul className={classes.ErrorMessage} key={index}><li>{err.msg}</li></ul>):null} */}
            {errorMessage}
            <div>
                <form action="" onSubmit={submitHandler}>
                    <div>
                        <p className={classes.LabelContainer}><label htmlFor="name" className={classes.Label}>Name</label></p>
                        <input 
                            type="text"
                            id="name"
                            className={classes.Input}
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <p className={classes.LabelContainer}><label htmlFor="email" className={classes.Label}>Email</label></p>
                        <input 
                            type="email"
                            id="email"
                            className={classes.Input}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <p className={classes.LabelContainer}><label htmlFor="password" className={classes.Label}>Password</label></p>
                        <input 
                            type="password"
                            id="password"
                            className={classes.Input}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <p className={classes.LabelContainer}><label htmlFor="confirmPassword" className={classes.Label}>Confirm Password</label></p>
                        <input 
                            type="password"
                            id="confirmPassword"
                            className={classes.Input}
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className={classes.Button}>SIGN UP</button>
                </form>
                <h5 className={classes.Text}>Already have an account? <Link to='/login' className={classes.Link}>Log in</Link></h5>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    console.log('state',state)
    return {
        auth: state.auth,
        error: state.error
    }
}
export default connect(mapStateToProps)(withRouter(Signup));
