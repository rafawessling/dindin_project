import { useEffect, useState } from 'react';
import { formatAmount } from '../../utils/formatData';
import './SummaryTransactions.css';

function SummaryTransactions({ transactions, filteredTransactions, isFiltered }) {
    const [deposits, setDeposits] = useState(0);
    const [withdrawals, setWithdrawals] = useState(0);
    const balance = deposits - withdrawals;

    useEffect(() => {
        let totalDeposits = 0;
        let totalWithdrawals = 0;
        let transactionsList;

        if (isFiltered) {
            transactionsList = [...filteredTransactions];
        } else {
            transactionsList = [...transactions];
        }

        transactionsList.forEach(transaction => {
            const amount = Number(transaction.amount);

            if (isNaN(amount)) return;

            if (transaction.withdrawal) {
                totalWithdrawals += amount;
            } else {
                totalDeposits += amount;
            }
        });

        setDeposits(totalDeposits.toFixed(2));
        setWithdrawals(totalWithdrawals.toFixed(2));
    }, [transactions, filteredTransactions]);

    return (
        <section className="container-summary-table">
            <section className="content-summary">
                <h3 className="title-summary-table">Summary</h3>
                <table className="summary-table">
                    <tbody>
                        <tr className="row">
                            <th className="default-row" scope="row">
                                Deposits
                            </th>
                            <td className="deposit-summary">{formatAmount(deposits)}</td>
                        </tr>
                        <tr className="row">
                            <th className="default-row" scope="row">
                                Withdrawals
                            </th>
                            <td className="withdrawal-summary">{formatAmount(withdrawals)}</td>
                        </tr>
                        <tr className="line">
                            <td colSpan="2"></td>
                        </tr>
                        <tr className="row">
                            <th className="balance-summary" scope="row">
                                Balance
                            </th>
                            <td className="final-balance">{formatAmount(balance)}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </section>
    );
}

export default SummaryTransactions;
