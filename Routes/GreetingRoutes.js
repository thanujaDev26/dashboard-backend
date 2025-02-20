const Greeter = require("../Controllers/GreetingMessage")
const router = require("express").Router()


router.route("/greeting")
    .get(Greeter.greetingMessage)


module.exports = router