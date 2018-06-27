import React, { Component } from 'react'
import BookShelves from './BookShelves'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import { Link } from 'react-router-dom'
import DebounceImput from 'react-debounce-input'
import * as BooksAPI from './BooksAPI'

class SearchPage extends Component{

  static propTypes = {
    books: PropTypes.array.isRequired
}

state = {
  query: '',
  searchBooks: [],
}

updateQuery = (query) => {
  this.setState({
    query: query
  })
  //if query is empty, don't show any books 
  if(query === ''){
    this.setState({
      searchBooks: []
    })
  }else{
    BooksAPI.search(query).then((searchedBooks) => {
      //if search doesn't match don't show any books
      if(searchedBooks.error){
        this.setState({
          searchBooks: []
        })
      }else{
        //Sets searched book shelf equal to book shelf
        const resultBooks = searchedBooks.map(searchBook => {
          searchBook.shelf = 'none'
          this.props.books.forEach((book) => {
            if(book.id === searchBook.id){
              searchBook.shelf = book.shelf
            }
          })
          return searchBook
        })
        this.setState({
          searchBooks: resultBooks
      })
      }
    })
  }
}
 //empy all books
  emptyBooks = () => 
    this.setState({ 
      searchBooks: []
    })
//resets the input area query
  resetQuery = () => {
    this.setState({
      query: ''
    })
  }

  componentDidMount(){
    this.resetQuery()
    this.emptyBooks()
  }
  
    render(){

      let showBooks = this.state.searchBooks;
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
                  value={this.state.query}
                  onChange={(event) => this.updateQuery(event.target.value)}
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