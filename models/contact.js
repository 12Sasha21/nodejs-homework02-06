const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.bool(),
});

const favoriteJoiSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const schemas = {
  joiSchema,
  favoriteJoiSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};
