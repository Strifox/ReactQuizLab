import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Counter } from './Counter';

let score: number;
score = 0;
let counter: number;
counter = 0;
interface IQuizQuestionProps {
}
interface IQuizQuestionState {
    loading: boolean;
    questions: Question[];
    selectedAnswer: string;
    scoreState: number;
    submitText: string;
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
            counter: 0,
            scoreState: 0,
            submitText: ''
        };
        this.handleNextQuestion = this.handleNextQuestion.bind(this);
        this.handleAnswer = this.handleAnswer.bind(this);

        this.Submit = this.Submit.bind(this);
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
                        checked={this.state.selectedAnswer === question[counter1].answerA}
                        value={question[counter1].answerA} /> {question[counter1].answerA}</label>
                <label className="list-group-item">
                    <input onChange={this.handleAnswer}
                        id='answerB'
                        type="radio"
                        name="answer"
                        checked={this.state.selectedAnswer === question[counter1].answerB}
                        value={question[counter1].answerB} /> {question[counter1].answerB}</label>
                <label className="list-group-item">
                    <input onChange={this.handleAnswer}
                        id='answerC'
                        type="radio"
                        name="answer"
                        checked={this.state.selectedAnswer === question[counter1].answerC}
                        value={question[counter1].answerC}/> {question[counter1].answerC}</label>
                <label className="list-group-item">
                    <input onChange={this.handleAnswer}
                        id='answerD'
                        type="radio"
                        name="answer"
                        checked={this.state.selectedAnswer === question[counter1].answerD}
                        value={question[counter1].answerD} /> {question[counter1].answerD}</label>
            </ul>
            <input type="button" value="Next" onClick={this.handleNextQuestion}></input>
            <button onClick={this.Submit}> Submit </button>
        </div>;

    }

    handleAnswer(event: any) {
        this.setState({ selectedAnswer: event.target.value })
    }
    public Submit(event: any) {

        if (this.state.questions[this.state.counter].correctAnswer === this.state.selectedAnswer) {
            score++;
            this.setState({ scoreState: score });
            this.setState({ submitText: "Correct" })
            console.log("Correct");
        }
        else {
            this.setState({ submitText: "Wrong Answer!" });
            console.log('Wrong answer')
        }
    }


    handleNextQuestion(event: any)
    {
        let count = this.state.counter + 1;
        this.setState({ counter: count });
        this.setState({ selectedAnswer: '' });
    }

}