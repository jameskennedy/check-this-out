import * as React from "react";

interface LabelledFieldProps {
    name: string,
    value?: string
}
export class LabelledField extends React.Component<LabelledFieldProps, {}> {
    constructor (props: LabelledFieldProps){
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.name}: {this.props.value}
            </div>
        );
    }
}