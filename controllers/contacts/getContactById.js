const { HttpError } = require("../../helpers/");
const { Contact } = require("../../models");

const getContactById = async (req, res) => {
   const { contactId } = req.params;
   const result = await Contact.findById(contactId);

   if (!result) {
      throw HttpError(404, "Not found");
   }
   res.json(result);
};

module.exports = getContactById;
