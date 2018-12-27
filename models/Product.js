const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: String,
  thumbnail: String,
  shortDescription: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    ref: 'Category',
  },
  salePrice: {
    type: Number,
    required: true,
    validate: {
      validator(v) {
        return /^(\$)?([1-9]{1}[0-9]{0,2})(\,\d{3})*(\.\d{2})?$|^(\$)?([1-9]{1}[0-9]{0,2})(\d{3})*(\.\d{2})?$|^(0)?(\.\d{2})?$|^(\$0)?(\.\d{2})?$|^(\$\.)(\d{2})?$/gm.test(v);
      },
      message: props => `${props.value} is not a valid price!`,
    },
  },
  originalPrice: {
    type: Number,
    required: true,
    validate: {
      validator(v) {
        return /^(\$)?([1-9]{1}[0-9]{0,2})(\,\d{3})*(\.\d{2})?$|^(\$)?([1-9]{1}[0-9]{0,2})(\d{3})*(\.\d{2})?$|^(0)?(\.\d{2})?$|^(\$0)?(\.\d{2})?$|^(\$\.)(\d{2})?$/gm.test(v);
      },
      message: props => `${props.value} is not a valid price!`,
    },
  },
  images: [String],
  thumbnails: [String],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
