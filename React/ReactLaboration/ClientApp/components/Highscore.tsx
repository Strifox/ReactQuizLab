import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

interface IScoreProps {
}

interface IScoreState {
    loading: boolean;
    PointState: Scores[];
}

interface Scores {
    points: number;
    userName: string;
}


export class Highscore extends React.Component<RouteComponentProps<{}>, IScoreState> {
    constructor() {
        super();
        this.state = {
            loading: false,
            PointState: []
        };
        
        fetch('api/Scores')
            .then(response => response.json() as Promise<Scores[]>)
            .then(data => {
                console.log('highscore fetch data',data)
                this.setState({ PointState: data, loading: true});
            })
    }

    public render() {
        console.log('hiscore render ', this.state.PointState)
        let contents = this.state.loading
            ? this.renderHighscoreTable(this.state.PointState)
            : <p><em>Loading...</em></p>;

        return <div>
            {contents}
        </div>;
    }

    public renderHighscoreTable(score: Scores[]) {
        console.log(score[0].points)
        return <table className='table'>
            <thead>
                <tr>
                    <th>Points</th>
                    <th>User </th>
                </tr>
            </thead>
            <tbody>
                {score.map(score =>
                    <tr key={score.userName}>
                        <td>{score.points}</td>
                        <td>{score.userName}</td>
                    </tr>
                )}
            </tbody>
        </table>;
        
    }

}