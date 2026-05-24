import React from 'react';
import { CirclePlus, Image } from 'lucide-react';

export default function Footer(){
    return(
        <div className='flex items-center gap-5 bg-slate-900 w-fit py-2 px-4 rounded-2xl fixed bottom-6 left-1/2 -translate-x-1/2 z-50'>
            <button type='button' className='flex items-center gap-2 text-white font-medium text-sm border-r pr-5'>
                <CirclePlus className='size-4'/>
                Pergunta
            </button>
            <button className='flex items-center gap-2 text-white font-medium text-sm'>
                <Image className='size-4'/>
                Mídia
            </button>
        </div>
    );
};