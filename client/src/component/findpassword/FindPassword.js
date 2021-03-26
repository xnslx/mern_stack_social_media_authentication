import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {retrievePassword} from '../../action/index';
import {Link} from 'react-router-dom';
import classes from './FindPassword.module.css';

const FindPassword = (props) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null)
    const [errorType, setErrorType] = useState(null)

    const verifiedEmail = {
        email: email
    }

    const findPasswordHandler = (e) => {
        e.preventDefault();
        props.dispatch(retrievePassword(verifiedEmail));
        setEmail('')
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
        <Link to='/' className={classes.Link} >BACK TO HOME</Link>
        {errorMessage}
        {props.backendData === 'Email sent!' && (
            <div className={classes.TextContainer}>
                <p>Please check your email to reset password!</p>
            </div>
        )}
        <p className={classes.Text}>Type your email to reset the password.</p>
            <form action="" onSubmit={findPasswordHandler} className={classes.Container}>
                <p className={classes.LabelContainer} ><label htmlFor="email" className={classes.Label}>Email</label></p>
                <input 
                    type="email"
                    id="email"
                    className={classes.Input}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
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

export default connect(mapStateToProps)(FindPassword);
