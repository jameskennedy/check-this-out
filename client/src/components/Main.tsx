import * as React from "react";
import {ItemsComponent} from "./ItemsComponent";
import {Book} from "./Item";
import {GreetingComponent} from "./GreetingComponent";
import DefaultHttpClient from "./request/HttpClient";

export class Main extends React.Component {

    state = {
        books: []
    };

    componentDidMount() {
        new DefaultHttpClient().get<Book[]>('http://localhost:9000/items').then(response => {
            const books = response.data.map(b => {
                return {
                    id: b.id,
                    name: b.name,
                    description: b.description,
                    inventory: b.inventory
                };
            });

            const newState = Object.assign({}, this.state, {
                books: books
            });

            this.setState(newState);

        }).catch(error => console.log(error));
    }

    getUser(){
        const queryParams = new URLSearchParams(window.location.search);
        let user = queryParams.get("username");
        if (user === undefined || user === null){
            user = "Anonymous";
        }
        return user;
    }

    render() {
        let user = this.getUser();

        return (
            <div>
                <GreetingComponent username={user}/>
                <ItemsComponent books={this.state.books} username={user}/>
            </div>
        );
    }
}