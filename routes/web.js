const  express = require( "express");
const router = express.Router();
const  VideoController = require("../controllers/VideoController.js");

router.get('/', VideoController.getAllDoc)

 router.get('/delete/', VideoController.deleteDocById)


module.exports = router
