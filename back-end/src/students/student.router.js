const router = require("express").Router();
const controller = require("./student.controller");

router.route("/Tables")
    .get(controller.list)

router.route("/")
    .post(controller.create)

module.exports = router;