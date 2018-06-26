import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './App.css'
import BookShelves from './BookShelves'
import SearchPage from './SearchPage'

class BooksApp extends React.Component {
  
  state = {
    query: '',
    books: [],
    searchBooks: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})    
    })
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
            this.state.books.forEach((book) => {
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

  changeShelf = ( book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf
      this.setState({ shelf })
      if(this.state.query !== ''){
        //if book is allready on your shelf
        this.setState((state) => ({
          books: state.books.filter((b) => b.id !== book.id)
        }))
        //adds new book to your shelf
        this.setState(state => ({
          books: state.books.concat([ book ]),
        }))
      }
      })
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
  
  render() {
    
    return(
      <div className="app">
         <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
              </div>
               <div className="list-books-content">
                  <div>  
                    <BookShelves 
                      books={this.state.books.filter(book => book.shelf === "currentlyReading")} 
                      bookShelf="Currently Reading" 
                      changeShelf={this.changeShelf}
                     />
                    <BookShelves 
                      books={this.state.books.filter(book => book.shelf === "wantToRead")} 
                      bookShelf="Want To Read"
                      changeShelf={this.changeShelf}
                    />
                    <BookShelves 
                      books={this.state.books.filter(book => book.shelf === "read")} 
                      bookShelf="Read"
                      changeShelf={this.changeShelf}
                    />
            
                 </div>
               </div>
              <div className="open-search">
              <Link to="/search" >Add a book</Link>
            </div>
          </div>
        )}/>
        <Route path="/search" render={({ history }) => (
          <SearchPage
            resetQuery={this.resetQuery}
            emptyBooks={this.emptyBooks}
            bookShelf="Search Results"
            searchBooks={this.state.searchBooks}
            query={this.state.query}
            updateQuery={this.updateQuery}
            changeShelf={(book, shelf) => {this.changeShelf(book, shelf)
            history.push('/')
          }}
          />
        )}/>
        
      </div>
    )
  }
}

export default BooksApp
