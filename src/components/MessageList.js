import React, { Component } from 'react';
import * as firebase from 'firebase';

class MessageList extends Component {
  constructor(props){
    super(props);
    this.state = {
      newMessage: '',
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
  
  handleChange = (e) => {
    this.setState({ content: e.target.value});
  }

  createMessage = (e) => {
    e.preventDefault();
    this.messagesRef.push({
      username: this.props.user,
      content: this.state.content,
      roomId: this.props.activeRoom.key
    });
    this.setState({
      content: ''
    });
  }
  
  render() {
    const messages = (
      this.state.messages.map((message) => {
        if(message.roomId == this.props.activeRoom.key) {
          return <ol key={message.key}>
            <li>{message.username}: {message.content}</li>
          </ol>
        }
        return null;
      })
    )
    return(
      <div>
        <div>{messages}</div>
        <form onSubmit={this.createMessage}>
          <input type="text" name="newMessage" value={this.state.content} onChange={this.handleChange}/>
          <button>Submit</button>
        </form>
      </div>
    )
  }
  
}

export default MessageList;