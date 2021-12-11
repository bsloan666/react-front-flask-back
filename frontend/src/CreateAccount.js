
const CreateAccount = () => {

    return (
        <div>
            <h2> Create Account </h2>
            <div>
                <label>Username:</label>
                <input type="text" id="username" name="username"/>
            </div>

            <div>
                <label>Password (8 characters minimum):</label>
                <input type="password" id="pass" name="password" minLength="8" required/>
            </div>

            <div>
                <label>Verify Password:</label>
                <input type="password" id="pass_verify" name="password_verify" minLength="8" required/>
            </div>

            <input type="submit" value="Create New User"/>
        </div >
    )
}

export default CreateAccount 
