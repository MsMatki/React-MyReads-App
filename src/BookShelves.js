import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const BookShelves = (props) => {
    
    return(
        <div className="bookshelf">
        <h2 className="bookshelf-title">{props.bookShelf}</h2>
        <div className="bookshelf-books">
         <ol className="books-grid">
            {props.books.map((book) => (
            <li key={book.id}>
                <Book
                  changeShelf={props.changeShelf}
                  book={book}
                />
             </li>  
             ))}
          </ol>
          </div>
      </div>  
    )
}

BookShelves.propTypes = {
    bookShelf: PropTypes.string.isRequired
}

export default BookShelves;