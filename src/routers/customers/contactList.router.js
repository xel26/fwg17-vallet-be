const contactListRouter = require("express").Router()

// controller
const contactListController = require('../../controllers/customers/contactList.controller') 

// end point
contactListRouter.get('/', contactListController.getAllData)
<<<<<<< HEAD
contactListRouter.get('/:id', contactListController.getOneData)
=======
contactListRouter.get('/:id', contactListController.getDetailTransfer)
>>>>>>> 7fcb0f74e4fbbd03875d39e78d700206b492edfa

module.exports = contactListRouter