import { useState } from 'react';
import { getItem, setItem } from '../../utils/storage';
import { validateUserForm } from '../../utils/validateForm';
import CloseIcon from '../../assets/close-icon.png';
import Button from '../../components/Button/Button';
import './EditUser.css';
import '../../styles/Error.css';

function EditUser({ setEditUser }) {
    const [currentUser, setCurrentUser] = useState({
        name: getItem('name'),
        email: getItem('email'),
        password: getItem('password'),
        passwordConfirmation: getItem('passwordConfirmation'),
    });

    const { name, email, password, passwordConfirmation } = currentUser;

    const [formErrors, setFormErrors] = useState({});

    const handleChangeInput = event => {
        const { name, value } = event.target;

        setCurrentUser({ ...currentUser, [name]: value });
    };

    const handleEditUser = () => {
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
                handleEditUser();
                setEditUser(false);
            }
        } catch (error) {
            return error.message;
        }
    };

    return (
        <form className="form-modal-edit-user" onSubmit={handleSubmit}>
            <div className="header-modal">
                <h3 className="title-modal">Edit User</h3>
                <img
                    src={CloseIcon}
                    alt="Letter x in black used to close the modal"
                    onClick={() => setEditUser(false)}
                />
            </div>
            <section className="container-inputs-modal">
                <div className="container-input-modal">
                    <label id="label-name" htmlFor="name">
                        Name
                    </label>
                    <input id="name" name="name" type="text" value={name} onChange={handleChangeInput} />
                    {formErrors.name && <p className="error">{formErrors.name}</p>}
                </div>
                <div className="container-input-modal">
                    <label id="label-email" htmlFor="email">
                        Email
                    </label>
                    <input id="email" name="email" type="email" value={email} onChange={handleChangeInput} />
                    {formErrors.email && <p className="error">{formErrors.email}</p>}
                </div>
                <div className="container-input-modal">
                    <label id="label-password" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={handleChangeInput}
                    />
                    {formErrors.password && <p className="error">{formErrors.password}</p>}
                </div>
                <div className="container-input-modal">
                    <label id="label-passwordConfirmation" htmlFor="passwordConfirmation">
                        Password confirmation
                    </label>
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

            <Button type="submit" className="btn-redirect">
                Save
            </Button>
        </form>
    );
}

export default EditUser;
