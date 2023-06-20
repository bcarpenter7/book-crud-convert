const Book = require("../models/book")


module.exports = {
    index,
    show,
    new: newBook,
    create,
    delete: deleteBook,
    edit,
    update: updateBook
}


async function index(req, res){
    const booksAll = await Book.find({})
    const context = {
        books: booksAll,
		title: 'Books'
    }
    res.render('books/index', context)
}


async function show(req, res){
	try {
		const oneBook = await Book.findById(req.params.id)
		const context = {
			book: oneBook,
			title: oneBook.title
		}
		res.render('books/show', context)
	} catch (err) {
		console.log(err);
        res.render('error', {
			title: 'error',
			errorMsg: err.message
		});
	}
}

function newBook(req, res){
    res.render('books/new', {
		errorMsg: '',
		title: 'New Book'
	})
}

async function edit(req, res){
	try {
		const currentBook = await Book.findById(req.params.id)
		res.render('books/edit', {
			book: currentBook,
			title: `Edit ${currentBook.title}`,
			errorMsg: ''
		})
	} catch (err) {
		console.log(err);
        res.render('error', {
			message: 'You made an error',
			error: 'ERROR',
			title: 'error',
			errorMsg: err.message
		});
	}
}

async function updateBook(req, res){
	const book = await Book.findById(req.params.id);
    try {
        const bookId = req.params.id
        const bookBody = req.body

        await Book.findByIdAndUpdate(bookId, bookBody, {runValidators: true})
        /// Takes id to find it, req.body is what it is updating
        res.redirect(`/books/${bookId}`)
    } catch(err){
        console.log(err)
        res.render('books/edit', {
			book,
			message: 'You made an error',
			error: 'ERROR',
			title: 'error',
			errorMsg: err.message
		})
    }
}


async function create(req,res){
	try {
		await Book.create(req.body)
		res.redirect('/books')
	} catch(err){
		console.log(err.errors)
		res.render('books/new', {
			title: 'error',
			errorMsg: err
		})
	}
}

async function deleteBook(req, res){
    try {
        await Book.findByIdAndDelete(req.params.id)
        res.redirect('/books')
    } catch(err){
        console.log(err)
        res.render('error', {
			title: 'error',
			errorMsg: err.message
		})
    }
}