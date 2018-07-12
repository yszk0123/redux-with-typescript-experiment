import { Reducer } from 'redux';
import { ActionType, createStandardAction, getType } from 'typesafe-actions';
import { HandlerMap } from './types';

// State

export interface UserState {
  isLoading: boolean;
  data?: any;
}

// Action

export const UserAction = {
  signUp: createStandardAction('user/SIGN_UP')<{
    id: number;
    username: string;
  }>(),
  signIn: createStandardAction('user/SIGN_IN')<{
    username: string;
  }>(),
  signOut: createStandardAction('user/SIGN_OUT')<void>()
};

export type UserAction = ActionType<typeof UserAction>;

export type UserHandler = HandlerMap<typeof UserAction>;

// Reducer

export const userReducer: Reducer<UserState, UserAction> = (
  state = {
    isLoading: false
  },
  action
) => {
  switch (action.type) {
    case getType(UserAction.signUp):
      return {
        ...state,
        data: action.payload
      };
    case getType(UserAction.signOut):
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};
