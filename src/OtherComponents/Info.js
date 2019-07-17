import React, { Component } from 'react';
import Cards from './Cards';
import axios from 'axios';
import Search from './Search';
import { Menu, Dropdown, Icon } from 'antd';
import './Info.css';
import { DatePicker } from 'antd';
import moment from 'moment';


class Info extends Component {
    state = {
        reports: [],
        search_reports: [],
        search_happen: false,
        recent_search: [],
        
    }
    componentDidMount() {
        axios.get('http://localhost:3001/api/users/show_all')
            .then(response => {
                this.setState({ reports: response.data });
                console.log(response.data);
            });
    }
    search = (value) => {
        this.setState({ recent_search: [...this.state.recent_search, value] });
        axios.get('http://localhost:3001/api/users/show_all/' + value)
            .then(response => {
                console.log(response.data);
                //let ar = [];
                //ar.push(response.data)
                this.setState({
                    search_reports: response.data,
                    search_happen: true
                });
            });
    }
    sort_By_Title = () => {
        const repo_list = [...this.state.reports];
        function compare(a, b) {
            if ((a.title) < (b.title))
                return -1;
            if ((a.title) > (b.title))
                return 1;
            else
                return 0;
        }
        repo_list.sort(compare);
        this.setState({ reports: repo_list });
    }
    sort_By_Cost = () => {
        const repo_list = [...this.state.reports];
        function compare(a, b) {
            if (parseInt(a.cost) < parseInt(b.cost))
                return -1;
            if (parseInt(a.cost) > parseInt(b.cost))
                return 1;
            else
                return 0;
        }
        repo_list.sort(compare);
        this.setState({ reports: repo_list });
    }
    sort_By_Date = () => {
        const repo_list = [...this.state.reports];
        function compare(a, b) {
            return new Date(a.publishedDate) - new Date(b.publishedDate);

        }
        repo_list.sort(compare);
        this.setState({ reports: repo_list });
    }
    filter_By_Date = (event) => {
        const repo_list = [...this.state.reports];
        console.log(event.target.elements.mindate.value);
        console.log(event.target.elements.maxdate.value);
        //const filtered_list = repo_list.filter(inRange);
    }
    filter_By_Cost = (mincost, maxcost) => {
        const repo_list = [...this.state.reports];
        function inRange(value) {
            if (parseInt(value.cost) >= mincost && parseInt(value.cost) <= maxcost)
                return 1;
            //return parsetInt(value.cost) >= mincost && parseInt(value.cost) <= maxcost;
        }
        const filtered_list = repo_list.filter(inRange);
        this.setState({ reports: filtered_list });
    }
    submitCostHandler = (event) => {
        event.preventDefault();
        console.log(event.target.elements.mincost.value);
        this.filter_By_Cost(event.target.elements.mincost.value, event.target.elements.maxcost.value);
    }
    render() {
        const cards = this.state.reports.map(card => {
            return <Cards
                id={card.id}
                title={card.title}
                description={card.description}
                imageUrl={card.imageUrl}
                publishedDate={card.publishedDate}
                cost={card.cost}
            />
        });
        let search_cards = null;
        if (this.state.search_reports && this.state.search_reports.length > 0) {
            search_cards = this.state.search_reports.map(card => {
                return <Cards
                    id={card.id}
                    title={card.title}
                    description={card.description}
                    imageUrl={card.imageUrl}
                    publishedDate={card.publishedDate}
                    cost={card.cost}
                />
            });
        }
        let recent_search_reports = null;
        if (this.state.recent_search && this.state.recent_search.length > 0) {
            recent_search_reports = this.state.recent_search.map(value => {
                return <button onClick={() => { this.search(value) }}>{value}</button>
            });
        }
        const menu = (
            <Menu>
                <Menu.Item>
                    <button target="_blank" rel="noopener noreferrer"
                        onClick={this.sort_By_Title}>Title
                    </button>
                </Menu.Item>
                <Menu.Item>
                    <button target="_blank" rel="noopener noreferrer"
                        onClick={this.sort_By_Date}>Date
                    </button>
                </Menu.Item>
                <Menu.Item>
                    <button target="_blank" rel="noopener noreferrer"
                        onClick={this.sort_By_Cost}>Cost
                    </button>
                </Menu.Item>
            </Menu>
        );
        
        const dateFormat = 'YYYY/MM/DD';
        return (
            <div>
                <br />
                <div>
                    <Search search={this.search} />
                    <h4>Recent Searches</h4>
                    {recent_search_reports}
                </div>
                <div>
                    <form onSubmit = {()=>{this.filter_By_Date(event)}}>
                        <DatePicker id= "mindate"defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} />
                        <br />
                        <DatePicker id="maxdate"defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} />
                        <br />
                        <button> FilterByDate </button>
                    </form>
                    <form onSubmit={this.submitCostHandler}>
                        <label>Min</label>
                        <input id="mincost" type="number" name="mincost" placeholder="mincost" required></input>
                        <label>Max</label>
                        <input id="maxcost" type="number" name="maxcost" placeholder="maxcost" required></input>
                        <button>Filter</button>
                    </form>

                </div>
                <div>
                    <Dropdown overlay={menu}>
                        <button className="ant-dropdown-link">
                            SortBy_ <Icon type="down" />
                        </button>
                    </Dropdown>
                </div>
                <div>
                    <section className="Infos">
                        {console.log("search_happen")}
                        {console.log(this.state.search_happen)}
                        {this.state.search_happen === true ? search_cards : cards}
                    </section>
                </div>
            </div>
        );
    }
}

export default Info;