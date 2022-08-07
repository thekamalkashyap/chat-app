import { useAuth } from '../context/AuthContext';
function Message({ message, user }) {
  const { currentUser } = useAuth();
  const TypeOfMessage = user === currentUser.email ? 'Sender' : 'Receiver';
  return (
    <div>
      {TypeOfMessage}:{message.message}
      <p>{message.timestamp ? message.timestamp.seconds : '...'}</p>
    </div>
  );
}

export default Message;
