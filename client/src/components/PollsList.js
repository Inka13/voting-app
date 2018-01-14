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
        const pollsList = [];
        this.props.polls.forEach((poll, i) => {
            pollsList.push(<li key={i}><a href={poll.url}>{poll.question}</a></li>)
        })
            // need to put a loader here  <<<<<======
            
        return (
            <main>
                
                <div>
                <ul>
                    {pollsList}    
                </ul>
                </div>
            </main>
        );
    }
}
export default PollsList;