import { useHistory } from "react-router-dom";

const Login = () => {

    const history = useHistory();
    const navigateTo = () => history.push('/create_account');
    return (
        <div>
            <h2> Login </h2>
            <div>
                <label>Username:</label>
                <input type="text" id="username" name="username"/>
            </div>

            <div>
                <label>Password (8 characters minimum):</label>
                <input type="password" id="pass" name="password" minLength="8" required/>
            </div>

            <input type="submit" value="Sign in"/><br/><br/>
            Don't have an account?&nbsp;<button onClick={navigateTo} >Create Account</button>
        </div >
    )
}

export default Login 
