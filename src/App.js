import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './App.css'
import BookShelves from './BookShelves'
import SearchPage from './SearchPage'

class BooksApp extends React.Component {
  
  state = {
    books: [],
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})    
    })
  }

  changeShelf = ( book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf
      this.setState({ shelf })
      if(this.state.query !== ''){
        //adds book to you shelf
        this.setState((state) => ({
          books: state.books.filter((b) => b.id !== book.id).concat([ book ])
        }))
      }
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
            bookShelf="Search Results"
            books={this.state.books}
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
