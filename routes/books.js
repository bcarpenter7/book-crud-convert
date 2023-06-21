var express = require('express');
var router = express.Router();

const bookCtrl = require('../controllers/books')

/* GET users listing. */

// POST create (connected to the new, to actually change it)
router.post('/', bookCtrl.create)

// // POST search
router.post('/search', bookCtrl.showSearch)

// DELETE
router.delete('/:id', bookCtrl.delete)

// PUT (connected to EDIT, to actually change the information)
router.put('/:id', bookCtrl.update)

// EDIT (gets you to books/edit)
router.get('/:id/edit', bookCtrl.edit)

// GET all/Index
router.get('/', bookCtrl.index);

// GET new (gets you to books/new )
router.get('/new', bookCtrl.new)

// GET one
router.get('/:id', bookCtrl.show)






module.exports = router;
