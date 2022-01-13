import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/store/authContext";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
    const newPasswordInputRef = useRef();
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        const enteredNewPassword = newPasswordInputRef.current.value;
        try {
            const res = await fetch(
                `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAaZj9gOygJpg6gzW7zer9ScQHJIuXJFrs`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        idToken: token,
                        password: enteredNewPassword,
                        returnSecureToken: false,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            navigate("/");
        } catch (error) {
            toast.error("Something went Wrong");
        }
    };
    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor="new-password">New Password</label>
                <input
                    minLength={7}
                    type="password"
                    id="new-password"
                    ref={newPasswordInputRef}
                />
            </div>
            <div className={classes.action}>
                <button>Change Password</button>
            </div>
        </form>
    );
};

export default ProfileForm;
