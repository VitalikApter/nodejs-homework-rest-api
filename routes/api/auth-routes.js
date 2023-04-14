const express = require("express");

const ctrl = require("../../controllers/auth-controllers");

const {validateBody} = require("../../utils");

const {schemas} = require("../../models/user");

const router = express.Router();

// signup
router.post("/users/register", validateBody(schemas.registerSchema), ctrl.register);

module.exports = router;