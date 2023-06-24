const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
   {
      password: {
         type: String,
         required: [true, "Password is required"],
      },
      email: {
         type: String,
         required: [true, "Email is required"],
         unique: true,
      },
      subscription: {
         type: String,
         enum: ["starter", "pro", "business"],
         default: "starter",
      },
      avatarUrl: String,
      token: String,
      verify: {
         type: Boolean,
         default: false,
      },
      verificationToken: {
         type: String,
         required: [true, "Verify token is required"],
      },
   },
   { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

const userRegisterSchema = Joi.object({
   email: Joi.string().pattern(emailRegexp).required(),
   password: Joi.string().min(6).required(),
   subscription: Joi.string(),
});

const userLoginSchema = Joi.object({
   email: Joi.string().pattern(emailRegexp).required(),
   password: Joi.string().min(6).required(),
});

const userEmailSchema = Joi.object({
   email: Joi.string().pattern(emailRegexp).required(),
});

const schemasUser = {
   userRegisterSchema,
   userLoginSchema,
   userEmailSchema,
};

module.exports = {
   schemasUser,
   User,
};
