const express=require("express")
const router = express.Router()
const {login} = require('../controllers/loginController');
const { getEmpleados, delEmpleado, postEmpleado, getEmpleadoId, updateEmpleado } = require("../controllers/empleadoController");
const { getCuentas, delCuentas, postCuentas } = require("../controllers/cuentaController");
const { getMenus, delMenus, postMenus } = require("../controllers/menuController");
const { getMovimientos, delMovimientos, postMovimientos } = require("../controllers/movimientoController");
const { getPlatillos, delPlatillos, postPlatillos, getPlatilloId, updatePlatillo } = require("../controllers/platilloController");
const { getProductos, delProductos, postProducto, getProductoId, updateProducto } = require("../controllers/productoController");
const { getProveedores, delProveedores, postProveedores, getProveedorId, updateProveedor } = require("../controllers/proveedorController");
const { getReservaciones, delReservaciones, postReservaciones, getReservaId, updateReserva } = require("../controllers/reservaController");

router.post('/login',login);

//Usuarios
router.get('/getEmpleados', getEmpleados);
router.delete('/delEmpleado/:id', delEmpleado);
router.post('/postEmpleado', postEmpleado);
router.get('/getEmpleadoId/:id', getEmpleadoId);
router.post('/updateEmpleado/:id', updateEmpleado);

//Cuentas
router.get('/getCuentas', getCuentas);
router.delete('/delCuenta/:id', delCuentas);
router.post('/postCuenta', postCuentas);

//Menu
router.get('/getMenus', getMenus);
router.delete('/delMenu/:id', delMenus);
router.post('/postMenu', postMenus);

//Movimientos
router.get('/getMovimientos', getMovimientos);
router.delete('/delMovimiento/:id', delMovimientos);
router.post('/postMovimiento', postMovimientos);

//Platillos
router.get('/getPlatillos', getPlatillos);
router.delete('/delPlatillo/:id', delPlatillos);
router.post('/postPlatillo', postPlatillos);
router.get('/getPlatillo/:id', getPlatilloId);
router.post('/updatePlatillo/:id', updatePlatillo);

//Productos
router.get('/getProductos', getProductos);
router.delete('/delProducto/:id', delProductos);
router.post('/postProducto', postProducto);
router.get('/getProductoId/:id', getProductoId);
router.post('/updateProducto/:id', updateProducto);

//Proveedores
router.get('/getProveedores', getProveedores);
router.delete('/delProveedor/:id', delProveedores);
router.post('/postProveedor', postProveedores);
router.get('/getProveedorId/:id', getProveedorId);
router.post('/updateProveedor/:id', updateProveedor);

//Reservaciones
router.get('/getReservaciones', getReservaciones);
router.delete('/delReserva/:id', delReservaciones);
router.post('/postReserva', postReservaciones);
router.get('/getReservaId/:id', getReservaId);
router.post('/updateReserva/:id', updateReserva);

module.exports = router;