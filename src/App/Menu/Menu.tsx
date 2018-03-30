import './Menu.scss'

// libs
import React from 'react'
import { NavLink } from 'react-router-dom'

// types
import { match } from 'react-router'
import { Location } from 'history'

export default class Menu extends React.Component<any, any> {
    isActive(match: match<any>, location: Location) {
        if (!match) {
            return false
        }

        return match.path === location.pathname
    }

    render() {
        return (
            <div className="menu">
                <NavLink isActive={this.isActive} to="/pagination">
                    分页
                </NavLink>
            </div>
        )
    }
}
