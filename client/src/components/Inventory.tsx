import * as React from "react";
import {LabelledField} from "./LabelledField";

export interface Inventory {
    formattedId: string,
    status: string,
    checkedOutOn?: string,
    checkedOutBy?: string
}

export interface InventoryProps {
    inventory: Inventory
}

export class InventoryComponent extends React.Component<InventoryProps, {}> {
    constructor (props: InventoryProps){
        super(props);
    }

    render() {
        return (
            <div><p>
                <LabelledField name="ID" value={this.props.inventory.formattedId}/>
                <LabelledField name="Status" value={this.props.inventory.status}/>
                <LabelledField name="Checked Out" value={this.props.inventory.checkedOutBy}/>
                <LabelledField name="Checked On" value={this.props.inventory.checkedOutOn}/>
            </p></div>
        )
    }
}
