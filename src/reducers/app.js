import {
  ADD_MESSAGE,
  SET_CURRENT_USERID,
  ADD_HISTORY,
  ADD_USER,
  REMOVE_USER,
  ADD_TYPING_USER,
  REMOVE_TYPING_USER,
  SYNC_VOTES,
  ADD_VOTE,
} from '../constants';
import { fromJS } from 'immutable';
import update from 'immutability-helper';

const INITIAL_STATE = fromJS({
  userID: 0,
  messages: [],
  lastMessageTimestamp: null,
  users: [],
  usersTyping: [],
  votes: [],
  songs: [
    {
      name: 'Get Lucky',
      albumName: 'Random Access Memories',
      albumImageUrl: 'https://i.scdn.co/image/405ee050d1976448c600cb9648e491e31ef87aed',
      numVotes: 0,
    },
    {
      name: 'One More Time',
      albumName: 'Discovery',
      albumImageUrl: 'https://i.scdn.co/image/f04bb6fba32e89475d9981007aff21e13745dec2',
      numVotes: 0,
    },
    {
      name: 'Instant Crush',
      albumName: 'Random Access Memories',
      albumImageUrl: 'https://i.scdn.co/image/405ee050d1976448c600cb9648e491e31ef87aed',
      numVotes: 0,
    },
    {
      name: 'Lose Yourself To Dance',
      albumName: 'Random Access Memories',
      albumImageUrl: 'https://i.scdn.co/image/405ee050d1976448c600cb9648e491e31ef87aed',
      numVotes: 0,
    },
    {
      name: 'Around The World',
      albumName: 'Homework',
      albumImageUrl: 'https://i.scdn.co/image/405ee050d1976448c600cb9648e491e31ef87aed',
      numVotes: 0,
    },
    {
      name: 'Doin\' It Right',
      albumName: 'Homework',
      albumImageUrl: 'https://i.scdn.co/image/405ee050d1976448c600cb9648e491e31ef87aed',
      numVotes: 0,
    },
    {
      name: 'Harder Better Faster Stronger',
      albumName: 'Discovery',
      albumImageUrl: 'https://i.scdn.co/image/f04bb6fba32e89475d9981007aff21e13745dec2',
      numVotes: 0,
    },
    {
      name: 'Something About Us',
      albumName: 'Discovery',
      albumImageUrl: 'https://i.scdn.co/image/2dacea257e8de9b0f263b9ffebf714b15a07181f',
      numVotes: 0,
    },
    {
      name: 'Give Life Back to Music',
      albumName: 'Random Access Memories',
      albumImageUrl: 'https://i.scdn.co/image/405ee050d1976448c600cb9648e491e31ef87aed',
      numVotes: 0,
    },
  ],
});

function appReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
  case SET_CURRENT_USERID:
    return state.update('userID', () => action.payload);
  case ADD_MESSAGE:
    return state.update('messages', (messages) => messages.concat(action.payload));
  case ADD_VOTE:
    return state
      .update('votes', (votes) => votes.concat(action.payload))
      .update('songs', list => {
        return list.update(
          list.findIndex(item =>
            item.get('name') === action.payload.vote.vote),
            item => item.set('numVotes', item.get('numVotes') + 1
          )
        );
      })
  case ADD_HISTORY:
    return state
      .update('messages', (messages) => messages.unshift(...action.payload.messages))
      .update('lastMessageTimestamp', () => action.payload.timestamp);
  case SYNC_VOTES:
    return state
      .update('votes', (votes) => votes.unshift(...action.payload.votes))
      .update('songs', list => {
        let newList = list.map(item => {
          return item.set('numVotes', _.filter(action.payload.votes, function(v) {
            if (v.vote === item.get('name')) {
              return v;
            }
          }).length)
        });
        return newList;
      });
  case ADD_USER:
    return state
      .update('users', (users) => (users.indexOf(action.payload) >= 0 ? users : users.concat(action.payload)));
  case REMOVE_USER:
    return state
      .update('users', (users) => users.filter((userID) => userID !== action.payload));
  case ADD_TYPING_USER:
    return state
      .update('usersTyping', (users) => (users.indexOf(action.payload) >= 0 ? users : users.concat(action.payload)));
  case REMOVE_TYPING_USER:
    return state
      .update('usersTyping', (users) => users.filter((userID) => userID !== action.payload));
  default:
    return state;
  }
}

export default appReducer;
