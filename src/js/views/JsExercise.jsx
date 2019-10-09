import React, { useEffect, useState } from 'react';
import Prism from 'prismjs';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Question from '../components/JavaScriptQuestion';
import JsList from '../../../data/javascript/index.json';

const JsExercise = ({ match }) => {
  const [data, setData] = useState({});
  const [userAnswer, setUserAnswer] = useState('');
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState('');
  const [nextQuestion, setNextQuestion] = useState({});

  const onSubmit = e => {
    e.preventDefault();
    let curriculumProgress = JSON.parse(
      localStorage.getItem('curriculumProgress'),
    );
    if (userAnswer === data.correctAnswer) {
      setResult('success');
      curriculumProgress = { ...curriculumProgress, [data.key]: 'success' };
    } else {
      setResult('fail');
      curriculumProgress = { ...curriculumProgress, [data.key]: 'fail' };
    }
    localStorage.setItem(
      'curriculumProgress',
      JSON.stringify(curriculumProgress),
    );
    console.log(curriculumProgress);
  };

  const handleOnChange = e => {
    setUserAnswer(e.target.value);
  };

  useEffect(() => {
    /* if we have move to a new exercise, match object from react router will be different,
       so we can trigger a clean up of the state */
    setResult('');
    setUserAnswer('');
  }, [match]);

  useEffect(() => {
    // Find the index of the current question in the list
    const indexCurrent = JsList.quizzes.findIndex(q => {
      return q.title === data.title;
    });
    // check if there is a next question, and update state
    if (indexCurrent >= 0 && JsList.quizzes.length > indexCurrent + 1) {
      setNextQuestion(JsList.quizzes[indexCurrent + 1]);
    } else if (indexCurrent >= 0 && JsList.quizzes.length <= indexCurrent + 1) {
      setNextQuestion({});
    }
  }, [data, match]);

  Prism.highlightAll();
  useEffect(() => {
    import(`../../../data/javascript/${match.params.exercise}/index.json`).then(
      json => {
        setData(json);
      },
    );
    import(
      `!raw-loader! ../../../data/javascript/${match.params.exercise}/question.js`
    ).then(js => {
      setQuestion(js.default);
      Prism.highlightAll();
    });
  }, [match]);

  return (
    <Container className="mt-5 mb-3">
      <h2>{data.title}</h2>
      <p>{data.description}</p>
      <Question question={question} />
      <Row>
        <Col xs={12} md={6} className="mt-5 mb-3">
          <Form action="">
            {data.answers &&
              data.answers.map((a, index) => {
                return (
                  <div key={index}>
                    <Form.Check
                      inline
                      label={a.answer}
                      onChange={handleOnChange}
                      type="radio"
                      name="answer"
                      value={a.answer}
                      checked={a.answer === userAnswer}
                      disabled={result !== ''}
                    />
                    <br />
                  </div>
                );
              })}
            {userAnswer !== '' && !result && (
              <Button className="mt-2" type="submit" onClick={onSubmit}>
                Check Yourself
              </Button>
            )}
          </Form>
        </Col>
        <Col xs={12} md={6} className="mt-5 mb-3">
          {result === 'success' && (
            <Alert variant="success">Right Answer!</Alert>
          )}
          {result === 'fail' && (
            <Alert variant="warning">
              Sorry, Wrong Answer! The right answer was:{' '}
              <strong style={{ fontWeight: 700 }}>{data.correctAnswer}</strong>
            </Alert>
          )}
          {nextQuestion.key && result && (
            <div>
              <p>Next Question: </p>
              <LinkContainer to={`/javascript/${nextQuestion.key}`}>
                <Button>{nextQuestion.title}</Button>
              </LinkContainer>
            </div>
          )}
        </Col>
      </Row>
      {result && (
        <Row className="mt-5 mb-3">
          <Col>
            <h5>Explanation:</h5>
            <p>{data.explanation}</p>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default JsExercise;
