import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCoffee,
    faDiceSix,
    faWandMagicSparkles,
    faXmark,
    faCheck,
    faChevronRight,
    faSquareCheck
} from "@fortawesome/free-solid-svg-icons";
import he from 'he';


function Game() {
    const [question, setQuestion] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
    const [congratulations, setCongratulations] = useState('');
    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [options, setOptions] = useState([]);
    const [answered, setAnswered] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const decodeHtmlEntities = (html) => {
        return he.decode(html);
    };

    const fetchRandomQuestion = async () => {
        try {
            setAnswered(false);
            setSelectedOption(null);
            const response = await fetch('https://opentdb.com/api.php?amount=1&type=multiple');
            const data = await response.json();
            const randomQuestion = decodeHtmlEntities(data.results[0].question);
            const correctAnswer = decodeHtmlEntities(data.results[0].correct_answer);
            const incorrectAnswers = data.results[0].incorrect_answers.map(decodeHtmlEntities);
            const options = [correctAnswer, ...incorrectAnswers];
            options.sort(() => Math.random() - 0.5);
            setQuestion(randomQuestion);
            setCorrectAnswer(correctAnswer);
            setOptions(options);
            setShowCorrectAnswer(false);
            setCongratulations('');
        } catch (error) {
            console.error('Error fetching question:', error);
        }
    };

    const checkAnswer = (selectedOption) => {
        if (!answered) {
            setSelectedOption(selectedOption);
            if (selectedOption.toLowerCase() === correctAnswer.toLowerCase()) {
                setCongratulations('Congratulations, correct answer !!!');
                setShowCorrectAnswer(false);
                setCorrectCount(correctCount + 1);
            } else {
                setShowCorrectAnswer(true);
                setCongratulations('');
                setIncorrectCount(incorrectCount + 1);
            }
            setAnswered(true);
        }
    };

    const getButtonColor = (option) => {
        if (answered) {
            if (option.toLowerCase() === correctAnswer.toLowerCase()) {
                return 'btn-correct';
            } else if (option === selectedOption) {
                return 'btn-wrong';
            }
        }
        return '';
    };


    const resetGame = () => {
        setCorrectCount(0);
        setIncorrectCount(0);
        fetchRandomQuestion();
    };

    const nextQuestion = () => {
        fetchRandomQuestion();
    };

    useEffect(() => {
        fetchRandomQuestion();
    }, []);

    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="container mb-5 ">
            <div className="text-center text-white">
                

                <h1 className="mt-4">
                    <FontAwesomeIcon icon={faWandMagicSparkles} /> Random Trivia Question
                </h1>

                <div className="question mt-4">
                    <p dangerouslySetInnerHTML={{ __html: question }}></p>
                </div>

                <div className="container3 mt-4">
                    <div className="options">
                        {options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => checkAnswer(option)}
                                disabled={answered}
                                className={`option-button btn btn-lg ${getButtonColor(option)}`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>


                    <div className="correct-answer mt-4"></div>

                    <div className="congratulations mt-4">
                        <p>{congratulations}</p>
                    </div>

                    <div className="points mt-4">
                        <p>
                            Correct: {correctCount}{' '}
                            <FontAwesomeIcon icon={faCheck} style={{ color: "#00a803" }} />
                        </p>
                        <p>
                            Incorrect: {incorrectCount}{' '}
                            <FontAwesomeIcon icon={faXmark} style={{ color: "#cc0000" }} />
                        </p>
                    </div>

                    <div className="next mt-4">
                        <button onClick={nextQuestion} className="btn btn-primary">
                            Next Question{' '}
                            <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
                        </button>
                    </div>

                    <button onClick={resetGame} className="reset btn btn-danger mt-4">
                        <FontAwesomeIcon icon={faDiceSix} className="dice mr-2" /> Reset Game
                    </button>

                    <div className="icon mt-4">
                        <FontAwesomeIcon icon={faCoffee} />
                    </div>
                </div>
            </div>
        </div>
        </div>
           
      
    );
}

export default Game;