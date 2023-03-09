const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData ={
        email: data.get('email'),
        password: data.get('password'),
        fname : data.get('firsstName'),
        lname : data.get('lastName')
  }
  fetch("http://localhost:3333/register", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonData),
  })
    .then((response) => response.json())
    .then( data => {
      if(data.status === 'ok'){
          alert('register sucess')
      }
      else{
          alert('register failed')
      }
      console.log("Success:", jsonData);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };