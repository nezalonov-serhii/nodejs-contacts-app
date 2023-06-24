const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;

const contactSchema = new Schema(
   {
      name: {
         type: String,
         required: [true, "Set name for contact"],
      },
      email: {
         type: String,
      },
      phone: {
         type: String,
      },
      favorite: {
         type: Boolean,
         default: false,
      },
      owner: {
         type: Schema.Types.ObjectId,
         ref: "user",
      },
   },
   { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const contactsAddSchema = Joi.object({
   name: Joi.string().required(),
   email: Joi.string().email({ tlds: false }).required(),
   phone: Joi.string()
      .pattern(phonePattern)
      .messages({
         "string.pattern.base":
            "Invalid phone number format. The format should be (XXX) XXX-XXXX.",
      })
      .required(),
   favorite: Joi.bool(),
});

const updateFavoriteSchema = Joi.object({
   favorite: Joi.boolean().required(),
});

const schemasContact = {
   contactsAddSchema,
   updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
   Contact,
   schemasContact,
};
