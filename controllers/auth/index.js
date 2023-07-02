const { ctrlWrapper } = require("../../helpers");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const resendVerify = require("./resendVerify");
const signin = require("./signin");
const signup = require("./signup");
const updateAvatar = require("./updateAvatar");
const updateSubscription = require("./updateSubscription");
const verify = require("./verify");

module.exports = {
   signup: ctrlWrapper(signup),
   signin: ctrlWrapper(signin),
   getCurrent: ctrlWrapper(getCurrent),
   logout: ctrlWrapper(logout),
   updateSubscription: ctrlWrapper(updateSubscription),
   updateAvatar: ctrlWrapper(updateAvatar),
   verify: ctrlWrapper(verify),
   resendVerify: ctrlWrapper(resendVerify),
};
