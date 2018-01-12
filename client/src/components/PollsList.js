import React from 'react';

class PollsList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    componentWillMount() {
    }
    componentDidMount(){
    }
    render() {
            // need to put a loader here  <<<<<======
        return (
            <main>
                <h3 id="polls">Polls List</h3>
                <div>
                <ul>
                    <li>Which is easier to use, SQL or MongoDB? Do you prefer PHP or Javascript?</li>
                    <li>Do you prefer PHP or Javascript?</li>
                </ul>
                </div>
            </main>
        );
    }
}
export default PollsList;