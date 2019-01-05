const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      alias: 'thumbnail',
    },
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
  },
  { toJSON: { virtuals: true } }
);

productSchema.virtual('images').get(function() {
  return [this.image];
});
productSchema.virtual('thumbnails').get(function() {
  return [this.image]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
