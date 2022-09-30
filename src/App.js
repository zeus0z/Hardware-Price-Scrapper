
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [NOTICIAS, setNoticias] = useState([]);



  useEffect(() => {
    async function () {
      axios('http://localhost:8000/noticias_anderson')
        .then(response => {
          setNoticias(response.data)
          console.log(response.data)

        })
        .catch(error => console.log(error))
    }
  }, [NOTICIAS])

  return (
    <div className="App">

      <h1>Noticias</h1>

    </div>
  );
}

export default App;
