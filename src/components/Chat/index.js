import React, {Component} from 'react';
import { AuthUserContext, withAuthorization } from '../Session';
import SignOutButton from '../SignOut';
import ChatForm from './ChatForm';
import ChatContainer from './ChatContainer';

class ChatPage extends Component {

    render() {
        return (
            <AuthUserContext.Consumer>
                {authUser => (
                    <>
                        <h2>Hallo, {authUser.email}</h2>
                        <SignOutButton />
                        <ChatContainer />
                        <ChatForm />
                    </>
                )}
            </AuthUserContext.Consumer>
        )
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ChatPage);
