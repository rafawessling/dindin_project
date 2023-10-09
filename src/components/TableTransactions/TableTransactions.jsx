/* eslint-disable react/prop-types */
import { useState } from 'react';
import Transactions from '../Transactions/Transactions';
import SortDatesOld from '../../assets/sort-dates-old.png';
import SortDatesNew from '../../assets/sort-dates-new.png';
import './TableTransactions.css';

function TableTransactions({
    transactions,
    setTransactions,
    setEditTransaction,
    setCurrentTransaction,
    isFiltered,
    filteredTransactions,
    showFilter,
}) {
    const [orderDate, setOrderDate] = useState('oldFirst');

    const handleSortDates = () => {
        const sortDates = [...transactions];

        sortDates.sort((a, b) => {
            const dateA = +new Date(a.date);
            const dateB = +new Date(b.date);
            return orderDate === 'oldFirst' ? dateA - dateB : dateB - dateA;
        });

        setOrderDate(orderDate === 'oldFirst' ? 'newFirst' : 'oldFirst');
        setTransactions(sortDates);
    };

    return (
        <section className="table-container">
            <table className="main-table">
                <thead className="head-main-table">
                    <tr>
                        <th className="col1 date-head">
                            Date{' '}
                            <img
                                src={orderDate === 'oldFirst' ? SortDatesOld : SortDatesNew}
                                alt="Blue triangle"
                                onClick={() => handleSortDates()}
                            />
                        </th>
                        <th className="col2">Day of the week</th>
                        <th className="col3">Description</th>
                        <th className="col4">Category</th>
                        <th className="col5">Amount</th>
                        <th className="col6">&nbsp;</th>
                    </tr>
                </thead>
                <tbody className={showFilter ? 'container-body-table smaller-table' : 'container-body-table'}>
                    {!isFiltered ? (
                        <Transactions
                            transactions={transactions}
                            setTransactions={setTransactions}
                            setEditTransaction={setEditTransaction}
                            setCurrentTransaction={setCurrentTransaction}
                            isFiltered={isFiltered}
                            filteredTransactions={filteredTransactions}
                        />
                    ) : (
                        <Transactions
                            transactions={filteredTransactions}
                            setTransactions={setTransactions}
                            setEditTransaction={setEditTransaction}
                            setCurrentTransaction={setCurrentTransaction}
                            isFiltered={isFiltered}
                        />
                    )}
                </tbody>
            </table>
        </section>
    );
}

export default TableTransactions;
