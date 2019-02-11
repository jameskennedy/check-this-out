import * as React from "react";

interface LabelledFieldProps {
    name: string,
    value?: string
}

const LabelledField: React.FunctionComponent<LabelledFieldProps> = props => {
    return (
        <div>
            {props.name}: {props.value}
        </div>
    );
};

export default LabelledField;