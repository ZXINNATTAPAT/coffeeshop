import React ,{ useState,useEffect } from "react";

// useAuthentication.js



function useAuthentication() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      fetch('http://localhost:3333/authen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'ok') {
            localStorage.setItem('token', data.token);
            setAuthenticated(true);
          } else {
            localStorage.removeItem('token');
            setAuthenticated(false);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          setAuthenticated(false);
        });
    } else {
      setAuthenticated(false);
    }
  }, []);

  return authenticated;
}

export default useAuthentication;

