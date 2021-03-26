import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {resetPassword} from '../../action/index';
import {Link} from 'react-router-dom';
import classes from './ResetPassword.module.css';

const ResetPassword = (props) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null)
    const [errorType, setErrorType] = useState(null)
    const token = props.match.params.token;

    
    const resetPasswordHandler = (e) => {
        e.preventDefault();
        props.dispatch(resetPassword({password: password, confirmPassword: confirmPassword, resetToken: token},props.history))
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
        <div className={classes.Container}>
        <Link to='/' className={classes.Link} >BACK TO HOME</Link>
        {errorMessage}
            <form action="" onSubmit={resetPasswordHandler}>
                <div>
                    <p className={classes.LabelContainer}><label htmlFor="password" className={classes.Label}>Password</label></p>
                    <input 
                        type="password" 
                        id="password"
                        value={password}
                        className={classes.Input}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <p className={classes.LabelContainer}><label htmlFor="confirmPassword" className={classes.Label}>Confirm Password</label></p>
                    <input 
                        type="password" 
                        id="confirmPassword"
                        value={confirmPassword}
                        className={classes.Input}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className={classes.Button}>Submit</button>
            </form>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        error: state.error,
        backendData: state.backendData.backendData
    }
}

export default connect(mapStateToProps)(withRouter(ResetPassword));
