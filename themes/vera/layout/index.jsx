import React from 'react'

export default class extends React.Component {
    render() {
        return (
            <html>
                <head>
                    <title>{this.props.page.title}</title>
                </head>
                <body>
                    <h1>Hello</h1>
                </body>
            </html>
        )
    }
}