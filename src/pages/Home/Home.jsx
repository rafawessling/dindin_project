import { useState } from 'react';
import AddTransaction from '../../components/AddTransaction/AddTransaction';
import Button from '../../components/Button/Button';
import EditTransaction from '../../components/EditTransaction/EditTransaction';
import EditUser from '../../components/EditUser/EditUser';
import FilterCategory from '../../components/FilterCategory/FilterCategory';
import Header from '../../components/Header/Header';
import Modal from '../../components/Modal/Modal';
import SummaryTransactions from '../../components/SummaryTransactions/SummaryTransactions';
import TableTransactions from '../../components/TableTransactions/TableTransactions';
import './Home.css';

function Home() {
    const [editUser, setEditUser] = useState(false);
    const [addTransaction, setAddTransaction] = useState(false);

    const [transactions, setTransactions] = useState([]);
    const [editTransaction, setEditTransaction] = useState(false);
    const [currentTransaction, setCurrentTransaction] = useState(null);
    const [selectCategory, setSelectCategory] = useState({
        id: 0,
        name: '',
    });
    const [showFilter, setShowFilter] = useState(false);
    const [isFiltered, setIsFiltered] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);

    return (
        <main className="container-home">
            <Header setEditUser={setEditUser} />
            <article className="container-content-home">
                <section className="content-home">
                    <section className="left-side-main">
                        <FilterCategory
                            showFilter={showFilter}
                            setShowFilter={setShowFilter}
                            selectedFilters={selectedFilters}
                            setSelectedFilters={setSelectedFilters}
                            transactions={transactions}
                            setIsFiltered={setIsFiltered}
                            setFilteredTransactions={setFilteredTransactions}
                        />
                        <TableTransactions
                            transactions={transactions}
                            setTransactions={setTransactions}
                            setEditTransaction={setEditTransaction}
                            setCurrentTransaction={setCurrentTransaction}
                            isFiltered={isFiltered}
                            filteredTransactions={filteredTransactions}
                            showFilter={showFilter}
                        />
                    </section>
                    <section className="right-side-main">
                        <SummaryTransactions
                            transactions={transactions}
                            filteredTransactions={filteredTransactions}
                            isFiltered={isFiltered}
                        />
                        <Button type="button" className="btn-add-transaction" onClick={() => setAddTransaction(true)}>
                            Add Transaction
                        </Button>
                    </section>
                </section>
            </article>

            {editUser && (
                <>
                    <Modal className="edit-user">
                        <EditUser setEditUser={setEditUser} />
                    </Modal>
                </>
            )}
            {addTransaction && (
                <>
                    <Modal className="add-update-register">
                        <AddTransaction
                            setAddTransaction={setAddTransaction}
                            transactions={transactions}
                            setTransactions={setTransactions}
                            selectCategory={selectCategory}
                            setSelectCategory={setSelectCategory}
                        />
                    </Modal>
                </>
            )}
            {editTransaction && (
                <Modal className="add-update-register">
                    <EditTransaction
                        transactions={transactions}
                        setTransactions={setTransactions}
                        setEditTransaction={setEditTransaction}
                        currentTransaction={currentTransaction}
                    />
                </Modal>
            )}
        </main>
    );
}

export default Home;
