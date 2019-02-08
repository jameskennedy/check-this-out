import * as React from "react";
import {Inventory, InventoryComponent} from "./Inventory";


export interface Book {
    description: string,
    type: string,
    inventory: Inventory[]
}

export interface BookProps {
    book: Book
}

export class ItemComponent extends React.Component<BookProps, {}> {
    constructor (props: BookProps){
        super(props);
    }

    render() {
        return (
            <div>
                Description: {this.props.book.description}
                <InventoryComponent inventory={this.props.book.inventory} />
            </div>
        )
    }
}