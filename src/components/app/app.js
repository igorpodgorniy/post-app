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
            ],
            term: ''
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLiked = this.onToggleLiked.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);

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

    searchPost(items, term) {
        if (term.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item.label.indexOf(term) > -1;
        })
    }

    onUpdateSearch(term) {
        return this.setState({term});
    }

    render() {
        const {data, term} = this.state;
        const likedPosts = data.filter(item => item.like).length;
        const allPosts = data.length;

        const visiblePosts = this.searchPost(data, term);

        return (
            <div className="app">
                <AppHeader
                    likedPosts={likedPosts}
                    allPosts={allPosts}
                />
                <div className="search-panel d-flex">
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch}
                    />
                    <PostStatusFilter/>
                </div>
                <PostList
                    posts={visiblePosts}
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