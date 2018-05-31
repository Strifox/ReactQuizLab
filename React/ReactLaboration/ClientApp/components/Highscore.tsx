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
    Points: number;
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
                this.setState({ PointState: data, loading: true});
            })
    }

    public render() {
        let contents = this.state.loading
            ? this.renderHighscoreTable(this.state.PointState)
            : <p><em>Loading...</em></p>;

        return <div>
            {contents}
        </div>;
    }

    public renderHighscoreTable(score: Scores[]) {
        console.log(score[0].Points)
        return <table className='table'>
            <thead>
                <tr>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>
                {score.map(score =>
                    <tr>
                        <td>{score.Points}</td>
                    </tr>
                )}
            </tbody>
        </table>;
        
    }

}