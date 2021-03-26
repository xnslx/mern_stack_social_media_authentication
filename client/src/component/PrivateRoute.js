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
    return {
        auth: state.auth,
        error: state.error
    }
}

export default connect(mapStateToProps)(PrivateRoute);


// import React, {useEffect} from 'react';
// import {connect} from 'react-redux';
// import {withRouter} from 'react-router';
// import {Route, Redirect} from 'react-router-dom';

// const PrivateRoute = (props) => {
//     useEffect(() => {
//         if(props.auth.user !== null || props.auth.isAuthenticated) {
//             props.history.push('/profile')
//         } else {
//             props.history.push('/login')
//         }
//     },[])

//     return (
//         <Route 
//             {...props}
//         />
//     )
// }

// const mapStateToProps = (state) => {
//     console.log('state',state)
//     return {
//         auth: state.auth,
//         error: state.error
//     }
// }

// export default withRouter(connect(mapStateToProps)(PrivateRoute));