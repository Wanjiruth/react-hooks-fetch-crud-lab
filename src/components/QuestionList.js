// QuestionList.js

import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  const handleDeleteQuestion = (deletedId) => {
    // Filter out the deleted question from the state
    const updatedQuestions = questions.filter((question) => question.id !== deletedId);
    setQuestions(updatedQuestions);
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem key={question.id} question={question} onDelete={handleDeleteQuestion} />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
