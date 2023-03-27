import React, { useState } from "react";
import Form from "./Form";
import Textinput from "./Textinput";
import Button from "./Button";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
// import classes from "./../styles/Login.module.css";

const LoginForm = () => {
    
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    

    const [error, setError] = useState();
    const [loading, setLoading] = useState();

    const {login} = useAuth();
    const history = useHistory();

    async function handleSubmit(e){

        e.preventDefault();
        

        try{
            setError("");
            setLoading(true);
            await login(email, password);
            history.push("/")
        }catch(err){
            console.log(err);
            setLoading(false);
            setError("Fail to do submitting from!!")
        }

    }
  return (
    <div>
      <Form style={{ height: "330px" }} onSubmit={handleSubmit}>
        <Textinput type="text" required placeholder="Enter email" icon="person" 
        value={email}  onChange={(e) => setEmail(e.target.value)} />
        <Textinput type="password" placeholder="Enter password" icon="lock" 
        value={password}  onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit" disabled={loading}>
          <span>Submit now</span>
        </Button>
        {error && <p className="error">{error}</p>}
        <div className="info">Already have an account? <a href="/signup">Signup</a> instead.</div>
      </Form>
    </div>
  );
};

export default LoginForm;
