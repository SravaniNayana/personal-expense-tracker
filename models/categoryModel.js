const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    type: { 
        type: String, 
        required: true, 
        enum: ['income', 'expense'] 
    }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
