import { SearchIcon } from '@heroicons/react/outline';
import { database } from '../../firebase';
import { getDoc, setDoc, doc } from 'firebase/firestore';

function Search({ email, setEmail, currentUser, snapShot }) {
  const handelSubmit = async () => {
    const addChat = async () => {
      await setDoc(doc(database, 'chats', `${currentUser.email}-${email}`), {
        users: [currentUser.email, email],
      }).catch((err) => alert(err.message));
    };

    const chatAlreadyExists = () => {
      if (snapShot) {
        return snapShot.docs.find((chat) =>
          chat.data().users.find((user) => user == email)
        );
      } else {
        return false;
      }
    };

    await getDoc(doc(database, 'users', `${email.trim()}`)).then((contact) => {
      if (
        contact.exists() &&
        contact.data().email != currentUser.email &&
        !chatAlreadyExists()
      ) {
        let cnfrm = confirm(
          `Do you want to start the conversation with ${contact.data().name} `
        );

        if (cnfrm) {
          addChat();
          setEmail('');
        }
      } else if (
        contact.exists() &&
        contact.data().email == currentUser.email
      ) {
        alert('You cant start chat with yourself');
        setEmail('');
      } else if (contact.exists() && chatAlreadyExists()) {
        alert('Chat already exists');
        setEmail('');
      } else {
        alert('User not found!');
      }
    });
  };

  return (
    <>
      <div className="flex border mx-3 p-1 rounded-full">
        <button
          onClick={handelSubmit}
          disabled={email ? false : true}
          className=" disabled:opacity-60 ml-2 "
        >
          <SearchIcon className="w-5 h-5 mr-3" />
        </button>
        <input
          type="email"
          value={email}
          placeholder="Search user email"
          onKeyDown={(e) => {
            if (e.key == 'Enter' && email) {
              e.preventDefault();
              handelSubmit();
            }
          }}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="px-3 w-full rounded-full focus:outline-none bg-transparent"
        />
      </div>
    </>
  );
}

export default Search;
