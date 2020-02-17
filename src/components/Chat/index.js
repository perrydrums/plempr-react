import React, {Component} from 'react';
import { AuthUserContext, withAuthorization } from '../Session';
import SignOutButton from '../SignOut';
import ChatForm from './ChatForm';
import ChatContainer from './ChatContainer';
import {Wrapper} from '../Base/styled';

class ChatPage extends Component {

    render() {
        return (
            <AuthUserContext.Consumer>
                {authUser => (
                    <Wrapper>
                        <h2>Hallo, {authUser.email}</h2>
                        <SignOutButton />
                        <ChatContainer uid={authUser.uid} />
                        <ChatForm />
                    </Wrapper>
                )}
            </AuthUserContext.Consumer>
        )
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ChatPage);
