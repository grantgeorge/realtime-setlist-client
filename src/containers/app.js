import React from 'react';
import { connect } from 'react-redux';
import ChatUsers from '../components/ChatUsers';
import PollVote from '../components/PollVote';
import {
  setCurrentUserID,
  addMessage,
  addVote,
  addHistory,
  syncVotes,
  addUser,
  removeUser,
  addTypingUser,
  removeTypingUser,
} from '../actions';

function mapStateToProps(state) {
  return {
    history: state.app.get('messages').toJS(),
    userID: state.app.get('userID'),
    lastMessageTimestamp: state.app.get('lastMessageTimestamp'),
    users: state.app.get('users').toJS(),
    usersTyping: state.app.get('usersTyping').toJS(),
    songs: state.app.get('songs').toJS(),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addMessage: (message) => dispatch(addMessage(message)),
    addVote: (song) => dispatch(addVote(song)),
    setUserID: (userID) => dispatch(setCurrentUserID(userID)),
    addHistory: (messages, timestamp) => dispatch(addHistory(messages, timestamp)),
    addUser: (userID) => dispatch(addUser(userID)),
    removeUser: (userID) => dispatch(removeUser(userID)),
    addTypingUser: (userID) => dispatch(addTypingUser(userID)),
    removeTypingUser: (userID) => dispatch(removeTypingUser(userID)),
    syncVotes: (votes) => dispatch(syncVotes(votes)),
  };
}

class App extends React.Component {
  static propTypes = {
    history: React.PropTypes.array,
    userID: React.PropTypes.number,
    addMessage: React.PropTypes.func,
    addVote: React.PropTypes.func,
    setUserID: React.PropTypes.func,
    addHistory: React.PropTypes.func,
    lastMessageTimestamp: React.PropTypes.string,
    users: React.PropTypes.array,
    addUser: React.PropTypes.func,
    removeUser: React.PropTypes.func,
    usersTyping: React.PropTypes.array,
    addTypingUser: React.PropTypes.func,
    removeTypingUser: React.PropTypes.func,
    songs: React.PropTypes.array,
  };

  componentDidMount() {
    const ID = Math.round(Math.random() * 1000000);
    this.props.setUserID(ID);
    this.PubNub = PUBNUB.init({
      publish_key: 'pub-c-8d6fe046-203a-488e-b7d5-972d599556a6',
      subscribe_key: 'sub-c-525db198-0950-11e7-afb0-0619f8945a4f',
      ssl: (location.protocol.toLowerCase() === 'https:'),
      uuid: ID,
    });
    this.PubNub.subscribe({
      channel: 'set-list-votes-beta',
      message: this.props.addVote
    });
    this.fetchVotes();
    // this.fetchHistory();
    window.addEventListener('beforeunload', this.leaveChat);
  }

  componentWillUnmount() {
    this.leaveChat();
  }

  onPresenceChange = (presenceData) => {
    switch (presenceData.action) {
    case 'join':
      this.props.addUser(presenceData.uuid);
      break;
    case 'leave':
    case 'timeout':
      this.props.removeUser(presenceData.uuid);
      break;
    case 'state-change':
      if (presenceData.data) {
        if (presenceData.data.isTyping === true) {
          this.props.addTypingUser(presenceData.uuid);
        } else {
          this.props.removeTypingUser(presenceData.uuid);
        }
      }
      break;
    default:
      break;
    }
  }

  render() {
    const { props, sendMessage, fetchHistory, setTypingState, selectSong } = this;
    return (
      <div className="message-container">
        <ChatUsers users={ props.users } />
        <div className="container">
          <PollVote
            songs={ props.songs }
            selectSong={ selectSong }
          />
        </div>
      </div>
    );
  }

  selectSong = (song) => {
    this.PubNub.publish({
      channel: 'set-list-votes-beta',
      message: {
        'poll_id': 'pollId-3',
        'vote': song.name,
      }
    });
  }

  leaveChat = () => {
    this.PubNub.unsubscribe({ channel: 'set-list-votes-beta' });
  }

  fetchVotes = () => {
    const { props } = this;
    this.PubNub.history({
      channel: 'set-list-votes-beta',
      count: 100,
      callback: (data) => {
        props.syncVotes(data[0])
      }
    })
  }

  sendMessage = (message) => {
    this.PubNub.publish({
      channel: 'set-list-votes-beta',
      message: message,
    });
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
