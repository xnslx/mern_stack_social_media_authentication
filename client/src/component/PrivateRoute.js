import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({component:Component, auth, ...rest}) => {
    return (
        <Route 
            {...rest}
            render={props => 
                auth.user !== null? 
                    (<Component {...props}/>):
                    (
                        <Redirect to='/login'/>
                    )
            }
        />
    )
}

const mapStateToProps = (state) => {
    console.log('state',state)
    return {
        auth: state.auth,
        error: state.error
    }
}

export default connect(mapStateToProps)(PrivateRoute);
