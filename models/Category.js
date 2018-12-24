const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = new Schema({
  _id: String,
  name: String,
  iconName: String,
  descriptions: String,
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
