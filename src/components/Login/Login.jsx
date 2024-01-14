import { useState } from "react";
import './Login.css'

import RegisterUser from "../RegisterUser/RegisterUser";

function Login({events}) {
    const [userid, setUserId] = useState("");
    const [password,setPassword] = useState("");
    const {handleUserLogin, handleNewUser} = events;


    function handleSubmit(e) {
        e.preventDefault();
        
    }

    function clickLogin(e){
      
      fetch('http://localhost:8080/ValidateUser?userID='+userid+'&password='+password, {
      method: 'GET'
  }).then(response => response.json())
  .then(jsondata => {
    console.log(jsondata);
    const resultJSON = JSON.parse(JSON.stringify(jsondata));
    
    if (resultJSON.STATUS == "Success") {
      handleUserLogin(userid);
      handleNewUser(false);   
    } else {
        alert("Invalid user id or password");
    }
   }
  ).catch(error => {
    alert("Error submitting request");
       
  });   

  handleUserLogin(userid);
  handleNewUser(false);  

    }

    function clickRegisterUser(e){
      
        handleNewUser(true);
        
    }

   

    return (
        <form className="loginForm" onSubmit={handleSubmit}>
            <div className="loginTable">
            <table align='center'>
                <tbody>
                    <tr>
                        <td>User Name</td>
                        <td>
                            <input type='text' 
                            value={userid}
                            onChange={e => setUserId(e.target.value)}
                            placeholder='User id'
                            id='userid' />
                        </td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td>
                            <input  type='password' placeholder='Password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            id='password'
                            ></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input width='50%' type='button' 
                            onClick={ e => clickLogin(e)} 
                            value="Login"/>
                        </td>
                        <td>
                            <input type='button' value="Register"
                            onClick={ e => clickRegisterUser(e)} />
                        </td>
                    </tr>
                </tbody>
            </table>     
            </div>
        </form>
           

    )

}

export default Login;