import { useState } from "react";
import OneQuestion from "./oneQuestion";

export default function QuestionPage({
  triviaQuestions,
  correctAnswerBank,
  shuffleButtons,
}) {
  const [index, setIndex] = useState(0);

  return (
    <>
      <Index index={index} />

      <OneQuestion
        index={index}
        questions={triviaQuestions}
        setIndex={() => setIndex(index + 1)}
        correctAnswerBank={correctAnswerBank}
        shuffleButtons={shuffleButtons}
      />
    </>
  );
}

const Index = ({ index }) => {
  return <></>;
};
