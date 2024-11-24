import { Action, createReducer, on } from "@ngrx/store";

import { IQuizzState } from './quizz.models';
import * as QuizzActions from './quizz.actions';

const initialState: IQuizzState = {
    quizzes: null,
    error: null,
    loaded: false,
    result: null,
};

const quizzReducer = createReducer(
    initialState,
    on(
        QuizzActions.getQuizzesAction,
        (state): IQuizzState => ({
            ...state
        })
    ),
    on(
        QuizzActions.getQuizzesSuccessAction,
        (state, action): IQuizzState => ({
            ...state,
            quizzes: action.quizzes,
            error: null,
            loaded: true
        })
    ),
    on(
        QuizzActions.getQuizzesFailureAction,
        (state, action): IQuizzState => ({
            ...state,
            quizzes: null,
            error: action.error,
            loaded: false
        })
    ),
    on(
        QuizzActions.setResultAction,
        (state, action): IQuizzState => ({
            ...state,
            result: action.result
        })
    ),
    on(
        QuizzActions.clearResultAction,
        (state): IQuizzState => ({
            ...state,
            result: null
        })
    ),
);

export function reducers(state: IQuizzState, action: Action) {
    return quizzReducer(state, action)
}
