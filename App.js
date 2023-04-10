import { useEffect, useState } from "react";
import "./app.css";
import Table from "./Table";
import axios from "axios";
import SignIn from './login';


  function App() {
    const [data, setData] = useState([]);
    const [query, setQuery] = useState("");
  
    function addLeadingZero(number) {
      const desiredLength = 6; // or any other desired length
      const numberString = String(number); // convert number to string
      const difference = desiredLength - numberString.length;
      if (difference > 0) {
        return '0'.repeat(difference) + numberString; // prepend the necessary number of zeros
      } else {
        return numberString; // the number already has the desired length, so return it as-is
      }
    }
  
    const search = () => {
      const formattedQuery = addLeadingZero(query); // format the query value before making the API call
      const token = localStorage.getItem('token'); // retrieve token from localStorage
      axios.get(`http://192.168.201.180:5000/api/get?search=${formattedQuery}`, {
        headers: {
          Authorization: `Bearer ${token}` // include token in Authorization header
        }
      })
        .then(response => {
          setData(response.data.recordset);
        })
        .catch(error => {
          console.error(error);
          setData([]);
        });
    };
    
    useEffect(() => {
      search();
    }, [query]);
  
    return (
      <div className="app">
        <h1>VIVAFresh Cmimet</h1>
        <input
          
          className="search"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Table data={data} />
      </div>
    );
  }
  
  export default App;
