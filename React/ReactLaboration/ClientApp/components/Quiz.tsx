import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

interface IQuizQuestionProps {
}
interface IQuizQuestionState {
    loading: boolean;
    questions: Question[];
    selectedAnswer: string;
    counter: number;
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
            counter: 0
        };
        this.handleNextQuestion = this.handleNextQuestion.bind(this);
        this.handleAnswer = this.handleAnswer.bind(this);

        fetch('api/Questions')
            .then(response => response.json() as Promise<Question[]>)
            .then(data => {
                this.setState({ questions: data, loading: true });
            });
    }

    public render() {
        let counter = this.state.counter;

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
            <input type="button" value="Next" onClick={this.handleNextQuestion}></input>
        </div>;

    }

    handleAnswer(event: any) {
        this.setState({ selectedAnswer: event.target.value })
    }

    handleNextQuestion(event: any)
    {
        let count = this.state.counter + 1;
        this.setState({ counter: count });
        this.setState({ selectedAnswer: '' });
    }

}