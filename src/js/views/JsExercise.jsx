import React, { useEffect, useState } from 'react';
import Prism from 'prismjs';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

import Question from '../components/JavaScriptQuestion';
import JsList from '../../../data/javascript/index.json';

const JsExercise = ({ match }) => {
  const [data, setData] = useState({});
  const [userAnswer, setUserAnswer] = useState('');
  const [question, setQuestion] = useState('const a = "loading";');
  const [result, setResult] = useState('');
  const [nextQuestion, setNextQuestion] = useState({});

  console.log('match', match);

  const onSubmit = e => {
    e.preventDefault();

    if (userAnswer === data.correctAnswer) {
      setResult('success');
    } else {
      setResult('fail');
    }
  };

  const handleOnChange = e => {
    setUserAnswer(e.target.value);
  };

  useEffect(() => {
    const index = JsList.quizzes.findIndex(q => {
      return q.title === data.title;
    });
    console.log('JsList', JsList);
    if (index >= 0 && JsList.quizzes.length > index + 1) {
      setNextQuestion(JsList.quizzes[index + 1]);
    }
    console.log('nextQuestion', nextQuestion);
  }, [data]);

  Prism.highlightAll();
  useEffect(() => {
    import(`../../../data/javascript/${match.params.exercise}/index.json`).then(
      json => {
        setData(json);
        console.log(json);
      },
    );
    import(
      `!raw-loader! ../../../data/javascript/${match.params.exercise}/question.js`
    ).then(js => {
      setQuestion(js.default);
      Prism.highlightAll();
      console.log('line 20', js.default, typeof js.default);
    });
  }, []);

  return (
    <Container className="mt-5 mb-3">
      <h2>{data.title}</h2>
      <Question question={question} />
      <Form className="mt-5 mb-3" action="">
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
                />
                <br />
              </div>
            );
          })}
        <Button className="mt-2" type="submit" onClick={onSubmit}>
          Check
        </Button>
      </Form>
      {result === 'success' && <Alert variant="success">Right Answer!</Alert>}
      {result === 'fail' && (
        <Alert variant="warning">Sorry, Wrong Answer!</Alert>
      )}
      {nextQuestion.key && (
        <div>
          <LinkContainer to="plus-operator-coercion">
            <Button>{nextQuestion.title}</Button>
          </LinkContainer>
          <Link to="/javascript/simple-add">{nextQuestion.title}</Link>
        </div>
      )}
    </Container>
  );
};

export default JsExercise;
