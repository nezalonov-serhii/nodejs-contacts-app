const express = require("express");

const authController = require("../../controllers/auth");

const { schemasUser } = require("../../models");
const { validateBody, upload, authenticate } = require("../../middlewares");

const router = express.Router();

router.post(
   "/register",
   validateBody(schemasUser.userRegisterSchema),
   authController.signup
);

router.post(
   "/login",
   validateBody(schemasUser.userLoginSchema),
   authController.signin
);
router.post("/logout", authenticate, authController.logout);
router.get("/current", authenticate, authController.getCurrent);
router.patch("/", authenticate, authController.updateSubscription);
router.patch(
   "/avatars",
   authenticate,
   upload.single("avatar"),
   authController.updateAvatar
);

module.exports = router;
