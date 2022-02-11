export type FireBaseErrorMessage = {
  errMessage: string;
};

export type AddQuizScore = {
  userID: string | undefined;
  score: number;
  quizName: string;
};

export type GetQuizNames = {
  uid: string;
  quizName: string;
  imageUrl: string;
};

export type Options = {
  isRight: boolean;
  text: string;
};
export type QuizQuestions = {
  uid: string;
  negativePoints: number;
  options: Options[];
  positivePoints: number;
  text: string;
};

export type UserQuizScore = {
  uid: string;
  slNo: number;
  score: string;
  playTime: any;
  quizName: string;
};
