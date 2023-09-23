import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setItem } from '../../utils/storage';
import { validateUserForm } from '../../utils/validateForm';
import Button from '../Button/Button';
import '../../styles/Register-LoginForm.css';
import './RegisterForm.css';
import '../../styles/Error.css';

function RegisterForm() {
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
    });

    const { name, email, password, passwordConfirmation } = formValues;

    const [formErrors, setFormErrors] = useState({});

    const handleChangeInput = event => {
        const { name, value } = event.target;

        setFormValues({ ...formValues, [name]: value });
    };

    const handleRegister = () => {
        setItem('name', name);
        setItem('email', email);
        setItem('password', password);
        setItem('passwordConfirmation', passwordConfirmation);
    };

    const handleSubmit = event => {
        event.preventDefault();

        try {
            const fieldsForm = {
                name,
                email,
                password,
                passwordConfirmation,
            };

            const errors = validateUserForm(fieldsForm);

            setFormErrors(errors);

            if (Object.keys(errors).length === 0) {
                handleRegister();
                navigate('/');
            }
        } catch (error) {
            return error.message;
        }
    };

    return (
        <form className="container-form-register" onSubmit={handleSubmit}>
            <h3 className="title-form">Register</h3>
            <section className="inputs-register-content">
                <div className="container-input">
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" type="text" value={name} onChange={handleChangeInput} />
                    {formErrors.name && <p className="error">{formErrors.name}</p>}
                </div>

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
                </div>
                <div className="container-input">
                    <label htmlFor="passwordConfirmation ">Password Confirmation</label>
                    <input
                        id="passwordConfirmation"
                        name="passwordConfirmation"
                        type="password"
                        value={passwordConfirmation}
                        onChange={handleChangeInput}
                    />
                    {formErrors.passwordConfirmation && <p className="error">{formErrors.passwordConfirmation}</p>}
                </div>
            </section>

            <section className="redirect-content">
                <Button type="submit" className="btn-login-register">
                    Register
                </Button>

                <Link to="/">
                    <span className="back-login">Already have registration? Click here!</span>
                </Link>
            </section>
        </form>
    );
}

export default RegisterForm;
