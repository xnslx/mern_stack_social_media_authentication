import React, {useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {getProfileData, logout} from '../../action/index';
import classes from './Profile.module.css';

const Profile = (props) => {
    const [name, setName] = useState('')

    // useEffect(() => {
    //     props.dispatch(getProfileData())
    // },[])

    useEffect(() => {
        if(props.auth.user !==null) {
            setName(props.auth.user.name)
        } else {
            setName('')
        }
    },[props.auth.user])

    console.log('name', name)

    const clickHandler = (e) => {
        e.preventDefault();
        props.dispatch(logout(props.history))
    }

    return (
        <div style={{textAlign:'center',marginTop:'200px'}}>
             <p>Hey there, <strong>{name}</strong>!
             {/* <p>Hey there, <strong>{props.auth.user.name}</strong>! */}
             Finally you are getting here!<span role="img" aria-label="clap">🖐</span></p>
             <button onClick={clickHandler} className={classes.Button}>LOG OUT</button>
        </div>
    )
};

const mapStateToProps = (state) => {
    console.log('state',state)
    return {
        auth: state.auth,
        error: state.error.message
    }
}

export default withRouter(connect(mapStateToProps)(Profile));
