import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BgImage from './icons/no-cover.png'

class Book extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        books: PropTypes.array.isRequired,
        updateShelf: PropTypes.func.isRequired
    }

    render() {
        const { book, books, updateShelf } = this.props;

        let bookId = book.id,
        bookShelfValue,
        // The variable below checks the books state via id to find if the current book has a shelf.
        IdExists = books.find( book => book.id === bookId );


        /*  This Book component is used in two views, so the variable above is either (true) & holds a book/id
        *   or is (false) & undefinedmost.
        *   This if statement is most important for use in the search view & assigning a shelf, or "none"
        */
        if (IdExists) {
            bookShelfValue = IdExists.shelf;
        } else {
            bookShelfValue = "none";
        };

        //This variable checks the current book object has imageLinks and either assigns it or an image placeholder
        let image = book.imageLinks ? book.imageLinks.thumbnail : BgImage

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{backgroundSize: "contain", backgroundImage:`url(${image})`}}></div>
                    <div className="book-shelf-changer">
                        <select
                            //updateShelf function takes the book(containing req id) and the selected dropdown shelf option value
                            onChange={(event) => updateShelf(book, event.target.value)}
                            //bookShelfValue is evalutated by the IdExists variable and if statement above.
                            value={bookShelfValue}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
            </div>

        )
    }
}

export default Book