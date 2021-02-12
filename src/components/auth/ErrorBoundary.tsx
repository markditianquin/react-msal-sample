import React from "react";

interface IError {
  hasError: boolean;
  error: string;
}

export class ErrorBoundary extends React.Component<{}, IError> {

    constructor(props: any) {
        super(props);
        this.state = {
            hasError: false,
            error: ""
        };
    }

    componentDidCatch(e: any) {
        this.setState({
            hasError: true,
            error: e.errorCode
        });
    }

    render() {
        if (this.state.hasError) {
            return <h5>This is a protected page and the following error occurred during authentication: <strong>{this.state.error}</strong></h5>;
        }

        return this.props.children;
    }
}