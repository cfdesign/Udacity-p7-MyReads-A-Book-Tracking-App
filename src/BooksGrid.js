import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BooksGrid extends Component {
    static propTypes = {
        shelfBooks: PropTypes.array.isRequired,
        books: PropTypes.array.isRequired,
        updateShelf: PropTypes.func.isRequired
    }
    render() {
        const { books, updateShelf, shelfBooks } = this.props
        return (
            <ol className="books-grid">
            {/* shelfBooks array contains filtered books by shelf from previous component */}
            {shelfBooks.map((book) => (
                <li key={book.id}>
                    <Book
                        book={book}
                        books={books}
                        updateShelf={updateShelf}
                    />
                </li>
            ))}
            </ol>
        )
    }
}

export default BooksGrid