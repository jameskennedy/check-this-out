import * as React from "react";

interface CheckoutButtonProps {
    handleClick: () => void;
}

const CheckoutButton: React.FunctionComponent<CheckoutButtonProps> = props => {
    return (
        <button onClick={props.handleClick}>
            {props.children}
        </button>
    );
};

export default CheckoutButton;