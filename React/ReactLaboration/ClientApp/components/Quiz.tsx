import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

interface IQuizQuestionState {
}
interface IQuestionAndAnswers {
    loading: boolean;
    Question: IQuestionAndAnswers[];
    answerA: string;
    answerB: string;
    answerC: string;
    answerD: string;
    correctAnswer: string;
    selectedAnswer: string;
}


export class Quiz extends React.Component<RouteComponentProps<{}>, IQuestionAndAnswers> {
    constructor() {
        super();
        this.state = {
            loading: false,
            Question: [],
            answerA: '',
            answerB: '',
            answerC: '',
            answerD: '',
            correctAnswer: '',
            selectedAnswer: '',
        };

        fetch('api/Questions')
            .then(response => response.json() as Promise<IQuestionAndAnswers[]>)
            .then(data => {
                this.setState({ Question: data, loading: true });
            });
    }

    //public render() {
    //    let contents = this.state.loading
    //        ? <p><em>Loading...</em></p>
    //        : Home.renderQuizTable(this.state.Question);
    public renderQuestionTable(_question: IQuestionAndAnswers[], counter1: number) {
        return <div>
            <ul className="list-group">
                <div><h3>{_question[counter1].Question}</h3></div>
                <label className="list-group-item">
                    <input onChange={this.handleAnswer}
                        id='answerA'
                        type="radio"
                        name="answer"
                        checked={this.state.selectedAnswer === 'A'}
                        value="A" /> {_question[counter1].answerA}</label>
                <label className="list-group-item">
                    <input onChange={this.handleAnswer}
                        id='answerB'
                        type="radio"
                        name="answer"
                        checked={this.state.selectedAnswer === 'B'}
                        value="B" /> {_question[counter1].answerB}</label>
                <label className="list-group-item">
                    <input onChange={this.handleAnswer}
                        id='answerC'
                        type="radio"
                        name="answer"
                        checked={this.state.selectedAnswer === 'C'}
                        value="C" /> {_question[counter1].answerC}</label>
                <label className="list-group-item">
                    <input onChange={this.handleAnswer}
                        id='answerD'
                        type="radio"
                        name="answer"
                        checked={this.state.selectedAnswer === 'D'}
                        value="D" /> {_question[counter1].answerD}</label>
            </ul>

        </div>;

    }
    handleAnswer(event: any) {
        this.setState({ selectedAnswer: event.target.value })
    }

}

    //private static renderQuizTable(questions: IQuestionAndAnswers[]) {
    //    return <table className='table'>
    //        <thead>
    //            <tr>
    //                <th>Question</th>
    //                <th>A</th>
    //                <th>B</th>
    //                <th>C</th>
    //                <th>D</th>
    //            </tr>
    //        </thead>
    //        <tbody>
    //            {questions.map(question =>
    //                <tr key={question.Question}>
    //                    <td>{question.Question}</td>
    //                    <td>{question.answerA}</td>
    //                    <td>{question.answerB}</td>
    //                    <td>{question.answerC}</td>
    //                    <td>{question.answerD}</td>
    //                </tr>
    //            )}
    //        </tbody>
    //    </table>;

    //}
