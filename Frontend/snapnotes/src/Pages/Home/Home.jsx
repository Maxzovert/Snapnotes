import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import NoteCard from '../../Components/Cards/NoteCard';
import { MdAdd } from 'react-icons/md';
import AddEditNotes from './AddEditNotes';
import Modal from "react-modal";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../Utils/axiosInstance';
import Toast from '../../Components/ToastMessage/Toast';
import EmptyCard from '../../Components/Empty card/EmptyCard';
import addNoteImg from '../../assets/Images/paper.png';



const Home = () => {

  const nevigate = useNavigate()

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg , setShowToastMsg] = useState({
    isShown : false,
    message : "",
    type : "add"
  })

  const [userInfo , setUserInfo] = useState(null);
  const [allNotes , setAllNotes] = useState([]);

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({
      isShown : true,
      data : noteDetails,
      type : "edit"
    });
  };

  const showToastMesg = (message , type) => {
    setShowToastMsg({
      isShown : true,
      message,
      type,
    })
  }

  const handlecloseToast = () => {
    setShowToastMsg({
      isShown : false,
      message : ""
    })
  }

  //Get User Info 
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
        if (response.data && response.data.user) {
          setUserInfo(response.data.user);
        }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        nevigate("/login");
      }
    }
  }

  //Get All notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
        if (response.data && response.data.notes) {
          setAllNotes(response.data.notes);
        }
    } catch (error) {
      console.log("an unexpected error")      
    }
  };

  //Delete Note
  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);

      if (response.data && !response.data.error) {
        showToastMesg("Note Deleted", 'delete')
        getAllNotes();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log("an unexpected error");
      }
    }
  }
  
  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {};
  },[])

  return (
    <>
      <Navbar userInfo={userInfo} />

      <div className="container mx-auto px-8">
      {allNotes.length > 0 ? (
      <div className="grid grid-cols-3 gap-4 mt-8">
      {allNotes.map((item , index) => (
        <NoteCard
        key={item._id}
        title={item.title}
        date={item.created0n}
        content={item.content}
        tags={item.tags}
        isPinned={item.isPinned}
        onEdit={() => handleEdit(item)}
        onDelete={() => deleteNote(item)}
        onPinNote={() => { }}
        />
      ))}
      </div>
      ) : (
        <EmptyCard imgSrc={addNoteImg} message={`Start creating your first note! Click the 'Add' button to jot down your thoughts, ideas, and reminders. Let's get started!`}/>
      )}
      </div>

      <button className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10" onClick={() => {
        setOpenAddEditModal({ isShown: true, type: "add", data: null })
      }}>
        <MdAdd className="text-[-32px] text-white" />
      </button>

      <Modal
      isOpen={openAddEditModal.isShown}
      onRequestClose={() => { }}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)"
          }
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-hidden"
      >

        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
          getAllNotes={getAllNotes}
          showToastMesg = {showToastMesg}
        />
      </Modal>
      <Toast
        isShown = {showToastMsg.isShown}
        message = {showToastMsg.message}
        type = {showToastMsg.type}
        onClose = {handlecloseToast}
      />
    </>
  )
}

export default Home
