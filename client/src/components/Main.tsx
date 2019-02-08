import * as React from "react";
import {ItemsComponent} from "./ItemsComponent";
import {Book} from "./Item";

export interface HelloProps { username: string; }

const books =[
    {
        description: 'Project to Product',
        type: 'Book',
        inventory: [
            {
                formattedId: 'MK-001',
                status: 'checked out',
                checkedOutOn: '2019-01-01',
                checkedOutBy: 'Ryan Nosworthy'
            },
            {
                formattedId: 'MK-002',
                status: 'checked out',
                checkedOutOn: '2019-02-01',
                checkedOutBy: 'James Kennedy'
            }
        ]
    },
    {
        description: 'How to Develop In React',
        type: 'Book',
        inventory: [
            {
                formattedId: 'BK-101',
                status: 'available',
                checkedOutOn: undefined,
                checkedOutBy: undefined,
            }
        ]
    }
];

export class Main extends React.Component<HelloProps, {}> {
    render() {
        return (
            <div>
                <h1>Greetings {this.props.username}, Welcome to Check This Out!</h1>
                <ItemsComponent books={books}/>
            </div>
        );
    }
}