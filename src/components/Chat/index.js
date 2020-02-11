import React from 'react';
import { withAuthorization } from '../Session';
import SignOutButton from '../SignOut';

const ChatPage = () => (
    <>
        <h1>Chat</h1>
        Hello!
        <SignOutButton />
    </>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ChatPage);
