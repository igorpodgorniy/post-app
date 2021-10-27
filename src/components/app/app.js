import React, {Component} from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import PostStatusFilter from "../post-status-filter";
import PostList from "../post-list";
import PostAddForm from "../post-add-form";

import './app.css';

export default class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            data: [
                { label: "Going to learn React", important: true, like: false, id: 'dsfdsf' },
                { label: "Theat is so good", important: false, like: false, id: 'sdfsg' },
                { label: "I need a break...", important: false, like: false, id: 'dsjnvj' }
            ]
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);

        this.maxId = 4;
    }

    deleteItem(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            
            const newArr = [...data.slice(0, index), ...data.slice(index + 1)];

            return {
                data: newArr
            }
        })
    }

    addItem(body) {
        const newItem = {
            label: body,
            important: false,
            id: this.maxId++
        };

        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }

    onToggle(property, id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);

            const oldInd = data[index];
            const newLike = {...oldInd, [property]: !oldInd[property]};

            const newArr = [...data.slice(0, index), newLike, ...data.slice(index + 1)];

            return {
                data: newArr
            }
        });
    }

    onToggleImportant(id) {
        this.onToggle('important', id);
    }

    onToggleLiked(id) {
        this.onToggle('like', id);
    }

    render() {
        const {data} = this.state;
        const likedPosts = data.filter(item => item.like).length;
        const allPosts = data.length;

        return (
            <div className="app">
                <AppHeader
                    likedPosts={likedPosts}
                    allPosts={allPosts}
                />
                <div className="search-panel d-flex">
                    <SearchPanel/>
                    <PostStatusFilter/>
                </div>
                <PostList
                    posts={this.state.data}
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleLiked={this.onToggleLiked}
                />
                <PostAddForm
                    onAdd={this.addItem}
                />
            </div>
        )
    }
}