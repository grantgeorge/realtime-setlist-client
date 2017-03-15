import * as React from 'react';
import _ from 'lodash';

class PollVote extends React.Component {
  static propTypes = {
    userID: React.PropTypes.number,
    selectSong: React.PropTypes.func,
    songs: React.PropTypes.array,
  }

  componentDidMount() {
    // this.refs.txtMessage.focus();
  }

  handleClick = (e, song) => {
    e.preventDefault();
    this.props.selectSong(song);
  }

  render() {
    const { props, handleClick } = this;

    return (
      <ul className="collection">
        {
          props.songs
            .sort((a, b) => {
              return b.numVotes - a.numVotes;
            })
            .map((option) => {
            return (
              <li
                className="song-selection collection-item avatar"
                key={option.name}
                onClick={ (e) => handleClick(e, option) }
              >
                <img src={ option.albumImageUrl } alt="" className="circle" />
                <span className="title">{ option.name }</span>
                <span className="badge">{ option.numVotes }</span>
                <p>{ option.albumName }</p>
              </li>
            )
          })
        }
      </ul>
    )
  }
}

export default PollVote
