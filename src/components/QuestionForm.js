import React, { useState } from "react";

function QuestionForm(props) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "answers") {
      const updatedAnswers = formData.answers.map((answer, index) =>
        index.toString() === value ? event.target.value : answer
      );
      setFormData({ ...formData, answers: updatedAnswers });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Optionally, you can handle the response here
        console.log("New question created:", data);
        // Reset the form after submission
        setFormData({
          prompt: "",
          answers: ["", "", "", ""],
          correctIndex: 0,
        });
      })
      .catch((error) => console.error("Error creating question:", error));
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
          />
        </label>
        <br />
        {[0, 1, 2, 3].map((index) => (
          <label key={index}>
            Answer {index + 1}:
            <input
              type="text"
              name="answers"
              value={formData.answers[index]}
              onChange={handleChange}
              data-index={index}
            />
          </label>
        ))}
        <br />
        <label>
          Correct Answer:
          {formData.answers.map((answer, index) => (
            <label key={index}>
              <input
                type="radio"
                name="correctIndex"
                value={index}
                checked={formData.correctIndex.toString() === index.toString()}
                onChange={handleChange}
              />
              {` ${index + 1}`}
            </label>
          ))}
        </label>
        <br />
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;