export type Quiz = {
  name: string;
  questions: Question[];
};

export type Question = {
  title: string;
  answers: Answer[];
};

export type Answer = {
  title: string;
  isCorrect?: boolean;
};
