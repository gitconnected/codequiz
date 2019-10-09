import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, ProgressBar, Row } from 'react-bootstrap';
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
    if (!curriculumProgress) return '';
    if (curriculumProgress[key] === 'success') {
      return <FontAwesomeIcon icon={faCheck} color="green" />;
    }
    if (curriculumProgress[key] === 'fail') {
      return <FontAwesomeIcon icon={faTimes} color="red" />;
    }
    return '';
  };

  const calculateProgressBar = () => {
    let succeededQuizzes;
    if (curriculumProgress) {
      succeededQuizzes = Object.keys(curriculumProgress).filter(
        key => curriculumProgress[key] === 'success',
      ).length;
    } else {
      succeededQuizzes = 0;
    }
    return [
      `${succeededQuizzes}/${data.quizzes.length}`,
      (succeededQuizzes * 100) / data.quizzes.length,
    ];
  };

  return (
    <Container className="mt-5 mb-3">
      <h2>This is Javascript</h2>
      <Row className="mt-3 mb-3">
        <Col md={12} lg={8}>
          <h5>Your Progress:</h5>
          <ProgressBar
            animated
            striped
            variant="success"
            label={calculateProgressBar()[0]}
            now={calculateProgressBar()[1]}
          />
        </Col>
      </Row>
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
