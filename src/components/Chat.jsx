import { useRouter } from 'next/router';
import { useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { database } from '../../firebase';
import Image from 'next/image';
function Chat({ currentUser, id, users }) {
  const [receiverDetails, setReceiverDetails] = useState();

  const router = useRouter();
  const route = () => {
    router.push(`/chat/${id}`);
  };

  const getReceiverEmail = (users, userLoggedIn) =>
    users.filter((userToFilter) => userToFilter != userLoggedIn.email)[0];
  const receiverEmail = getReceiverEmail(users, currentUser);

  const q = query(
    collection(database, 'users'),
    where('email', '==', `${receiverEmail}`)
  );

  onSnapshot(q, (querySnapshot) => {
    setReceiverDetails(querySnapshot.docs[0].data());
  });

  return (
    <>
      {receiverDetails && (
        <div
          onClick={route}
          className="my-3 rounded-lg flex items-center py-2 hover:bg-[#383838] cursor-pointer "
        >
          <div className=" h-10 w-10 sm:h-12 sm:w-12 mx-3 relative">
            <Image
              src={receiverDetails.photoURL}
              alt={receiverDetails.name[0]}
              layout="fill"
              className=" rounded-full"
              loading="lazy"
            />
          </div>
          <div>
            <h1>{receiverDetails.name}</h1>
            <h2>{receiverDetails.email}</h2>
          </div>
        </div>
      )}
    </>
  );
}

export default Chat;
