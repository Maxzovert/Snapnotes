import React from 'react'

const Buttons = ({setContent , content}) => {
    const handleUpCase = () => {
        setContent(content.toUpperCase());
    }

    const handleLowCase = () => {
        setContent(content.toLowerCase());
    }
    
    const handleCopy = () => {
      navigator.clipboard.writeText(content);
      alert("Content copied to clipboard");
    };

    const handleRemoveSpaces = () => {
        setContent(content.replace(/\s+/g, ''));
    }

    const handleDeleteText = () => {
        setContent('');
    }
  


  return (
    <div className='flex flex-r , handleSaveNoteow justify-evenly '>
      <button onClick={handleUpCase} className="flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded mt-2">UpperCase</button>
      <button onClick={handleLowCase} className="flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded mt-2">LowerCase</button>
      <button onClick={handleCopy} className="flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded mt-2">Copy</button>
      <button onClick={handleRemoveSpaces} className="flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded mt-2">Remove Spaces</button>
      <button onClick={handleDeleteText} className="flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded mt-2">Delete</button>
    </div>
  )
}

export default Buttons
