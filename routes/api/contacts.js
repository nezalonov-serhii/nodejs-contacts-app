const express = require("express");
const {
   getAll,
   getContactById,
   addContact,
   removeContact,
   updateContact,
   updateStatusContact,
} = require("../../controllers/contacts");
const { validateBody, authenticate } = require("../../middlewares");
const { schemasContact } = require("../../models");
const isValidId = require("../../middlewares/validateId");

const router = express.Router();

router.use(authenticate);

router.get("/", getAll);
router.get("/:contactId", isValidId, getContactById);
router.post("/", validateBody(schemasContact.contactsAddSchema), addContact);
router.delete("/:contactId", isValidId, removeContact);
router.put(
   "/:contactId",
   isValidId,
   validateBody(schemasContact.contactsAddSchema),
   updateContact
);
router.patch(
   "/:contactId/favorite",
   isValidId,
   validateBody(schemasContact.updateFavoriteSchema),
   updateStatusContact
);

module.exports = router;
