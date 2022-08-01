import { useState } from 'react';
import Chats from './Chats';
import Search from './Search';
function UserDashboard() {
  const [email, setEmail] = useState();

  return (
    <>
      <Search email={email} setEmail={setEmail} />
      <Chats />
    </>
  );
}

export default UserDashboard;
