import * as React from "react";
import {Inventory, InventoryComponent, InventoryProps} from "./Inventory";


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
                {
                    this.props.book.inventory.map(function(i: Inventory){
                       return <InventoryComponent inventory={i} />
                    })
                }
            </div>
        )
    }
}