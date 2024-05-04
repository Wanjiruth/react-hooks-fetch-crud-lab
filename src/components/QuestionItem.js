// QuestionItem.js

import React from "react";

function QuestionItem({ question, onDelete }) {
  const { id, prompt, answers, correctIndex } = question;

  const handleDelete = () => {
    // Make a DELETE request to the server
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // If deletion is successful, call the onDelete callback to remove the question from UI
          onDelete(id);
          console.log("Question deleted successfully");
        } else {
          throw new Error("Failed to delete question");
        }
      })
      .catch((error) => console.error("Error deleting question:", error));
  };

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
