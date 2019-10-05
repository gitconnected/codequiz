import React, { useEffect, useState } from 'react';
import Prism from 'prismjs';
import { Button, Container } from 'react-bootstrap';

const JsExercise = ({ match }) => {
  const [data, setData] = useState({});
  const [question, setQuestion] = useState('const a = "loading";');
  console.log(match);
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

  const onChange = () => {
    console.log('changed!');
  };
  return (
    <Container>
      <h2>{data.title}</h2>
      <div className="code-container">
        <div className="traffic traffic_red" />
        <div className="traffic traffic_yellow" />
        <div className="traffic traffic_green" />
        <pre>
          <code className="language-javascript">{question}</code>
        </pre>
      </div>
      <form action="">
        {data.answers &&
          data.answers.map((a, index) => {
            return (
              <div key={index}>
                <input
                  onChange={onChange}
                  type="radio"
                  name="answer"
                  value={a.answer}
                />
                {a.answer}
                <br />
              </div>
            );
          })}
        <Button type="submit">Primary</Button>
      </form>
    </Container>
  );
};

export default JsExercise;
