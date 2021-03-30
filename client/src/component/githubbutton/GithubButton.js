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

