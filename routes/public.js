const express = require("express");
const PublicController = require("../controllers/publicController");

const router = express.Router();

router.get("/posts", PublicController.getAllPost);
router.get("/posts/:id", PublicController.getPostById);


module.exports = router;
