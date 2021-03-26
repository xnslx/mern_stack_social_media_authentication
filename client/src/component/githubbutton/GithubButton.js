import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGithubSquare} from '@fortawesome/free-brands-svg-icons';

const GithubButton = () => {

    return (
        <div>
            <a href="http://localhost:3001/auth/github">
                <FontAwesomeIcon icon={faGithubSquare} style={{fontSize:'30px', color:'#4c69ba'}}/>
            </a>
        </div>
    )
};

export default GithubButton;


// import React from 'react';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import {faGithubSquare} from '@fortawesome/free-brands-svg-icons';
// import GitHubLogin from 'react-github-login';

// const GithubButton = () => {

//     const onSuccess = response => console.log(response);
//     const onFailure = response => console.error(response);

//     return (
//         <div>
//             <GitHubLogin 
//                 clientId="6f3458df258ac57f6c8b"
//                 onSuccess={onSuccess}
//                 onFailure={onFailure}
//                 render={renderProps => (
//                     <FontAwesomeIcon icon={faGithubSquare} onClick={renderProps.onClick} disabled={renderProps.disabled} style={{fontSize:'28px', color:'#4c69ba'}}/> 
//                     )}
//                 />
//         </div>
//     )
// };

// export default GithubButton;