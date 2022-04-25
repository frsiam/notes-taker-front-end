import "./App.css";
import Header from "./components/header/Header";
import InputForm from "./components/inputForm/InputForm";
import NoteCard from "./components/noteCard/NoteCard";
import { useEffect, useState } from "react";



function App() {
  const [notes, setNotes] = useState([]);
  const [isReload, setIsReload] = useState(false)

  useEffect(() => {
    fetch("http://localhost:4000/notes")
      .then(res => res.json())
      .then(data => setNotes(data))
  }, [isReload]);
  /*
1. here there will be a function named handleSearch
to handle search by query, and it will be passed as props to header

  */
  const handleSearch = event => {
    event.preventDefault();
    const queryText = event.target.searchText.value;
    if (queryText) {
      fetch(`http://localhost:4000/notes?name=${queryText}`)
        .then(res => res.json())
        .then(data => setNotes(data))
    }
  }
  /*2. here there will be a function named handleDelete
  to delete a note, and it will be passed as props to NoteCard that will be triggered using delete button.
   */
  const handleDelete = id => {
    const proceed = window.confirm('Are you sure ?');
    if (proceed) {
      console.log(id)
      const url = `http://localhost:4000/note/${id}`;
      fetch(url, {
        method: 'delete'
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          if (data.deletedCount > 0) {
            setIsReload(!isReload)
          }
        })
    }

  }
  /*
3. there will be a function named handleUpdate
    to update data, and it will be passed as props to NoteCard and 
   later it will be passed to Update modal using props.
 */






  /*
4.  there will be a function named handlePost
to post data to backend, and it will be passed as props to InputFrom.
 */
  const handlePost = event => {
    event.preventDefault();

    const name = event.target.name.value;
    const notes = event.target.notes.value;

    fetch('http://localhost:4000/note', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ name, notes }),
    })
      .then(res => res.json())
      .then(data => {
        setIsReload(!isReload)
        event.target.reset();
      })

  }



  return (
    <div className="App">
      <Header handleSearch={handleSearch} />
      <InputForm handlePost={handlePost} />
      <div className="row row-cols-1 row-cols-md-3 g-4 m-2">
        {notes.map((note) => (
          <NoteCard
            isReload={isReload}
            setIsReload={setIsReload}
            handleDelete={handleDelete}
            key={note._id}
            note={note}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
