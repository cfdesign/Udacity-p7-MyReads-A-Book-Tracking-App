import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BooksGrid from './BooksGrid'

class Bookshelf extends Component {
    state = {
        //This shelves state array holds information to set each UI <H2> shelf & assign the correct book to each shelf
        shelves: [
            {value: 'currentlyReading', name: 'Currently Reading' },
            {value: 'wantToRead',  name: 'Want to Read'},
            {value: 'read', name: 'Read'}
        ]
    }
    static propTypes = {
        books: PropTypes.array.isRequired,
        updateShelf: PropTypes.func.isRequired
    }

    render() {
        const { books, updateShelf } = this.props
        const { shelves } = this.state
        return (
            <div>
            {shelves.map((shelf, idx) => (
                //use shelves state current array index as individual key
                <div key={idx} className="bookshelf">
                    <h2 className="bookshelf-title">{shelf.name}</h2>
                    <div className="bookshelf-books">
                        <BooksGrid
                            //filter the books state by matching shelf with current shelves state array
                            shelfBooks={books.filter(book => book.shelf === shelf.value)}
                            books = {books}
                            updateShelf={updateShelf}
                        />
                    </div>
                </div>
            ))}
           </div>
        )
    }
}

export default Bookshelf