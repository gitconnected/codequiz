import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import data from '../../../data/javascript/index.json';

const Javascript = () => {
  return (
    <Container>
      <h2>This is Javascript</h2>
      <div>
        {data.quizzes.map(quizz => (
          <div key={quizz.key}>
            <Link to={`javascript/${quizz.key}`}>{quizz.title}</Link>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Javascript;
