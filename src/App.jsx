import { useEffect, useState } from "react";
import Button from "./Button";

const apiUrl = "http://localhost:5000/questions";

function App() {
	const [questions, setQuestions] = useState([]);
	const [userAnswer, setUserAnswer] = useState(null);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [score, setScore] = useState(0);
	const [endGame, setEndGame] = useState(false);
	// const question = questions[currentQuestion];

	useEffect(() => {
		fetch(apiUrl)
			.then((res) => res.json())
			.then((data) => setQuestions(data));
	}, []);
	console.log(questions);

	const handleAnswer = (index) => {
		setUserAnswer(index);
	};

	//TODO NextQuestion
	function handleNextQuestion() {
		if (userAnswer === null) {
			return;
		}
		if (currentQuestion < questions.length - 1) {
			setCurrentQuestion(currentQuestion + 1);
		} else {
			setEndGame(true);
		}

		//TODO correct answer score
		if (userAnswer === questions[currentQuestion].correctOption) {
			setScore(score + questions[currentQuestion].points);
		}
		setUserAnswer(null);
	}
	//TODO No Question from Api
	if (questions.length === 0) {
		return <h1>I have no data!</h1>;
	}
	const resetGame = () => {
		setUserAnswer(null);
		setCurrentQuestion(0);
		setScore(0);
		setEndGame(false);
	};
	return (
		<div className="quiz-container">
			<h1>React Quiz</h1>

			{endGame ? (
				<h1>You score is {score}</h1>
			) : (
				<div className="question-container">
					<p>{questions[currentQuestion].question}</p>
					<p>
						Question {currentQuestion + 1} od {questions.length}
					</p>
					<p>Score : {score}</p>
					<div className="options-container">
						{questions[currentQuestion].options.map((answer, index) => {
							return (
								<button
									type="Submit"
									className={userAnswer === index ? "selected" : ""}
									key={index}
									onClick={() => {
										handleAnswer(index);
									}}
									id={index}>
									{answer}
								</button>
							);
						})}
					</div>
				</div>
			)}

			{/* <button onClick={handleNextQuestion}>Next Question</button> */}
			<Button onClick={endGame ? resetGame : handleNextQuestion}>
				{endGame ? "Reset Game" : "Click for next Question"}
			</Button>
		</div>
	);
}

export default App;
