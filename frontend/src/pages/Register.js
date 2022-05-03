import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux'
import { authActions, register } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";



const Register = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);

    const { name, email, password, confirmPassword } = formData;

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


    const formControlChangeHandler = (event) => {
        setFormData((prevState) => ({
            ...prevState,
            [event.target.id]: event.target.value,
        }));
    };

    const formSubmitHandler = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
        }
        else {
            const userData = {
                name,
                email,
                password
            }
            dispatch(register(userData));
        }
    };

    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Please create an account</p>
            </section>
            <section className="form">
                <form onSubmit={formSubmitHandler}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={name}
                            onChange={formControlChangeHandler}
                            placeholder="Enter your name"
                            required
                        />
                    </div>
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
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={formControlChangeHandler}
                            placeholder="Confirm Password"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default Register;
