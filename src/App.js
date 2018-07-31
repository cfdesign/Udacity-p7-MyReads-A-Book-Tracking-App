import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Search from './Search'
import Bookshelf from './Bookshelf'
import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  }
  //fetch the books from the API, update state/re-render UI
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  //When drop down list is changed the API is updated, retrived and then updates the state which re-renders the UI.
  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(book => {
      BooksAPI.getAll().then(books => {
        this.setState({ books })
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={({ history }) => (
          <Search
            books={this.state.books}
            updateShelf={this.updateShelf}
          />
        )}/>
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <Bookshelf
                books={this.state.books}
                updateShelf={this.updateShelf}
              />
            </div>
            <div className="open-search">
            <Link to="/search">
              Add a book
            </Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
