import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';


let counter: number;
counter = 0;
interface IQuizQuestionProps {
}
interface IQuizQuestionState {
    loading: boolean;
    questions: Question[];
    selectedAnswer: string;
}
interface Question {
    _question: string;
    answerA: string;
    answerB: string;
    answerC: string;
    answerD: string;
    correctAnswer: string;
}


export class Quiz extends React.Component<IQuizQuestionProps, IQuizQuestionState> {
    constructor(props: IQuizQuestionProps) {
        super(props);
        this.state = {
            loading: false,
            questions: [],
            selectedAnswer: '',
        };

        fetch('api/Questions')
            .then(response => response.json() as Promise<Question[]>)
            .then(data => {
                this.setState({ questions: data, loading: true });
            });
    }

    public render() {
        let contents = this.state.loading
            ? this.renderQuestionTable(this.state.questions, counter)
            : <p><em>Loading...</em></p>;

        return <div> {contents}</div>;
    }

    public renderQuestionTable(question: Question[], counter1: number) {
        return <div>
            <ul className="list-group">
                <div className="list-group-item"><h3>{question[counter1]._question}</h3></div>
                <label className="list-group-item">
                    <input onChange={this.handleAnswer}
                        id='answerA'
                        type="radio"
                        name="answer"
                        checked={this.state.selectedAnswer === 'A'}
                        value="A" /> {question[counter1].answerA}</label>
                <label className="list-group-item">
                    <input onChange={this.handleAnswer}
                        id='answerB'
                        type="radio"
                        name="answer"
                        checked={this.state.selectedAnswer === 'B'}
                        value="B" /> {question[counter1].answerB}</label>
                <label className="list-group-item">
                    <input onChange={this.handleAnswer}
                        id='answerC'
                        type="radio"
                        name="answer"
                        checked={this.state.selectedAnswer === 'C'}
                        value="C" /> {question[counter1].answerC}</label>
                <label className="list-group-item">
                    <input onChange={this.handleAnswer}
                        id='answerD'
                        type="radio"
                        name="answer"
                        checked={this.state.selectedAnswer === 'D'}
                        value="D" /> {question[counter1].answerD}</label>
            </ul>

        </div>;

    }
    handleAnswer(event: any) {
        this.setState({ selectedAnswer: event.target.value })
    }

}