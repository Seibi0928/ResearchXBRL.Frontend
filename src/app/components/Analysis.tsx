import * as React from 'react';

type HelloState = { count: number };

export default class Analysis extends React.Component<unknown, HelloState> {
    constructor(_: unknown) {
        super(_);

        this.state = { count: 0 };
    }

    render() {
        return (
            <div>
                <h1>Hello World!!!</h1>
                <span>count: {this.state.count}</span>
                <div>
                    <input
                        type="button"
                        role="button"
                        value="Click me!!"
                        onClick={() => this.handleClick()} />
                </div>
            </div>
        );
    }

    private handleClick(): void {
        this.setState({
            count: this.state.count + 1
        });
    }
}
