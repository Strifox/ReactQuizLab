import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Quiz } from './Quiz';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div> <Quiz />
        </div>;
    }
}


//import * as React from 'react';
//import { RouteComponentProps } from 'react-router';
//import 'isomorphic-fetch';

//interface IQuestionProps {}
//interface IQuizQuestionState {
//    _question: IQuestionAndAnswers[];
//    loading: boolean;
//}
//interface IQuestionAndAnswers {
//    _question: string;
//    answerA: string;
//    answerB: string;
//    answerC: string;
//    answerD: string;
//    correctAnswer: string;
//}


//export class Home extends React.Component<RouteComponentProps<{}>, IQuizQuestionState> {
//    constructor() {
//        super();
//        this.state = { _question: [], loading: true };

//        fetch('api/Questions')
//            .then(response => response.json() as Promise<IQuestionAndAnswers[]>)
//            .then(data => {
//                this.setState({ _question: data, loading: false });
//            });
//    }

//    public render() {
//        let contents = this.state.loading
//            ? <p><em>Loading...</em></p>
//            : Home.renderQuizTable(this.state._question);

//        return <div>
//            <h1>Quiz Questions</h1>
//            <p></p>
//            {contents}
//        </div>;
//    }

//    private static renderQuizTable(questions: IQuestionAndAnswers[]) {
//        return <table className='table'>
//            <thead>
//                <tr>
//                    <th>Question</th>
//                    <th>A</th>                                                                  
//                    <th>B</th>
//                    <th>C</th>
//                    <th>D</th>
//                </tr>
//            </thead>
//            <tbody>
//                {questions.map(question =>
//                    <tr key={question._question}>
//                        <td>{question._question}</td>
//                        <td>{question.answerA}</td>
//                        <td>{question.answerB}</td>
//                        <td>{question.answerC}</td>
//                        <td>{question.answerD}</td>
//                    </tr>
//                )}
//            </tbody>
//        </table>; 
//    }
//}


