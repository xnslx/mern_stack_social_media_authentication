import React, {useState, useEffect} from 'react';
import classes from './LoginForm.module.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {loginUser} from '../../action/index';
import {withRouter} from 'react-router';

const LoginForm = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null)
    const [errorType, setErrorType] = useState(null)

    const currentUser = {
        email: email,
        password: password
    }

    const loginSubmitHandler = (e) => {
        e.preventDefault();
        props.dispatch(loginUser(currentUser, props.history));
    }

    let errorMessage;

    useEffect(() => {
        if(props.error.type === "validator") {
            setError(props.error.message.errors)
            setErrorType("validator")
        } else if(props.error.type === "passport") {
            setError(props.error.message.message)
            setErrorType("passport")
        }
    },[props.error, props.error.type])

    
    if(error && errorType === "validator") {
        errorMessage = (<ul className={classes.ErrorMessage}>{error.map((err, index) => (
            <li key={index}>{err.msg}</li>
        ))}</ul>)
    } else if(error && errorType === "passport") {
        errorMessage = (
            <p className={classes.ErrorMessage} >{error}</p>
        )
    }
    

    return (
        <div>
            <div className={classes.Container}>
            <Link to='/' className={classes.Link}>X</Link>
            <h1 style={{textAlign:'center'}}>Log In</h1>
            <br/>
            <br/>
            {errorMessage}
            <div className={classes.Form}>
                <form action="" onSubmit={loginSubmitHandler}>
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
                    <button type="submit" className={classes.Button}>LOG IN</button>
                </form>
            </div>
            <a href="/findpassword" className={classes.Alink}>Forget Password?</a>
            <h5>Don't have an account? <Link to='/signup' className={classes.Alink}>Sign up</Link></h5>
        </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        error: state.error
    }
}

export default withRouter(connect(mapStateToProps)(LoginForm));

