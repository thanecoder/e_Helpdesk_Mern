import React, { useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux'
import { authActions, login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);

    const formControlChangeHandler = (event) => {
        setFormData((prevState) => ({
            ...prevState,
            [event.target.id]: event.target.value,
        }));
    };

    const formSubmitHandler = (event) => {
        event.preventDefault();
        const loginData = {
            email,
            password
        }
        dispatch(login(loginData));
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess || user) {
            navigate('/');
        }
        dispatch(authActions.reset());
    }, [isError, isSuccess, user])

    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
            </section>
            <section className="form">
                <form onSubmit={formSubmitHandler}>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={formControlChangeHandler}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={formControlChangeHandler}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">Login</button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default Login;
