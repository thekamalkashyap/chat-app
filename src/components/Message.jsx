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
    <>
      <div
        className={` break-words w-fit max-w-[70vw] rounded-lg px-2 border m-2 ${
          typeOfMessage == 'Sender'
            ? 'border-[#008800] ml-auto'
            : 'border-[#757575]'
        }`}
      >
        {message.message}
      </div>
    </>
  );
}

export default Message;
