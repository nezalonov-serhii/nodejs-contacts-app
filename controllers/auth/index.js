const { ctrlWrapper } = require("../../helpers");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const signin = require("./signin");
const signup = require("./signup");
const updateSubscription = require("./updateSubscription");

module.exports = {
   signup: ctrlWrapper(signup),
   signin: ctrlWrapper(signin),
   getCurrent: ctrlWrapper(getCurrent),
   logout: ctrlWrapper(logout),
   updateSubscription: ctrlWrapper(updateSubscription),
};
