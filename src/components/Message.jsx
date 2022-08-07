import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
function Message({ message, user }) {
  const { currentUser } = useAuth();
  const [typeOfMessage, setTypeOfMessage] = useState();
  useEffect(() => {
    if (currentUser) {
      setTypeOfMessage(user == currentUser.email ? 'Sender' : 'Receiver');
    }
  }, [currentUser, typeOfMessage]);
  return (
    <div>
      {typeOfMessage && `${typeOfMessage}`}:{message.message}
      <p>{message.timestamp ? message.timestamp.seconds : '...'}</p>
    </div>
  );
}

export default Message;
