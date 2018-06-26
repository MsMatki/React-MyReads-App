import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelves extends Component{
    
static propTypes = {
    bookShelf: PropTypes.string.isRequired
}
render(){
    return(
        <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.bookShelf}</h2>
        <div className="bookshelf-books">
         <ol className="books-grid">
            {this.props.books.map((book) => (
            <li key={book.id}>
                <Book
                  changeShelf={this.props.changeShelf}
                  book={book}
                />
             </li>  
            
             ))}
          </ol>
          </div>
      </div> 
      
    )
}
}


export default BookShelves;