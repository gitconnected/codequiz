import React from 'react';

const Question = ({ question }) => {
  return (
    <div className="code-container">
      <div className="traffic traffic_red" />
      <div className="traffic traffic_yellow" />
      <div className="traffic traffic_green" />
      <pre>
        <code className="language-javascript">{question}</code>
      </pre>
    </div>
  );
};

export default Question;
