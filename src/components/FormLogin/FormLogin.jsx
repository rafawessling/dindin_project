import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getItem, setItem } from '../../utils/storage';
import { validateLoginForm } from '../../utils/validateForm';
import Button from '../Button/Button';
import '../../styles/Register-LoginForm.css';
import '../../styles/Error.css';

function FormLogin() {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [formErrors, setFormErrors] = useState({});

    const { email, password } = form;
    const navigate = useNavigate();

    const handleChangeInput = event => {
        const { name, value } = event.target;

        setForm({ ...form, [name]: value });
    };

    const handleSubmit = event => {
        event.preventDefault();

        try {
            const errors = validateLoginForm(email, password);

            setFormErrors(errors);

            if (Object.keys(errors).length === 0) {
                const token = 'testToken';
                setItem('token', token);

                setForm({
                    email: '',
                    password: '',
                });

                navigate('/home');
            }
        } catch (error) {
            return error.message;
        }
    };

    useEffect(() => {
        const token = getItem('token');

        if (token) {
            navigate('/home');
        }
    });

    return (
        <form onSubmit={handleSubmit} className="container-form-login">
            <h3 className="title-form">Login</h3>
            <section className="inputs-login-content">
                <div className="container-input">
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" value={email} onChange={handleChangeInput} />
                    {formErrors.email && <p className="error">{formErrors.email}</p>}
                </div>
                <div className="container-input">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={handleChangeInput}
                    />
                    {formErrors.password && <p className="error">{formErrors.password}</p>}
                    {formErrors.token && <p className="error">{formErrors.token}</p>}
                </div>
            </section>
            <Button type="submit" className="btn-login-register btn-login">
                Signin
            </Button>
        </form>
    );
}

export default FormLogin;
