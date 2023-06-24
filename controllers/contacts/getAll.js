const { Contact } = require("../../models");

const getAll = async (req, res, next) => {
   const { _id } = req.user;
   const { page = 1, limit = 20, ...query } = req.query;
   const skip = (page - 1) * limit;

   const result = await Contact.find({ owner: _id, ...query }, "", {
      skip,
      limit,
   }).populate("owner", "email name");

   res.status(200).json(result);
};

module.exports = getAll;
