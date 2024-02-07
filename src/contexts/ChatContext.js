import { createContext, useContext, useReducer } from 'react';
import { AuthContext } from './AuthContext';

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE = {
    currentUser: null, // Set initial currentUser to null
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case 'CHANGE_USER':
        return {
          user: action.payload,
          // Check if currentUser is available before accessing its properties
          currentUser: currentUser ? currentUser.uid : null,
          chatId:
            currentUser &&
            action.payload &&
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
