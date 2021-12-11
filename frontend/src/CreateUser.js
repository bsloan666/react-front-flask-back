
const CreateUser = () => {

    return (
        <div>
            <h2> New User </h2>
            <div>
                <label for="username">Username:</label>
                <input type="text" id="username" name="username"/>
            </div>

            <div>
                <label for="pass">Password (8 characters minimum):</label>
                <input type="password" id="pass" name="password" minlength="8" required/>
            </div>

            <div>
                <label for="pass_verify">Verify Password:</label>
                <input type="password" id="pass_verify" name="password_verify" minlength="8" required/>
            </div>

            <input type="submit" value="Create New User"/>
        </div >
    )
}

export default CreateUser 
