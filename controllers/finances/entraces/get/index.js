const modelFinancesEntraces = require('./../../../../models/finances/entraces')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const getFinanceEntraces = (req, res) => {
    const { userId } = req.user;

    modelFinancesEntraces.findAll({
        where: { [Op.and]: [{ userId }] },
        order: [['date', 'DESC']],
    })
        .then((data) => {
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth();
            const currentYear = currentDate.getFullYear();

            const entraces = data.reduce((acc, item) => {
                const date = new Date(item.date);
                const month = date.getMonth();
                const year = date.getFullYear();
                const monthNames = [
                    'January', 'February', 'March', 'April',
                    'May', 'June', 'July', 'August',
                    'September', 'October', 'November', 'December'
                ];
                const monthsDifference = (year - currentYear) * 12 + month - currentMonth;
                const monthsFromNow = monthsDifference === 0 ? 0 : monthsDifference < 0 ? monthsDifference + 1 : monthsDifference - 1;

                const existingEntryIndex = acc.findIndex(entry => entry.month === monthNames[month] && entry.year === year);

                if (existingEntryIndex !== -1) {
                    acc[existingEntryIndex].itens.push(item);
                    acc[existingEntryIndex].totalValue += item.value;
                } else {
                    acc.push({ month: monthNames[month], monthsFromNow, year, itens: [item], totalValue: item.value });
                }

                return acc;
            }, []);

            res.status(200).json(entraces);
        })
        .catch((error) => res.status(400).json(error));
}

module.exports = { getFinanceEntraces };
