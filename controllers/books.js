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
		console.log(oneBook.title)
		const jsonRes = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${oneBook.title}+inauthor:${oneBook.author}&api=AIzaSyA712kv4XX64tekfGyNf4uWoCoIq4wxfVc`)
		const data = await jsonRes.json();
		
		const context = {
			book: oneBook,
			title: oneBook.title,
			data: data.items[0],
			dataImg: data.items[0].volumeInfo.imageLinks.thumbnail,
			pages: data.items[0].volumeInfo.pageCount,
			genre: data.items[0].volumeInfo.categories[0]
		}
		console.log(data.items[0], data.items[0].pageCount)
		res.render('books/show', context)
	} catch (err) {
		console.log(err);
        res.render('error', {
			title: 'error',
			errorMsg: "not working"
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

