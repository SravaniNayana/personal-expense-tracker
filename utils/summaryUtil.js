const Transaction = require('../models/transactionModel');

const getSummary = async (req, res) => {
    const { startDate, endDate, category } = req.query;
    
    let filter = {};
    if (startDate || endDate) {
        filter.date = {};
        if (startDate) filter.date.$gte = new Date(startDate);
        if (endDate) filter.date.$lte = new Date(endDate);
    }
    if (category) {
        filter.category = category;
    }

    try {
        const transactions = await Transaction.find(filter);
        const income = transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
        const expenses = transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        res.status(200).json({
            totalIncome: income,
            totalExpenses: expenses,
            balance: income - expenses
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getSummary };
