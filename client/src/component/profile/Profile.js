import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

const Profile = (props) => {
    const [userName, setUserName] = useState('')
    useEffect(() => {
        axios.get('/user/profile', {withCredentials: true})
            .then(result => {
            console.log(result)
            setUserName(result.data.user.name)
        }).catch(err => {
            console.log(err)
        })

    }, [])
    return (
        <div>
            Hello {userName.split(' ')[0]} Finally you are getting here!
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
