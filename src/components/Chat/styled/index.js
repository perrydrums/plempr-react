import styled from 'styled-components'

export const ChatWrapper = styled.div`

  width: 90%;
  height: 70vh;
  margin: 10px auto;

  overflow: scroll;

`;

export const Message = styled.div`

  width: 80%;
  height: 75px;
  margin: 3px;
  border: 1px solid black;
  border-radius: 15px;
  float: ${props => props.createdByCurrentUser ? 'right' : 'left'}

`;

export const MessageButton = styled.div`

  width: 0;
  height: 0;
  border-top: 30px solid transparent;
  border-bottom: 30px solid transparent;
  border-left: 50px solid dodgerblue;

  margin: 7px auto;
  cursor: pointer;

  :active {
    border-left: 50px solid red;
  }

`;

export const ChatFormInput = styled.input`

  width: 100%;
  height: 30px;
  outline: none;
  border: none;
  border-bottom: 1px solid black;

`;
