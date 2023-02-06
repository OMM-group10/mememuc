// The following code is inspired by and modified from: https://www.permify.co/post/jwt-authentication-in-react


function storeToken(response){

    const token  =  response.body.token;
    console.log("We successfully signed-in and recevied back a token from the API! The tocken is", token);
  
    //set JWT token to local
    localStorage.setItem("token", token);
  
    //TODO: Call here a function that, sets the token as default in all follwing fetch-headers!

}

function handleLogin (username, password) {
    //reqres registered sample user
    let loginPayload = {
      user: username,
      pass: password
    }
  
    fetch("http://localhosrt:3001/login", {
        method:"post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },

        body: JSON.stringify(loginPayload)
    })
    .then(response => response.json())
    .then(storeToken)
    .catch(err => console.error("In function handleLogin this error occured:", err))
  };

export default handleLogin;