import { createAction, props } from "@ngrx/store";

import { QuizzActionsType } from './quizz-actions-types';

import { MappedQuizzQuestions, IAnswers } from './quizz.models';

export const getQuizzesAction = createAction(
    QuizzActionsType.GET_QUIZZES
);

export const getQuizzesSuccessAction = createAction(
    QuizzActionsType.GET_QUIZZES_SUCCESS,
    props<{ quizzes: MappedQuizzQuestions[] }>()
);

export const getQuizzesFailureAction = createAction(
    QuizzActionsType.GET_QUIZZES_FAILURE,
    props<{ error: string }>()
);

export const setResultAction = createAction(
    QuizzActionsType.SET_RESULT,
    props<{ result: IAnswers }>()
)

export const clearResultAction = createAction(
    QuizzActionsType.CLEAR_RESULT
)
