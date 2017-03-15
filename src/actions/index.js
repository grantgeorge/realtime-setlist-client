import {
  ADD_MESSAGE,
  ADD_VOTE,
  SET_CURRENT_USERID,
  ADD_HISTORY,
  ADD_USER,
  REMOVE_USER,
  ADD_TYPING_USER,
  REMOVE_TYPING_USER,
  SYNC_VOTES,
} from '../constants';

export function setCurrentUserID(userID) {
  return {
    type: SET_CURRENT_USERID,
    payload: userID,
  };
}

export function addVote(vote) {
  return {
    type: ADD_VOTE,
    payload: {
      vote,
    },
  };
}

export function addMessage(message) {
  return {
    type: ADD_MESSAGE,
    payload: message,
  };
}

export function addHistory(messages, timestamp) {
  return {
    type: ADD_HISTORY,
    payload: {
      messages,
      timestamp,
    },
  };
}

export function addUser(userID) {
  return {
    type: ADD_USER,
    payload: userID,
  };
}

export function removeUser(userID) {
  return {
    type: REMOVE_USER,
    payload: userID,
  };
}

export function addTypingUser(userID) {
  return {
    type: ADD_TYPING_USER,
    payload: userID,
  };
}

export function removeTypingUser(userID) {
  return {
    type: REMOVE_TYPING_USER,
    payload: userID,
  };
}

export function syncVotes(votes) {
  return {
    type: SYNC_VOTES,
    payload: {
      votes,
    },
  };
}
