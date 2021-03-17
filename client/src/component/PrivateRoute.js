import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';


const PrivateRoute = ({component:Component, ...rest}) => {

    return (
        <Route 
            {...rest}
            render={props => {
                if(props.auth !== null) {
                    return <Component {...props}/>
                } else {
                    return (
                        <Redirect 
                            to ={{
                                path: '/login',
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    )
                }
            }}
        />
    )
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth.user,
        error: state.error.message
    }
}

export default connect(mapStateToProps)(PrivateRoute);
