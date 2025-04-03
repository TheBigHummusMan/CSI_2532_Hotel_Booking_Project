import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import { ToastContainer } from 'react-toastify';  // Import ToastContainer
import { useNavigate } from 'react-router-dom';

const EmployeeLogin = ({setAuth}) => {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        email:'',
        password:'' 
    })

    const {email, password} = inputs;


    const onChange= (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value});
    };

    const onSubmitForm = async(e) => {
        e.preventDefault();

        try {

            const body = {email, password};

            const response = await fetch('http://localhost:5000/login/employe', {
                method: 'POST', 
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            if (parseRes.token) {
                localStorage.setItem('token', parseRes.token);
                navigate('/employee/employee-dashboard');
                toast.success('Logged in successfully');
            } else {
                setAuth(false);
                toast.error(parseRes);
            }

        } catch (err){
            console.error(err.message);
        }
    }

    
    return (
        <Fragment>
            {/* Back Button */}
            <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
                <Link to="/login" className="btn btn-secondary">
                Back to regular login
                </Link>
            </div>

            {/* Login Form Card */}
            <div className="container mt-5">
                <div className="row justify-content-center">
                <div className="col-md-4">
                    <div
                    className="card shadow-lg"
                    style={{
                        border: '4px solid #ced4da', // Double the border thickness
                        borderRadius: '15px', // Slightly rounded corners
                    }}
                    >
                    <div
                        className="card-body"
                        style={{
                        padding: '80px 30px', // Increase padding for taller appearance
                        }}
                    >
                        <h4 className="card-title text-center mb-4">Employee Login</h4>
                        <form onSubmit={onSubmitForm}>
                        <div className="mb-3">
                            <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Email"
                            value={email}
                            onChange={onChange}
                            required
                            />
                        </div>
                        <div className="mb-3">
                            <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={onChange}
                            required
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-success w-100 mb-3"
                        >
                            Login
                        </button>
                        <div className="text-center">
                            <Link to="/forgot-password" className="small">
                            Forgot password?
                            </Link>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <ToastContainer/>
        </Fragment>
    );
}

export default EmployeeLogin;