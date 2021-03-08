import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {getProfileData} from '../../action/index';
const Profile = (props) => {
    
    useEffect(() => {
        props.dispatch(getProfileData())
    },[])

    return (
        <div>
             {props.auth.user.name}Finally you are getting here!
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
