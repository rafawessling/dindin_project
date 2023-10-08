/* eslint-disable react/prop-types */
import { categoriesExpenses, categoriesIncomes } from '../../utils/categories';
import Filter from '../../assets/filter.png';
import './FilterCategory.css';

function renderCategories(categories, selectedFilters, handleChangeFilter) {
    return categories.map(category => (
        <div
            className={`each-category ${selectedFilters.includes(category.name) && 'selected-category'}`}
            key={category.id}
            value={category.id}
            onClick={() => handleChangeFilter(category.name)}
        >
            <span>{category.name}</span>
            <span>{selectedFilters.includes(category.name) ? 'x' : '+'}</span>
        </div>
    ));
}

function FilterCategory({
    showFilter,
    setShowFilter,
    selectedFilters,
    setSelectedFilters,
    transactions,
    setIsFiltered,
    setFilteredTransactions,
}) {
    const handleChangeFilter = categoryName => {
        if (
            selectedFilters.some(category => {
                return category === categoryName;
            })
        ) {
            const removedCategory = selectedFilters.filter(category => {
                return category !== categoryName;
            });
            return setSelectedFilters(removedCategory);
        }

        return setSelectedFilters(prevFilters => [...prevFilters, categoryName]);
    };

    const handleFilterTransactions = () => {
        if (selectedFilters.length) {
            const filterCategoryTransactions = transactions.filter(item =>
                selectedFilters.includes(item.category.name)
            );
            setIsFiltered(true);
            setFilteredTransactions(filterCategoryTransactions);
        } else {
            setIsFiltered(false);
            setFilteredTransactions([]);
        }
    };

    const handleCleanFilter = () => {
        setFilteredTransactions([]);
        setSelectedFilters([]);
        setIsFiltered(false);
    };

    return (
        <section>
            <section className="container-filter" onClick={() => setShowFilter(!showFilter)}>
                <img className="img-filter" src={Filter} alt="Filter icon in blue tones" />
                <span className="name-filter">Filter</span>
            </section>
            {showFilter && (
                <section className="filter-categories">
                    <strong className="name-categories">Categories</strong>
                    <section className="box-categories">
                        {renderCategories(categoriesExpenses, selectedFilters, handleChangeFilter)}
                        {renderCategories(categoriesIncomes, selectedFilters, handleChangeFilter)}
                    </section>
                    <div className="container-btn-filters">
                        <button className="btn-filters btn-clean" onClick={handleCleanFilter}>
                            Clean Filters
                        </button>
                        <button className="btn-filters btn-apply" onClick={handleFilterTransactions}>
                            Apply Filters
                        </button>
                    </div>
                </section>
            )}
        </section>
    );
}

export default FilterCategory;
