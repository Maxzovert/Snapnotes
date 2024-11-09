import moment from 'moment';
import React, { useState } from 'react'
import {MdOutlinePushPin} from "react-icons/md";
import { MdCreate , MdDelete } from 'react-icons/md';
import ColorTray from '../Utilities/ColorTray';



const NoteCard = ({
  title, 
  date, 
  content, 
  tags, 
  isPinned, 
  onEdit, 
  onDelete, 
  onPinNote
}) => {
  const [bgColor, setBgColor] = useState('#ffffff');
  return (
    <div className="border rounded p-4 hover:shadow-xl transition-all ease-in-out" style={{ backgroundColor: bgColor }}>
      <div className="flex items-center justify-between">
        <div>
            <h6 className="text-sm font-medium">{title}</h6>
            <span className="text-xs text-slate-500">{moment(date).format('Do MMM YYYY')}</span>
        </div>

        <MdOutlinePushPin className={`icon-btn ${isPinned ? 'text-primary ' : 'text-slate-300'}`} onClick={onPinNote} />
      </div>
      <p className="text-xs text-slate-600 mt-2" >{content?.slice(0,60)}</p>

    <div className='flex items-center justify-between mt-2'>
        <div className="text-xs text-slate-500">{tags.map((item) => `#${item} `)}</div>

      <div className="flex items-center gap-2">
        <div className='mt-2 border-gray-300'>
        <ColorTray onColorSelect={setBgColor}/>
        </div>
        <MdCreate
            className="icon-btn hover:text-green-600"
            onClick={onEdit}
        />
        <MdDelete
            className="icon-btn hover:text-red-500"
            onClick={onDelete}
        />
      </div>
      </div>
    </div>
  )
}

export default NoteCard
