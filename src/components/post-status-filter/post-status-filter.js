import React, {Component} from "react";

import './post-status-filter.css';

export default class PostStatusFilter extends Component {
    constructor(props) {
        super(props);
        this.buttons = [
            {name: 'all', label: 'Все'},
            {name: 'like', label: 'Понравилось'}
        ];
    }
    render() {
        const buttons = this.buttons.map(({name, label}) => {
            const {filter, onFilterSelect} = this.props;
            const activeBtn = filter === name;
            const classActive = activeBtn ? 'btn-info' : 'btn-outline-secondary';
            return (
                <button
                    key={name}
                    type="button"
                    className={`btn ${classActive}`}
                    onClick={() => onFilterSelect(name)}
                >{label}</button>
            )
        })
        return (
            <div className="btn-group">
                {buttons}
            </div>
        )
    }
}