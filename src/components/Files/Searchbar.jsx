import React from "react";
import { Search } from 'lucide-react';

const Searchbar = () => {
    return (
    <div>
        <div className='flex gap-3 bg-white p-2 rounded-lg items-center w-full'>
            <Search 
            
            />
            
            <input type='text'
            placeholder='Search'
            onKeyDown={(e)=>e.key=='Enter'&&console.log(e.target.value)}
            className='bg-transparent outline-none w-full text-[14px] text-black'
        />
   </div>
    </div>
    );
};

export default Searchbar;