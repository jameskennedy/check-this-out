import * as React from "react";
import {Book, ItemComponent} from "./Item";

export interface ItemsProps {
    books: Book[],
    username: string
}

export class ItemsComponent extends React.Component<ItemsProps, {}> {
    constructor (props: ItemsProps){
        super(props);
    }

    render() {
       let self = this;
       return (
           <div>
               <h1>Library</h1>
               <ul>
                   {
                   this.props.books.map(function(book: Book){
                        return (<li key={book.id}><ItemComponent username={self.props.username} book={book}/></li>);
                    })
                   }
               </ul>
           </div>
       )
    }
}