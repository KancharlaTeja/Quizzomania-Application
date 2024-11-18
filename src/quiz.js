import React, { useState } from "react";
import "./quiz.css"; 
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import End from './end';

function Quiz() {
  const { email } = useParams();
 const navigate = useNavigate();
  // State variables for questions, selected option, current question index, score, and message
  const questionsData = [
    {
      question: "What is the capital of France?",
      options: ["London", "Paris", "Berlin", "Rome"],
      correctAnswer: "Paris"
    },
    {
      question: "What is the currency of Japan?",
      options: ["Yen", "Dollar", "Euro", "Pound"],
      correctAnswer: "Yen"
     },
    {
      question: "Who wrote 'To Kill a Mockingbird'?",
      options: ["Harper Lee", "J.K. Rowling", "Charles Dickens", "Jane Austen"],
      correctAnswer: "Harper Lee"
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Mars", "Venus", "Jupiter", "Saturn"],
      correctAnswer: "Mars"
    },
    {
      question: "Who is the author of 'The Great Gatsby'?",
      options: ["F. Scott Fitzgerald", "Ernest Hemingway", "William Faulkner", "Mark Twain"],
      correctAnswer: "F. Scott Fitzgerald"
    },
    {
      question: "What is the chemical symbol for water?",
      options: ["H2O", "CO2", "O2", "N2"],
      correctAnswer: "H2O"
    },
    {
      question: "Who discovered penicillin?",
      options: ["Alexander Fleming", "Louis Pasteur", "Marie Curie", "Albert Einstein"],
      correctAnswer: "Alexander Fleming"
    },
    {
      question: "What is the tallest mammal?",
      options: ["Giraffe", "Elephant", "Hippo", "Rhino"],
      correctAnswer: "Giraffe"
    },
    {
      question: "Who painted the Mona Lisa?",
      options: ["Leonardo da Vinci", "Michelangelo", "Raphael", "Donatello"],
      correctAnswer: "Leonardo da Vinci"
    },
    {
      question: "Which ocean is the largest?",
      options: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
      correctAnswer: "Pacific Ocean"
     }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(0);

  // Function to handle option selection
  function handleOptionSelect(option) {
    setSelectedOptions(prev => ({
      ...prev,
      [currentQuestionIndex]: option
    }));
  }

  // Function to handle "Next" button click
  function handleNext() {
    if (selectedOptions[currentQuestionIndex] === questionsData[currentQuestionIndex].correctAnswer) {
      setScore(prevScore => prevScore + 1); // Increase score if the answer is correct
    }
    if (currentQuestionIndex + 1 < questionsData.length) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1); // Move to the next question
    }
  }

  // Function to handle "Previous" button click
  function handlePrevious() {
    setCurrentQuestionIndex(prevIndex => Math.max(prevIndex - 1, 0)); // Move to the previous question
  }

  // Function to handle "Submit" button click
  async function handleSubmit() {
    if (Object.keys(selectedOptions).length !== questionsData.length) {
      alert("Please attempt all questions before submitting.");
      return;
    }
  
    let finalScore = 0;
    questionsData.forEach((question, index) => {
      if (selectedOptions[index] === question.correctAnswer) {
        finalScore += 1;
      }
    });
  
    try {
      const response = await axios.post('http://localhost:8000/task', { email, finalScore });
      const responseData = response.data;
      console.log(responseData)
      if (responseData && responseData.status === 'success') {
        navigate(`/End/${email}`)
        
        //alert(`You successfully completed the test! Your score is: ${finalScore}/${questionsData.length}`);
      } else if (responseData==='error'){
        alert("Error: " + (responseData.error || "Unknown error"));
      }
    } catch (error) {
      console.error('Error submitting the test:', error);
      alert('There was an error submitting the test. Please try again.');
    }
  }

  // Get current question data
  const currentQuestionData = questionsData[currentQuestionIndex];

  return (
    <>
      <div className="question-container">
        {/* Display the current question */}
        <h1>{currentQuestionData.question}</h1>

        {/* Render MCQ options for the current question */}
        <div className="options-container">
          {currentQuestionData.options.map((option, index) => (
            <label key={index}>
              <input
                type="radio"
                value={option}
                checked={selectedOptions[currentQuestionIndex] === option}
                onChange={() => handleOptionSelect(option)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>
      <div className="button-container">
        <button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>Previous</button>
        <span style={{ margin: "0 10px" }}></span>
        {currentQuestionIndex === questionsData.length - 1 ? (
          <button onClick={handleSubmit}>Submit</button>
        ) : (
          <button onClick={handleNext} disabled={!selectedOptions.hasOwnProperty(currentQuestionIndex)}>Next</button>
        )}
      </div>
    </>
  );
}

export default Quiz;
