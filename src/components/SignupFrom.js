import Form from './Form';
import Textinput from './Textinput';
import Checkbox from './Checkbox';
import Button from './Button';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { async } from '@firebase/util';

const SignupFrom = () => {

    const [username , setUsername] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [confimPassword , setConfimPassword] = useState("");
    const [agree , setAgree] = useState("");

    const [error, setError] = useState();
    const [loading, setLoading] = useState();

    const {signup} = useAuth();
    const history = useHistory()

    async function handleSubmit(e){

        e.preventDefault();
        if(password !== confimPassword){
            return setError("Password are not match");
        }

        try{
            setError("");
            setLoading(true);
            await signup(email, password, username);
            history.push("/")
        }catch(err){
            console.log(err);
            setLoading(false);
            setError("Fail to do submitting from!!")
        }

    }
  return (
    <div>
      <Form style={{ height:"500px" }} onSubmit={handleSubmit} >
            <Textinput type="text" required placeholder="Enter name" icon="person" 
            value={username} onChange={(e)=>setUsername(e.target.value)} />

            <Textinput type="text" required placeholder="Enter email" icon="person" 
            value={email} onChange={(e)=>setEmail(e.target.value)} />

            <Textinput type="password" required placeholder="Enter password" icon="lock" 
             value={password} onChange={(e)=>setPassword(e.target.value)} />

            <Textinput type="password" required placeholder="Confirm password" icon="lock_clock" 
            value={confimPassword} onChange={(e)=>setConfimPassword(e.target.value)}/>

            <Checkbox text="I agree to the Terms & Conditions" required
            value={agree} onChange={(e)=>setAgree(e.target.value)}/>

            <Button disabled={loading} type="submit">
              <span>
                  Submit now
              </span> 
            </Button>

            {error && <p className="error">{error}</p>}

            <div className="info">Already have an account? <a href="login.html">Login</a> instead.</div>
        </Form>
    </div>
  );
}

export default SignupFrom;
