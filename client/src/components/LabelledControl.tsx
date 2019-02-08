import * as React from 'react';

interface LabelledControlProps {
    label: string;
}

export default class LabelledControl extends React.Component<LabelledControlProps, {}> {
    render() {
        return (
            <div>
                {/*<label className={BEM.element('label')}>{this.props.label}</label>*/}
                {/*<div className={BEM.element('control')}>{this.props.children}</div>*/}
                <label>{this.props.label}</label>
                <div>{this.props.children}</div>
            </div>
        );
    }
}