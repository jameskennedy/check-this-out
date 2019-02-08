import * as React from "react";
import {Book, ItemComponent} from "./Item";

export interface Books {
    books: Book[]
}

export class ItemsComponent extends React.Component<Books, {}> {
    constructor (props: Books){
        super(props);
    }

    render() {
       return (
           <div>
               <h1>Library</h1>
               <ul>
                   {this.props.books.map(function(book: Book){
                       return <li><ItemComponent book={book}/></li>;
                   })}
               </ul>
           </div>
       )
    }
}