import { useState } from 'react';
import { categoriesExpenses, categoriesIncomes } from '../../utils/categories';
import { validateTransactionForm } from '../../utils/validateForm';
import CloseIcon from '../../assets/close-icon.png';
import Button from '../Button/Button';
import '../../styles/Add-EditTransaction.css';
import '../../styles/Error.css';

function EditTransaction({ transactions, setTransactions, setEditTransaction, currentTransaction }) {
    const [form, setForm] = useState({ ...currentTransaction });
    let { amount, date, description, withdrawal } = form;
    const [currentCategory, setCurrentCategory] = useState(currentTransaction.category);
    const [formErrors, setFormErrors] = useState({});
    const [categoryError, setCategoryError] = useState(false);

    const handleSubmit = event => {
        event.preventDefault();

        try {
            if (amount.includes(',')) {
                amount = amount.replace(',', '.');
            }
            const fieldsForm = {
                amount,
                category: !categoryError,
                date,
                description,
            };

            const errors = validateTransactionForm(fieldsForm);

            setFormErrors(errors);

            if (Object.keys(errors).length === 0) {
                const updatedTransaction = {
                    ...currentTransaction,
                    amount,
                    category: { id: currentCategory.id, name: currentCategory.name },
                    date,
                    description,
                    withdrawal,
                };

                const transactionsList = transactions.map(transaction => {
                    if (transaction.id === currentTransaction.id) {
                        return updatedTransaction;
                    }
                    return transaction;
                });

                setTransactions(transactionsList);
                setEditTransaction(false);
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
        const selectedCategoryId = Number(event.target.value);
        let currCategory;

        if (selectedCategoryId === 0) {
            setCategoryError(true);
            return;
        }

        if (withdrawal) {
            currCategory = categoriesExpenses.find(category => category.id === Number(event.target.value));
        } else {
            currCategory = categoriesIncomes.find(category => category.id === Number(event.target.value));
        }

        if (!currCategory) {
            return;
        }

        setCurrentCategory(currCategory);
        setCategoryError(false);
    };

    return (
        <form className="form-modal-add-transaction " onSubmit={handleSubmit}>
            <div className="header-modal">
                <h3 className="title-modal">Edit Transaction</h3>
                <img
                    src={CloseIcon}
                    alt="Letter x in black used to close the modal"
                    onClick={() => setEditTransaction(false)}
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
                    <label htmlFor="amount">Amount</label>
                    <input id="amount" name="amount" type="text" value={amount} onChange={handleChangeInputValue} />
                    {formErrors.amount && <p className="error">{formErrors.amount}</p>}
                </div>
                <div className="container-input-modal">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        name="category"
                        onChange={handleChangeCategory}
                        defaultValue={currentCategory.id}
                    >
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
                    <label htmlFor="date">Date</label>
                    <input id="date" name="date" type="date" value={date} onChange={handleChangeInputValue} />
                    {formErrors.date && <p className="error">{formErrors.date}</p>}
                </div>
                <div className="container-input-modal">
                    <label htmlFor="description">Description</label>
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

export default EditTransaction;
