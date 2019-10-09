import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

import data from '../../../../data/javascript/index.json';
import './javascript.css';

const Javascript = () => {
  const curriculumProgress = JSON.parse(
    localStorage.getItem('curriculumProgress'),
  );
  const showCurriculumProgress = key => {
    if (curriculumProgress[key] === 'success') {
      return <FontAwesomeIcon icon={faCheck} color="green" />;
    }
    if (curriculumProgress[key] === 'fail') {
      return <FontAwesomeIcon icon={faTimes} color="red" />;
    }
    return '';
  };
  return (
    <Container className="mt-5 mb-3">
      <h2>This is Javascript</h2>
      <div>
        {data.quizzes.map(quizz => (
          <div key={quizz.key}>
            <Link to={`javascript/${quizz.key}`} className="link-question">
              {quizz.title}
            </Link>
            {showCurriculumProgress(quizz.key)}
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Javascript;
