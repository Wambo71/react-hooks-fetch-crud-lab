import React from "react";

function QuestionList({ questions, onDelete, onUpdate }) {
  return (
    <section>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <h4>{question.prompt}</h4>
            <ul>
              {question.answers.map((answer, index) => (
                <li key={index}>
                  {answer}{" "}
                  {index === question.correctIndex && <strong>(Correct)</strong>}
                </li>
              ))}
            </ul>

            <label>
              Change Correct Answer:
              <select
                value={question.correctIndex}
                onChange={(e) => onUpdate(question.id, parseInt(e.target.value))}
              >
                {question.answers.map((answer, index) => (
                  <option key={index} value={index}>
                    {answer}
                  </option>
                ))}
              </select>
            </label>

            <button onClick={() => onDelete(question.id)}>Delete Question</button>
            <hr />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
