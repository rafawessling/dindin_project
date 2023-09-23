import { format } from 'date-fns';

const formatAmount = amount => {
    try {
        const options = { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 };
        const formatNumber = new Intl.NumberFormat('pt-BR', options);

        return formatNumber.format(amount);
    } catch (error) {
        return error.message;
    }
};

const formatDate = date => {
    const formattedDate = format(new Date(date), 'dd/MM/yyyy');
    return formattedDate;
};

export { formatAmount, formatDate };
