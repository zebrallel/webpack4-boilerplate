import './App.scss'

// libs
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// components
import Menu from './Menu/Menu'
import PaginationDemo from '../PaginationDemo/PaginationDemo'

export default class App extends React.Component<any, any> {
    render() {
        return (
            <Router>
                <div className="app">
                    <Menu />
                    <div className="page">
                        <Route
                            exact
                            path="/"
                            render={() => {
                                return <h2>点左边查看对应组件demo</h2>
                            }}
                        />
                        <Route exact path="/pagination" component={PaginationDemo} />
                    </div>
                </div>
            </Router>
        )
    }
}
