import { useState } from 'react';
import { getDay } from 'date-fns';
import { formatAmount, formatDate } from '../../utils/formatData';
import IconDelete from '../../assets/icon-delete.png';
import IconEdit from '../../assets/icon-edit.png';
import PopupDelete from '../../components/PopupDelete/PopupDelete';
import './Transactions.css';

function Transactions({ transactions, setTransactions, setEditTransaction, setCurrentTransaction }) {
    const [showPopup, setShowPopup] = useState(null);
    const [transactionToDelete, setTransactionToDelete] = useState(null);

    const handleGetDay = date => {
        try {
            const dayOfWeek = getDay(new Date(date));

            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

            return days[dayOfWeek];
        } catch (error) {
            return error.message;
        }
    };

    const handleEditTransaction = transaction => {
        try {
            setEditTransaction(true);
            setCurrentTransaction({ ...transaction });
        } catch (error) {
            return error.message;
        }
    };

    const handleDeleteTransaction = id => {
        setShowPopup(prevShowPopup => (prevShowPopup === id ? null : id));
        setTransactionToDelete(id);
    };

    const handleConfirmDelete = () => {
        try {
            const currTransactions = transactions.filter(transaction => transaction.id !== transactionToDelete);

            setTransactions(currTransactions);
            setShowPopup(false);
        } catch (error) {
            return error.message;
        }
    };

    return transactions.length > 0 ? (
        transactions.map(transaction => (
            <tr className="body-main-table" key={transaction.id}>
                <td className="date-table col1">{formatDate(transaction.date)}</td>
                <td className="col2">{handleGetDay(transaction.date)}</td>
                <td className="col3">{transaction.description}</td>
                <td className="col4">{transaction.category.name}</td>
                <td
                    className={
                        transaction.withdrawal
                            ? 'amount-table col5 withdrawal-value'
                            : 'amount-table col5 deposit-value'
                    }
                >
                    {formatAmount(transaction.amount)}
                </td>
                <td className="col6">
                    <div className="container-edit-delete">
                        <img
                            src={IconEdit}
                            alt="Gray pencil with black tip and and black strip"
                            onClick={() => handleEditTransaction(transaction)}
                        />
                        <img
                            src={IconDelete}
                            alt="Trash can in purple tones"
                            onClick={() => handleDeleteTransaction(transaction.id)}
                        />
                        {showPopup === transaction.id && (
                            <PopupDelete onConfirm={handleConfirmDelete} onCancel={() => setShowPopup(null)} />
                        )}
                    </div>
                </td>
            </tr>
        ))
    ) : (
        <div className="no-content">
            <span>No content</span>
        </div>
    );
}

export default Transactions;
