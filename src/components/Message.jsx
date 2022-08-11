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
    <div
      className={` ${typeOfMessage == 'Sender' ? 'text-right' : 'text-left'}`}
    >
      <div
        className={` inline-block w-fit max-w-[70vw] rounded-lg px-2 m-2 border ${
          typeOfMessage == 'Sender' ? 'border-[#008800]' : 'border-[#757575]'
        }`}
      >
        {message.message}
      </div>
    </div>
  );
}

export default Message;
