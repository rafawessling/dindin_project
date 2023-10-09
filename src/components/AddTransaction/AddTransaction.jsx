import { useState } from 'react';
import { categoriesExpenses, categoriesIncomes } from '../../utils/categories';
import { validateTransactionForm } from '../../utils/validateForm';
import CloseIcon from '../../assets/close-icon.png';
import Button from '../Button/Button';
import '../../styles/Add-EditTransaction.css';
import '../../styles/Error.css';

const defaultTransaction = {
    id: 0,
    amount: '',
    date: '',
    description: '',
    withdrawal: true,
};

function AddTransaction({ setAddTransaction, transactions, setTransactions, selectCategory, setSelectCategory }) {
    const [form, setForm] = useState({
        ...defaultTransaction,
    });
    let { amount, date, description, withdrawal } = form;
    const [formErrors, setFormErrors] = useState({});

    const handleSubmit = event => {
        event.preventDefault();

        try {
            if (amount.includes(',')) {
                amount = amount.replace(',', '.');
            }

            const fieldsForm = {
                amount,
                category: selectCategory.id,
                date,
                description,
            };

            const errors = validateTransactionForm(fieldsForm);

            setFormErrors(errors);

            if (Object.keys(errors).length === 0) {
                setTransactions([
                    ...transactions,
                    {
                        id: Math.floor(Math.random() * (10000 - 1) + 1),
                        amount,
                        category: { id: selectCategory.id, name: selectCategory.name },
                        date,
                        description,
                        withdrawal,
                    },
                ]);
                setForm({ ...defaultTransaction });
                setAddTransaction(false);
                setSelectCategory({
                    id: 0,
                    name: '',
                });
            }
        } catch (error) {
            return error.message;
        }
    };

    const handleChangeInputValue = event => {
        const { name, value } = event.target;

        setForm({ ...form, [name]: value });
    };

    const handleChangeCategory = event => {
        let currCategory = '';

        if (withdrawal) {
            currCategory = categoriesExpenses.find(category => category.id === Number(event.target.value));
        } else {
            currCategory = categoriesIncomes.find(category => category.id === Number(event.target.value));
        }

        if (!currCategory) {
            return;
        }

        setSelectCategory(currCategory);
    };

    const handleCloseModal = () => {
        setAddTransaction(false);
        setForm({ ...defaultTransaction });
        setSelectCategory({
            id: 0,
            name: '',
        });
    };

    return (
        <form className="form-modal-add-transaction" onSubmit={handleSubmit}>
            <div className="header-modal">
                <h3 className="title-modal">Add Transaction</h3>
                <img
                    src={CloseIcon}
                    alt="Letter x in black used to close the modal"
                    onClick={() => handleCloseModal()}
                />
            </div>
            <div>
                <button
                    className={!withdrawal ? 'btn-deposit deposit-active' : 'btn-deposit'}
                    type="button"
                    onClick={() => setForm({ ...form, withdrawal: false })}
                >
                    Deposit
                </button>
                <button
                    className={withdrawal ? 'btn-withdrawal withdrawal-active' : 'btn-withdrawal'}
                    type="button"
                    onClick={() => setForm({ ...form, withdrawal: true })}
                >
                    Withdrawal
                </button>
            </div>
            <section className="container-inputs-modal">
                <div className="container-input-modal">
                    <label id="label-amount" htmlFor="amount">
                        Amount
                    </label>
                    <input id="amount" name="amount" type="text" value={amount} onChange={handleChangeInputValue} />
                    {formErrors.amount && <p className="error">{formErrors.amount}</p>}
                </div>
                <div className="container-input-modal">
                    <label id="label-category" htmlFor="category">
                        Category
                    </label>
                    <select id="category" name="category" value={selectCategory.id} onChange={handleChangeCategory}>
                        <option value="" />
                        {withdrawal
                            ? categoriesExpenses.map(category => (
                                  <option key={category.id} value={category.id}>
                                      {category.name}
                                  </option>
                              ))
                            : categoriesIncomes.map(category => (
                                  <option key={category.id} value={category.id}>
                                      {category.name}
                                  </option>
                              ))}
                    </select>
                    {formErrors.category && <p className="error">{formErrors.category}</p>}
                </div>
                <div className="container-input-modal">
                    <label id="label-date" htmlFor="date">
                        Date
                    </label>
                    <input
                        id="date"
                        name="date"
                        type="date"
                        value={date}
                        max="9999-12-31"
                        onChange={handleChangeInputValue}
                    />
                    {formErrors.date && <p className="error">{formErrors.date}</p>}
                </div>
                <div className="container-input-modal">
                    <label id="label-description" htmlFor="description">
                        Description
                    </label>
                    <input
                        id="description"
                        name="description"
                        type="text"
                        value={description}
                        onChange={handleChangeInputValue}
                    />
                    {formErrors.description && <p className="error">{formErrors.description}</p>}
                </div>
            </section>

            <Button type="submit" className="btn-redirect">
                Save
            </Button>
        </form>
    );
}

export default AddTransaction;
