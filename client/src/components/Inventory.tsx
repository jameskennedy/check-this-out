import * as React from "react";

export interface Inventory {
    formattedId: string,
    status: string,
    checkedOutOn?: string,
    checkedOutBy?: string
}

export interface InventoryProps {
    inventory: Inventory[]
}

export class InventoryComponent extends React.Component<InventoryProps, {}> {
    constructor (props: InventoryProps){
        super(props);
    }

    render() {
        return (
            <div><p>
                {
                    this.props.inventory.map(function(inventory: Inventory){
                        return inventory.formattedId + ' | '
                            + inventory.status + ' | '
                            + inventory.checkedOutBy + '|'
                            + inventory.checkedOutOn + "\n"
                    })
                }
            </p></div>
        )
    }
}
