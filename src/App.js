import { useEffect, useState } from "react";

const apiUrl = "http://localhost:5000/questions";

function App() {
	const [questions, setQuestions] = useState([]);
	const [userAnswer, setUserAnswer] = useState(null);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [score, setScore] = useState(0);

	useEffect(() => {
		fetch(apiUrl)
			.then((res) => res.json())
			.then((data) => setQuestions(data));
	}, []);

	const handleAnswer = (index) => {
		setUserAnswer(index);
	};

	//TODO NextQuestion
	function handleNextQuestion() {
		if (userAnswer === null) {
			return;
		}
		setCurrentQuestion(currentQuestion + 1);

		//TODO correct answer score
		if (userAnswer === questions[currentQuestion].correctOption) {
			setScore(score + questions[currentQuestion].points);
		}
		setUserAnswer(null);
	}

	console.log(questions);
	if (questions.length === 0) {
		return <h1>I have no data!</h1>;
	}
	return (
		<div className="quiz-container">
			<h1>React Quiz</h1>
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
			<button onClick={handleNextQuestion}>Next Question</button>
		</div>
	);
}

export default App;
