import { Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
function Message({ message, user }) {
  const { currentUser } = useAuth();
  const [typeOfMessage, setTypeOfMessage] = useState();
  // const [time, setTime] = useState(null);
  useEffect(() => {
    if (currentUser) {
      setTypeOfMessage(user == currentUser.email ? 'Sender' : 'Receiver');
    }
  }, [currentUser, typeOfMessage]);
  // useEffect(() => {
  //   let time = new Date(message.timestamp);
  //   setTime(time);
  // }, []);
  return (
    <div
      className={` ${typeOfMessage == 'Sender' ? 'text-right' : 'text-left'}`}
    >
      <div
        className={` inline-block w-fit max-w-[70vw] rounded-lg px-2 m-2 text-black ${
          typeOfMessage == 'Sender' ? 'bg-green-400' : 'bg-gray-400'
        }`}
      >
        {message.message}
      </div>
      {/* <span className=" opacity-60">
        {message.timestamp && time
          ? `${
              time.getHours() > 12 ? time.getHours() - 12 : time.getHours()
            }:${time.getMinutes()}`
          : '...'}
      </span> */}
    </div>
  );
}

export default Message;
