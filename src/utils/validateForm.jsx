import { getItem } from './storage';

const validateUserForm = fieldsForm => {
    const errors = {};

    for (const field in fieldsForm) {
        if (!fieldsForm[field]) {
            errors[field] = 'Required field';
        }
    }

    if (fieldsForm.password !== fieldsForm.passwordConfirmation) {
        errors.passwordConfirmation = 'Passwords must match';
    }

    return errors;
};

const validateLoginForm = (email, password) => {
    try {
        const errors = {};

        if (!email || !password) {
            if (!email) errors.email = 'Required field';
            if (!password) errors.password = 'Required field';
        } else {
            const storedEmail = getItem('email');
            const storedPassword = getItem('password');

            if (email !== storedEmail || password !== storedPassword) {
                errors.token = 'Invalid credentials';
            }
        }

        return errors;
    } catch (error) {
        return error.message;
    }
};

const validateTransactionForm = fieldsForm => {
    const errors = {};

    for (const field in fieldsForm) {
        if (!fieldsForm[field]) {
            errors[field] = 'Required field';
        } else if (field === 'amount') {
            const amountValue = parseFloat(fieldsForm.amount);

            if (isNaN(amountValue)) {
                errors.amount = 'Please, enter a valid amount';
            } else if (amountValue <= 0) {
                errors.amount = 'Amount must be a positive number';
            }
        }
    }

    return errors;
};

export { validateUserForm, validateLoginForm, validateTransactionForm };
