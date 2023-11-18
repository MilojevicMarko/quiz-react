import { useEffect, useState } from "react";

const apiUrl = "http://localhost:5000/questions";

function App() {
	const [questions, setQuestions] = useState([]);

	useEffect(() => {
		fetch(apiUrl)
			.then((res) => res.json())
			.then((data) => setQuestions(data));
	}, []);
	console.log(questions);
	if (questions.length === 0) {
		return <h1>I have no data!</h1>;
	}
	return (
		<div className="quiz-container">
			<h1>React Quiz</h1>
			<div className="question-container">
				<p>{questions[0].question}</p>
				<div className="options-container">
					{questions[0].options.map((answer, index) => {
						return (
							<button type="Submit" key={index}>
								{answer}
							</button>
						);
					})}
				</div>
			</div>
			<button>Next Question</button>
		</div>
	);
}

export default App;
