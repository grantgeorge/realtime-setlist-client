import * as React from 'react';

class ChatUsers extends React.Component {
  static propTypes = {
    users: React.PropTypes.array,
  }

  render() {
    const { users } = this.props;
    return (
      <nav>
       <div className="nav-wrapper">
         <a href="#" className="brand-logo">Set List <span style={{ fontStyle: 'italic' }}>Live</span></a>
         <ul id="nav" className="right">
           <li><a href="">
             <span className="valign">{ users.length } online</span>
           </a></li>
         </ul>
       </div>
     </nav>
    );
  }
}

export default ChatUsers;
