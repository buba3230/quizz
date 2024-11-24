import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IQuizzState } from './quizz.models';
import { FEATURE_NAME } from "./quizz-actions-types";

export const quizzFeatureSelector = createFeatureSelector<
IQuizzState
>(FEATURE_NAME);

export const quizzessSelector = createSelector(
    quizzFeatureSelector,
    (quizzState: IQuizzState) => quizzState.quizzes
)

export const getQuizzByIdSelector = createSelector(
    quizzFeatureSelector,
    (quizzState: IQuizzState, id: number) => {
        return quizzState.quizzes?.filter(q => q.id === id)[0]
    }
)

export const errorSelector = createSelector(
    quizzFeatureSelector,
    (quizzState: IQuizzState) => quizzState.error
)

export const loadedSelector = createSelector(
    quizzFeatureSelector,
    (quizzState: IQuizzState) => quizzState.loaded
)

export const resultSelector = createSelector(
    quizzFeatureSelector,
    (quizzState: IQuizzState) => quizzState.result
)
