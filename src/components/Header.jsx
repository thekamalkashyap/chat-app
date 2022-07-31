import React from 'react';
import { SearchIcon, DotsVerticalIcon } from '@heroicons/react/outline';
function Header() {
  return (
    <>
      <div className=" sticky top-0 py-3 flex justify-between items-center">
        <span className=" font-bold">Gosheep</span>
        <div className="flex">
          <SearchIcon className="w-5 h-5" />
          <DotsVerticalIcon className="w-5 h-5" />
        </div>
      </div>
    </>
  );
}

export default Header;
