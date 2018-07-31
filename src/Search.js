import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class Search extends Component {
    state = {
        searchedBooks: [],
        query: ''
    }
    static propTypes = {
        books: PropTypes.array.isRequired,
        updateShelf: PropTypes.func.isRequired
    }
    /*  UpdateQuery kicks off the sequence when a user enters text into the input search box.
    *   Query state is immediately updated with input text. Any Input text in this state also changes UI to show result of search.
    *   Providing the query is not empty it is passed over to the searchQuery function which calls the booksAPI search.
    *   If the text is empty, searched books state is cleared, the timeout allows for search requests to process, show, then clear.
    */
    updateQuery = (query) => {
        this.setState({ query: query})
        if(query !== '') {
                this.searchQuery(query);
        } else {
            setTimeout(() => {
                this.setState({ searchedBooks:[] });
            }, 800)
        }
    }

    /*  searchQuery returns the result (if any) of a query/search.
    *   If a search result is returned, searchedBooks state is immediately updated with books.
    *   Any books in this state also changes UI to show books found.
    *   If the search result returned is empty, searched books state is cleared.
    */
    searchQuery(query) {
        BooksAPI.search(query).then(searchResult => {
            if(searchResult) {
                this.setState({ searchedBooks: searchResult })
            } else {
                this.setState({ searchedBooks:[] })
            }
        })
    }

    render() {
        const { books, updateShelf } = this.props;
        const { query, searchedBooks } = this.state;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                <Link
                    to="/"
                    className="close-search"
                    >Close
                </Link>
                    <div className="search-books-input-wrapper">

                        <input
                            type='text'
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>

                <div className="search-books-results">
                {/* If query state has value (text search input), show the query and check how many (if any) results/books are returned*/}
                {query && (
                    <div className='showing-contacts'>
                        <span>Search for "{query}" shows {searchedBooks.length > 0 ? searchedBooks.length : "0"} results</span>
                    </div>
                )}

                    <ol className="books-grid">
                    {/* If searchedBooks state has value, loop through each book and display results/books*/}
                    {searchedBooks.length > 0 && searchedBooks.map((book) => (
                        <li key={book.id}>
                            <Book
                                book={book}
                                books={books}
                                updateShelf={updateShelf}
                            />
                        </li>
                    ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search