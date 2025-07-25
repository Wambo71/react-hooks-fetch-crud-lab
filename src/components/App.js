import React, { useEffect, useState } from "react";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";
import AdminNavBar from "./AdminNavBar";

const API = "http://localhost:4000/questions";

function App() {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState("List");

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then(setQuestions);
  }, []);

  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function handleDelete(id) {
    fetch(`${API}/${id}`, {
      method: "DELETE",
    }).then(() => {
      setQuestions(questions.filter((q) => q.id !== id));
    });
  }

  function handleUpdate(id, correctIndex) {
    fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((res) => res.json())
      .then((updatedQuestion) => {
        setQuestions((prev) =>
          prev.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
        );
      });
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      )}
    </main>
  );
}

export default App;
