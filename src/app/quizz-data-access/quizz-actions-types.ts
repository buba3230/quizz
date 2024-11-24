export const FEATURE_NAME = 'QUIZZ';

export enum QuizzActionsType {
    GET_QUIZZES = `[${FEATURE_NAME}] get guizzes`,
    GET_QUIZZES_SUCCESS = `[${FEATURE_NAME}] get guizzes success`,
    GET_QUIZZES_FAILURE = `[${FEATURE_NAME}] get guizzes failure`,
    SET_RESULT = `[${FEATURE_NAME}] set result`,
    CLEAR_RESULT = `[${FEATURE_NAME}] clear result`,
}
