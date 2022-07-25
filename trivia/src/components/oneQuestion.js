import { useState, useEffect } from "react";
import he from "he";
import Categories from "./categories";

export default function OneQuestion({
  index,
  questions,
  correctAnswerBank,
  setIndex,
  shuffleButtons,
}) {
  // console.log(index, questions)
  const currentQuestion = questions[index];
  const [answered, setAnswered] = useState(true);
  const [userAnswerBank, setUserAnswerBank] = useState([]);
  const [correct, setCorrect] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const [nextButton, setNextButton] = useState(true);
  const [shuffled, setShuffled] = useState(false);
  const [possibleAnswers, setPossibleAnswers] = useState([]);
  const [rightCount, setRightCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  const handleUserAnswer = (props) => {
    let userAnswer = props;
    let temporaryBank = userAnswerBank.concat(userAnswer);
    setUserAnswerBank(temporaryBank);
    seeIfCorrect(userAnswer);
  };

  const handleNext = () => {
    setCorrect(false);
    setIncorrect(false);
    setIndex();
  };

  const seeIfCorrect = (userAnswer) => {
    if (userAnswer === currentQuestion.correct_answer) {
      setCorrect(true);
      setRightCount(rightCount + 1);
    } else {
      setIncorrect(true);
      setWrongCount(wrongCount + 1);
    }
  };

  shuffleButtons();

  return (
    <div className="card">
      <br />
      {currentQuestion && (
        <div className="question" key={currentQuestion.question}>
          {he.decode(currentQuestion.question)}

          {possibleAnswers && !answered ? (
            ""
          ) : (
            <div>
              {" "}
              <BuildAnswerBank
                currentQuestion={currentQuestion}
                handleUserAnswer={handleUserAnswer}
                setPossibleAnswers={() => setPossibleAnswers(possibleAnswers)}
              />{" "}
            </div>
          )}
        </div>
      )}

      <div className="result">
        {correct ? "You chose the correct answer!" : ""}
      </div>

      {incorrect ? (
        <div className="result">
          Sorry the correct answer was:{" "}
          {he.decode(currentQuestion.correct_answer)}
        </div>
      ) : (
        ""
      )}
      <br />
      <br />
      <div className="nextButton">
        <QuestionCount
          questionCount={index + 1}
          correctAnswerBank={correctAnswerBank}
          handleNext={handleNext}
          userAnswerBank={userAnswerBank}
        />
      </div>
      <div>
        <Count
          rightCount={rightCount}
          wrongCount={wrongCount}
          correctAnswerBank={correctAnswerBank}
        />
      </div>
    </div>
  );
}

const QuestionCount = ({
  questionCount,
  correctAnswerBank,
  setNextButton,
  nextButton,
  handleNext,
  userAnswerBank,
  settleScore,
}) => {
  let totalQuestions = correctAnswerBank.length;

  if (userAnswerBank.length === totalQuestions) {
    return (
      <>
        <FinalPage
          userAnswerBank={userAnswerBank}
          correctAnswerBank={correctAnswerBank}
        />
      </>
    );
  }

  if (questionCount === totalQuestions) {
    return <div>Final Question</div>;
  } else {
    return (
      <div>
        {" "}
        Question {questionCount} out of {totalQuestions}
        {!nextButton ? (
          <button onClick={() => handleNext()}> Next question </button>
        ) : (
          "final"
        )}
      </div>
    );
  }
};

const FinalPage = ({ userAnswerBank, correctAnswerBank }) => {
  const startOver = () => {
    document.location.reload();
  };
  return (
    <div className="finalAnswers">
      <div>
        <strong>
          <p>Your Answers</p>
        </strong>
        {userAnswerBank.map((answer) => (
          <li key={answer}>{answer}</li>
        ))}
      </div>
      <div>
        <strong>
          <p>Correct Answers</p>
        </strong>{" "}
        {correctAnswerBank.map((answer) => (
          <li key={answer}>{answer}</li>
        ))}
        <button onClick={() => startOver()}>Start Over</button>
      </div>
    </div>
  );
};

const BuildAnswerBank = ({
  currentQuestion,
  handleUserAnswer,
  possibleAnswers,
  setPossibleAnswers,
}) => {
  let correct = currentQuestion.correct_answer;
  let incorrects = currentQuestion.incorrect_answers;
  possibleAnswers = [];
  possibleAnswers = possibleAnswers.concat(correct);
  possibleAnswers = possibleAnswers.concat(incorrects);
  setPossibleAnswers(possibleAnswers);
  return (
    <>
      <div className="buttons" key={currentQuestion.correct_answer}>
        <div
          className="answerButton"
          onClick={(e) => handleUserAnswer(e.target.textContent)}
          key={currentQuestion.correct_answer}
        >
          {he.decode(currentQuestion.correct_answer)}
        </div>
        {currentQuestion.incorrect_answers.map((answer) => (
          <div
            className="answerButton"
            onClick={(e) => handleUserAnswer(e.target.textContent)}
            key={answer}
          >
            {he.decode(answer)}
          </div>
        ))}
      </div>
    </>
  );
};

const Count = ({ rightCount, wrongCount, correctAnswerBank }) => {
  let total = correctAnswerBank.length;
  return (
    <>
      <div>
        Right: {rightCount}/{total}
      </div>
      <div>
        Wrong: {wrongCount}/{total}
      </div>
    </>
  );
};
