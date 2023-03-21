const express = require('express');
const sneackersController = require('../../controllers/sneackers.controller');
const router = express.Router();


router
.route('/sneackers')
/**
 * get all user from db
 * need access to token on the request header
 *
 */
.get(sneackersController.getAllSneackers)

router
.route('/sneackers/:id')
/**
 * get all user from db
 * need access to token on the request header
 *
 */
.get(sneackersController.getSingleSneacker)

router
.route('/bestseller')
/**
 * get best seller items
 * need access to token on the request header
 *
 */
.get(sneackersController.getBestSeller)

router
.route('/ourteam')
/**
 * get all team member
 * need access to token on the request header
 *
 */
.get(sneackersController.getTeamMember)

router.route('/blogs')
/**
 * get latest blogs
 * need access to token on the request header
 *
 */
.get(sneackersController.getLatestBlog)
router.route('/related')
.get(sneackersController.getRelatedProducts)
module.exports = router;


