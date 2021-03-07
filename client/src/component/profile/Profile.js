import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

const Profile = (props) => {

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
