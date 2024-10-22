const Category = require('../models/categoryModel');

// Add a new category
const addCategory = async (req, res) => {
    try {
        const { name, type } = req.body;

        // Validate request data
        if (!name || !type || (type !== 'income' && type !== 'expense')) {
            return res.status(400).json({ error: 'Invalid category type or name' });
        }

        // Create the category
        const category = new Category({ name, type });
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all categories
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get category by ID
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a category by ID
const updateCategory = async (req, res) => {
    try {
        const { name, type } = req.body;

        if (!name || !type || (type !== 'income' && type !== 'expense')) {
            return res.status(400).json({ error: 'Invalid category type or name' });
        }

        const category = await Category.findByIdAndUpdate(
            req.params.id,
            { name, type },
            { new: true }
        );

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a category by ID
const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};
