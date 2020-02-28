import styled from 'styled-components'

export const ChatWrapper = styled.div`

  width: 90%;
  height: 70vh;
  margin: 10px auto;

  overflow: scroll;

`;

export const Message = styled.div`

  width: 60%;
  float: ${props => props.createdByCurrentUser ? 'right' : 'left'};
  display: block;
  text-align: ${props => props.createdByCurrentUser ? 'right' : 'left'};

`;

export const MessageUsername = styled.div`

  display: inline-block;
  margin: 30px 5px;

`;

export const MessageButton = styled.div`

  width: 75px;
  height: 75px;
  margin: 3px;
  border: 1px solid black;
  border-radius: 50%;

  float: ${props => props.createdByCurrentUser ? 'right' : 'left'};

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  :hover {
    background-color: rgba(30, 144, 255, .2);
  }

`;

export const MessageArrow = styled.div`

  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-left: 25px solid dodgerblue;

  margin-left: 5px;
  margin-top: 2px;

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
