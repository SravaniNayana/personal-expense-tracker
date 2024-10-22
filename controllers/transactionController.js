const Transaction = require('../models/transactionModel');
const Category = require('../models/categoryModel');

// Add new transaction
const addTransaction = async (req, res) => {
    try {
        const { type, category, amount, description } = req.body;
        const categoryExists = await Category.findById(category);

        if (!categoryExists) {
            return res.status(404).json({ error: 'Category not found' });
        }

        const transaction = new Transaction({
            type,
            category,
            amount,
            description
        });

        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all transactions
const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().populate('category');
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a transaction by ID
const getTransactionById = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id).populate('category');
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a transaction by ID
const updateTransaction = async (req, res) => {
    try {
        const { type, category, amount, description } = req.body;
        const transaction = await Transaction.findByIdAndUpdate(
            req.params.id, 
            { type, category, amount, description },
            { new: true }
        );
        
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        res.status(200).json(transaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a transaction by ID
const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndDelete(req.params.id);
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addTransaction,
    getTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction
};
