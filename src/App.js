const apiUrl = "http://localhost:5000/questions";

function App() {
	return (
		<div className="quiz-container">
			<h1>React Quiz</h1>
			<div className="question-container">
				<p>PITANJE</p>
				<div className="options-container">PONUDJENI ODGOVORI</div>
			</div>
			<button>Next Question</button>
		</div>
	);
}

export default App;
