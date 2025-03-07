const { ctrlWrapper } = require("../utils");
const {Contact} = require("../models/contact");

const { HttpError } = require("../helpers");

const getAllContacts = async (req, res) => {
  const {_id: owner} = req.user;
  const {page = 1, limit = 20} = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({owner, favorite:true}, "-__v", {skip, limit}).populate("owner", "name email");
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId)
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const {_id: owner} = req.user;
  const result = await Contact.create({...req.body, owner});
  res.status(201).json(result);
};

const deleteContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "contact deleted",
  });
};

const updateContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {new:true});
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json(result);
};

const updateFavoriteById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {new:true});
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json(result);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  addContact: ctrlWrapper(addContact),
  getContactById: ctrlWrapper(getContactById),
  deleteContactById: ctrlWrapper(deleteContactById),
  updateContactById: ctrlWrapper(updateContactById),
  updateFavoriteById: ctrlWrapper(updateFavoriteById),
};
