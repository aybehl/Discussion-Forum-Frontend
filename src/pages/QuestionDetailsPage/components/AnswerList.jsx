import AnswerDetails from "./AnswerDetails";
import { Box } from "@mui/material";

const AnswerList = ({ answers }) => {

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        flexDirection: "column",
      }}
    >
      {answers.map((answer) => <AnswerDetails key={answer.answerId} answer={answer}/>)}
    </Box>
  );
};

export default AnswerList;
