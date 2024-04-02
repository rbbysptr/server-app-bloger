const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const PostController = require('../controllers/PostController');
const authorization = require('../middleware/authorization');
const authentication = require('../middleware/authentication');

router.use(authentication);

router.get('/', PostController.showPost);
router.post('/',authentication,authorization, PostController.createPost);
router.get('/:id', authentication, authorization, PostController.getPostById);
router.put('/:id', authentication, authorization, PostController.updatePost);
router.delete('/:id', authentication, authorization, PostController.deleteById);
router.patch('/:id/image-Url', authorization, upload.single("bentukfile"), PostController.uploadImgUrl);
module.exports = router;
