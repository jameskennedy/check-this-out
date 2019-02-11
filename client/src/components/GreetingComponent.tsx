import * as React from "react";

interface UserProps {
    username: string
}

export class GreetingComponent extends React.Component<UserProps, {}> {

    constructor (props: UserProps){
        super(props);
    }

   render() {
       return (
           <h1>Greetings {this.props.username}, Welcome to Check This Out!</h1>
       )
   }
}