import React, { useState, useEffect } from "react";
import axios from 'axios';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'; 

function User() {
  const url = "http://127.0.0.1:8000/products";
  const [data, setData] = useState([]);

  const fetchInfo = () => {
    return axios.get(url)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <>
    <div className="App">
      <h1 style={{ color: "green" }}>Products Are Listed Here </h1>
      <center>
        {data.map((dataObj, index) => {
          return (
            <div className="c"
              style={{
                width: "15em",
                backgroundColor: "#636363",
                padding: 2,
                borderRadius: 10,
                marginBlock: 10,
              }}
            >
              <p style={{ fontSize: 20, color: 'white' }}>{dataObj.name}</p>
              <p style={{ fontSize: 20, color: 'white' }}>{dataObj.description}</p>
              <p style={{ fontSize: 20, color: 'white' }}>{dataObj.price}</p>

            </div>
          );
        })}
      </center>
    </div>
    </>
  );
}

// export default User;

const rootElement = document.getElementById('user')
const root = createRoot(rootElement);

root.render(<User />);
