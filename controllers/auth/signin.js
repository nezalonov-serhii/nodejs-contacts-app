const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../models");
const { HttpError } = require("../../helpers");

const { SECRET_KEY } = process.env;

const signin = async (req, res) => {
   const { email, password } = req.body;
   const user = await User.findOne({ email });
   if (!user) {
      throw HttpError(401, "Email or password is wrong");
   }

   if (!user.verify) {
      throw HttpError(401, "Email not verified");
   }

   const passwordCompare = await bcrypt.compare(password, user.password);
   if (!passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
   }

   const payload = {
      id: user._id,
   };

   const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
   await User.findByIdAndUpdate(user._id, { token });

   res.json({
      token,
      user: {
         email: user.email,
         subscription: user.subscription,
      },
   });
};

module.exports = signin;
