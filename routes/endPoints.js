const express=require("express")
const router = express.Router()
const {login} = require('../controllers/loginController');
const { getEmpleados, delEmpleado, postEmpleado } = require("../controllers/empleadoController");

router.post('/login',login);

router.get('/getEmpleados', getEmpleados);
router.delete('/delEmpleado/:id', delEmpleado);
router.post('/postEmpleado', postEmpleado);

module.exports = router;