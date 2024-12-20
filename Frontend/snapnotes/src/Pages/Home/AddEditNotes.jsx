import React, { useState } from 'react'
import TagsInput from '../../Components/Input/TagsInput'
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../Utils/axiosInstance';
import Buttons from '../../Components/Utilities/Buttons';
import WordsCounter from '../../Components/Utilities/WordsCounter';

const AddEditNotes = ({noteData ,type, onClose , getAllNotes, showToastMesg}) => {

  const [title , setTitle] = useState(noteData?.title || "");
  const [content , setContent] = useState(noteData?.content || "");
  const [tags , setTags] = useState(noteData?.tags || []);
  const [error , setError] = useState(null);

  //Add Note
  const  addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        showToastMesg("Note Added")
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message)
      }
    }
  }

  //Edit note
  const editNote = async () => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put("/edit-note/" + noteId , {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        showToastMesg("Note Updated")
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message)
      }
    }
  }

  const  handleAddNote = () => {

    if(!title) {
      setError("Please enter the title");
      return;
    }

    if(!content) {
      setError("Please enter the Content");
      return;
    }

    setError("")

  if(type === 'edit') {
    editNote()
  }else{
    addNewNote()
  }

  }
    
  return (
    <div className="relative">
      <button 
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50" 
        onClick={onClose}>
        <MdClose className="text-xl text-slate-400"/>
      </button>

      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input 
            type="text" 
            className="text-2xl text-slate-950 outline-none"
            placeholder="Title Here"
            value={title}
            onChange={({target}) => setTitle(target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <div className="flex flex-row justify-between">
        <label className="input-label">CONTENT</label>
        <WordsCounter content={content}/>
        </div>
        <textarea 
            type="text"
            className="text-sm text-slate-950 outline-none bg-slate-100 p-2 rounded"
            placeholder="content"
            rows={10}
            value={content}
            onChange={({target}) => setContent(target.value)}
        />
      </div>

      <Buttons content={content} setContent={setContent}/>

      <div className="mt-3">
        <label className="input-label">TAGS</label>
        <TagsInput tags={tags} setTags={setTags}/>
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button 
        className="btn-primary font-medium mt-5 p-3" 
        onClick={handleAddNote}>{type === 'edit' ? 'UPDATE' : 'ADD'}</button>
    </div> 
  )
}

export default AddEditNotes
