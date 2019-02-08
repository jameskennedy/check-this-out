import * as React from 'react';
import LabelledControl from './LabelledControl';
import TextInput, { TextInputProps } from './TextInput';

interface LabelledTextInputProps extends TextInputProps {
    label: string;
}

export default class LabelledTextInput extends React.Component<LabelledTextInputProps, {}> {
    render() {
        return (
            <LabelledControl label={this.props.label}>
                <TextInput {...this.props} />
            </LabelledControl>
        );
    }
}