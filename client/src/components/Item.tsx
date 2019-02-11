import * as React from "react";
import {Inventory, InventoryComponent} from "./Inventory";
import LabelledField from "./LabelledField";


export interface Book {
    id: number,
    name: string,
    description: string,
    inventory: Inventory[]
}

export interface BookProps {
    book: Book,
    username: string
}

export class ItemComponent extends React.Component<BookProps, {}> {
    constructor (props: BookProps){
        super(props);
    }

    render() {
        let self = this;
        return (
            <div>
                <p>
                <LabelledField name="Name" value={this.props.book.name}/>
                <LabelledField name="Description" value={this.props.book.description}/>
                </p>
                {
                    this.props.book.inventory.map(function(i: Inventory){
                       return <InventoryComponent key={i.id} inventory={i} username={self.props.username}/>
                    })
                }
            </div>
        )
    }
}