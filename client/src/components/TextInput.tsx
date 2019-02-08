import * as React from 'react';

export interface TextInputProps {
    value: string;
    onChange: (newValue: string) => void;
}

export default class TextInput extends React.Component<TextInputProps, {}> {
    onChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.props.onChange(e.target.value);
    }

    render() {
        // return <input className="text-input" value={this.props.value} onChange={e => this.onChange(e)} />;
        return <input value={this.props.value} onChange={e => this.onChange(e)} />;
    }
}