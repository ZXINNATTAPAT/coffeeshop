import React, { useState, useEffect } from 'react';

function ProtectedData(x) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('No token found');
      return;
    }

    fetch('http://localhost:3333/protected', {
      headers: {
        Authorization: token
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error retrieving protected data');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        console.log(data)
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return <div>
            {x}
    </div>;
}

export default ProtectedData;
