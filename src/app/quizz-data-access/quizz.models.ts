export interface IQuizzResponseResult {
    category: string;
    difficulty: string;
    type: string;
    question: string;
    correct_answer: string | number;
    incorrect_answers: (string | number)[],
    allAnswers: (string | number)[]
}

export interface MappedQuizzQuestions {
    id: number;
    category: string;
    questions: IQuizzResponseResult[];
}

export interface IQuizzResponse {
    response_code: number;
    results: IQuizzResponseResult[]
}

export interface IGroupedQuizz {
    [key: string]: IQuizzResponseResult[];
}

export interface IQuizzState {
    quizzes: MappedQuizzQuestions[] | null;
    error: string | null;
    loaded: boolean;
    result: IAnswers | null;
}

export interface IQuizzDataSource {
    id: number;
    quizz: string,
    count: number,
}

export interface IAnswers {
    time: string;
    points: number;
    answers: IAnsweredQuestions[];
}

export interface IAnsweredQuestions {
    id: number;
    question: string;
    selectedAnswer: string | number;
    correct_answer: string | number;
    time: string;
    timeElapsed: number;
    status: boolean;
}
