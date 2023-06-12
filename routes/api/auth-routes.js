const express = require("express");

const authController = require("../../controllers/auth");

const { schemasUser } = require("../../models");
const { validateBody } = require("../../middlewares");

const { authenticate } = require("../../middlewares");

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

module.exports = router;
