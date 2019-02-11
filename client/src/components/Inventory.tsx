import * as React from "react";
import LabelledField from "./LabelledField";
import CheckoutButton from "./CheckoutButton";

export interface Inventory {
    id: number,
    itemId: number,
    formattedId: string,
    status: Status
    // checkedOutOn?: string,
    // checkedOutBy?: string
}

export interface InventoryProps {
    inventory: Inventory
    username: string
}

export interface StateProps {
    checkedOutBy?: string
    checkedOutOn?: string,
    status: Status
}

export enum Status {
    Available = "Available", CheckedOut="Checked Out"
}

export class InventoryComponent extends React.Component<InventoryProps, StateProps> {
    constructor (props: InventoryProps){
        super(props);
        this.state = {
            checkedOutBy: "",
            checkedOutOn: "",
            // checkedOutBy: props.inventory.checkedOutBy,
            // checkedOutOn: props.inventory.checkedOutOn,
            status: props.inventory.status
        };
        this.handleClick = this.handleClick.bind(this);
    }

    private handleClick() {
        if (this.state.status === Status.CheckedOut){
            this.setState({
                checkedOutBy: "",
                checkedOutOn: "",
                status: Status.Available
            });
        }else{
            this.setState({
                checkedOutBy: this.props.username,
                checkedOutOn: new Date().toDateString(),
                status: Status.CheckedOut
            })
        }
    }

    render() {
        return (
            <div>
                <LabelledField name="ID" value={this.props.inventory.formattedId}/>
                <LabelledField name="Status" value={this.state.status}/>
                <LabelledField name="Checked Out By" value={this.state.checkedOutBy}/>
                <LabelledField name="Checked On" value={this.state.checkedOutOn}/>
                <CheckoutButton handleClick={this.handleClick}>
                    {this.state.status === Status.CheckedOut ? "Return Book" : "Checkout Book"}
                </CheckoutButton>
            </div>
        )
    }

}
