import React, { useState } from "react";

import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");


//don't worry its just a package for modal. just go and explore https://www.npmjs.com/package/react-modal

export default function UpdateModal({ note, isReload, setIsReload }) {
  const [id, setId] = useState('')
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);



  function openModal(id) {
    setId(id)
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  const handleUpdate = (event) => {
    event.preventDefault();
    console.log(id)
    const updatedName = event.target.name.value;
    const updatedNotes = event.target.notes.value;
    const url = `http://localhost:4000/note/${id}`
    fetch(url, {
      method: 'put',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ name: updatedName, notes: updatedNotes }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setIsReload(!isReload)
        event.target.reset();
      })
  }
  return (
    <div>
      <button onClick={() => openModal(note?._id)} className="color-801336 btn-sm btn">
        {" "}
        Update
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal} className="btn btn-sm btn-warning">
          close
        </button>
        <div>Please insert your text</div>
        <div className=" p-3 color-4D4C7D">
          <form onSubmit={handleUpdate} className="container " >
            <div className="input-group mb-3 mt-5">
              <input
                name="name"
                type="text"
                className="form-control"
                placeholder="Your name"
                aria-label="Username"
              />
            </div>

            <div className="input-group">
              <textarea
                name="notes"
                className="form-control"
                aria-label="With textarea"
              ></textarea>
            </div>
            <div className="mt-4">
              <input type="submit" value="submit" className="btn btn-info" />
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

