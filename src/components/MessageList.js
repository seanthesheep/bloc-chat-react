import React, { Component } from 'react';
import * as firebase from 'firebase';

class MessageList extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      content: '',
      sentAt: '',
      roomId: '',
      messages: []
    }
   this.messagesRef = this.props.firebase.database().ref('messages');
  }
  componentDidMount() {
   this.messagesRef.on('child_added', snapshot => {
     const message = snapshot.val();
     message.key = snapshot.key;
     this.setState({ 
       messages: this.state.messages.concat(message)
       });
    });
  }
  
  
  render() {
    const messages = (
      this.state.messages.map((message) => {
        if(message.roomId == this.props.activeRoom.key) {
          return <ol key={message.key}>{message.content}</ol>
        }
        return null;
      })
    )
    return(
      <div>
        <div>{messages}</div>
      </div>
    )
  }
  
}

export default MessageList;