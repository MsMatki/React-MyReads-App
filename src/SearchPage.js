import React, { Component } from 'react'
import BookShelves from './BookShelves'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import { Link } from 'react-router-dom'
import DebounceImput from 'react-debounce-input'

class SearchPage extends Component{

  static propTypes = {
    updateQuery: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired,
    searchBooks: PropTypes.array.isRequired
}
  componentDidMount(){
    this.props.resetQuery()
    this.props.emptyBooks()
  }
    render(){

      let showBooks = this.props.searchBooks;
      if(this.props.query){
        const match = new RegExp(escapeRegExp(this.props.query), 'i')
        showBooks = this.props.searchBooks.filter((book) => match.test(book.title))
      }else{
        showBooks = this.props.searchBooks
      }
      showBooks.sort(sortBy('name'))
        return(

            <div className="search-books">
            <div className="search-books-bar">
                <Link className="close-search" to="/" >Close</Link>
              <div className="search-books-input-wrapper">

                <DebounceImput
                  element="input" 
                  debounceTimeout={250}
                  type="text" 
                  placeholder="Search by title or author" 
                  value={this.props.query}
                  onChange={(event) => this.props.updateQuery(event.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
            <BookShelves 
                books={showBooks} 
                bookShelf={this.props.bookShelf}
                changeShelf={this.props.changeShelf}
                /> 
            </div>
          </div>
        )
    }
}

export default SearchPage;