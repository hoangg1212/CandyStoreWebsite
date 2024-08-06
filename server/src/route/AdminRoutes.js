const express = require('express');
const router = express.Router();

const ControllerAdmin = require('../controller/ControllerAdmin/ControllerAdmin');

router.get('/api/auth/me', ControllerAdmin.GetDataAuth);

router.get('/api/getorder', ControllerAdmin.GetDataOrder);
router.get('/api/datauser', ControllerAdmin.GetUser);
router.post('/api/addproduct', ControllerAdmin.AddProduct);
router.post('/api/deleteproduct', ControllerAdmin.DeleteProduct);
router.post('/api/editproduct', ControllerAdmin.EditProduct);
router.post('/api/checkproduct', ControllerAdmin.checkProduct);
router.post('/api/deleteorder', ControllerAdmin.DeleteOrder);
router.get('/api/allcontact', ControllerAdmin.getAllContact);
router.get('/api/datatest', ControllerAdmin.DataSumPrice);
router.post('/api/feedbackadmin', ControllerAdmin.FeedbackAdmin);

module.exports = router;
