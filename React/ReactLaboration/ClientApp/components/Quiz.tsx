import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import 'isomorphic-fetch';
import { Counter } from './Counter';


let Points: number;
Points = 0;

interface IQuizQuestionProps {
}
interface IQuizQuestionState {
    loading: boolean;
    questions: Question[];
    selectedAnswer: string;
    scoreState: number;
    submitText: string;
    counter: number;
    isHiddenBtnNext: boolean;
    isHiddenBtnSubmit: boolean;
    isDisabledBtnRadio: boolean;
    isQuizVisible: boolean;
    isNameTextboxAndLabelVisible: boolean;
    isStartQuizVisible: boolean;
    isGetResultsButtonVisible: boolean;
    isResultsVisible: boolean;
    userName: string;
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
            submitText: '',
            isHiddenBtnNext: false,
            isHiddenBtnSubmit: true,
            isDisabledBtnRadio: false,
            isQuizVisible: false,
            isNameTextboxAndLabelVisible: true,
            isStartQuizVisible: true,
            isGetResultsButtonVisible: false,
            isResultsVisible: false,
            userName: ''
        };
        this.handleNextQuestion = this.handleNextQuestion.bind(this);
        this.handleAnswer = this.handleAnswer.bind(this);
        this.submitScore = this.submitScore.bind(this);
        this.Submit = this.Submit.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.StartQuiz = this.StartQuiz.bind(this);
        this.GetResults = this.GetResults.bind(this);

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
        console.log(this.state.userName)
        return <div> {contents} </div>;
    }

    public renderQuestionTable(question: Question[], counter1: number) {
        return <div>
            <h3 hidden={!this.state.isNameTextboxAndLabelVisible}>Skriv in ditt namn:</h3>
            <input type="text" onChange={this.handleChangeName} name="username" hidden={!this.state.isNameTextboxAndLabelVisible}></input>

            <input type="button" onClick={this.StartQuiz} value="Start Quiz!" hidden={!this.state.isStartQuizVisible}></input>

            <ul className="list-group" hidden={!this.state.isQuizVisible}>
                <div className="list-group-item"><h3>{question[counter1]._question}</h3><span className="questionCounter">{counter1 + 1} / {question.length}</span></div>
                <label className="list-group-item">
                    <input onChange={this.handleAnswer}
                        id='answerA'
                        type="radio"
                        name="answer"
                        disabled={this.state.isDisabledBtnRadio}
                        checked={this.state.selectedAnswer === question[counter1].answerA}
                        value={question[counter1].answerA} /> {question[counter1].answerA}</label>
                <label className="list-group-item">
                    <input onChange={this.handleAnswer}
                        id='answerB'
                        type="radio"
                        name="answer"
                        disabled={this.state.isDisabledBtnRadio}
                        checked={this.state.selectedAnswer === question[counter1].answerB}
                        value={question[counter1].answerB} /> {question[counter1].answerB}</label>
                <label className="list-group-item">
                    <input onChange={this.handleAnswer}
                        id='answerC'
                        type="radio"
                        name="answer"
                        disabled={this.state.isDisabledBtnRadio}
                        checked={this.state.selectedAnswer === question[counter1].answerC}
                        value={question[counter1].answerC} /> {question[counter1].answerC}</label>
                <label className="list-group-item">
                    <input onChange={this.handleAnswer}
                        id='answerD'
                        type="radio"
                        name="answer"
                        disabled={this.state.isDisabledBtnRadio}
                        checked={this.state.selectedAnswer === question[counter1].answerD}
                        value={question[counter1].answerD} /> {question[counter1].answerD}</label>
                <br/>
            <button hidden={!this.state.isHiddenBtnSubmit} onClick={this.Submit}> Submit </button>
            <p>{this.state.submitText}</p>
                <input hidden={!this.state.isHiddenBtnNext} type="button" value="Next" onClick={this.handleNextQuestion}></input>
                <input hidden={!this.state.isGetResultsButtonVisible} type="button" value="Get results" onClick={this.GetResults}></input>
                <div hidden={!this.state.isResultsVisible}>
                    <p>Well done {this.state.userName}!</p>
                    <p>You got {Points} points</p>
                </div>
            </ul>
        </div>;

    }

    handleAnswer(event: any) {
        this.setState({ selectedAnswer: event.target.value })
    }

    StartQuiz(event: any) {
        this.setState({ isQuizVisible: true });
        this.setState({ isStartQuizVisible: false });
        this.setState({ isNameTextboxAndLabelVisible: false });
        this.setState({ scoreState: 0 });
        Points = 0;
    }

    public Submit(event: any) {
        this.setState({ isHiddenBtnNext: true });
        this.setState({ isHiddenBtnSubmit: false });
        this.setState({ isDisabledBtnRadio: true });

        if (this.state.questions[this.state.counter].correctAnswer == this.state.selectedAnswer) {
            Points++;
            this.setState({ scoreState: Points });
            this.setState({ submitText: "Correct" })
            console.log('Correct answer!');
            this.checkIfLastQuestion(Points);
        }
        else {
            this.setState({ submitText: "Wrong Answer!" });
            console.log('Wrong answer!')
            this.checkIfLastQuestion(Points);
        }
    }

    checkIfLastQuestion(Points: number) {
        if (this.state.counter + 1 == this.state.questions.length) {
            this.setState({ isHiddenBtnNext: false });
            this.setState({ isGetResultsButtonVisible: true });
            this.submitScore(Points);
        }
    }

    handleChangeName(event: any) {
        this.setState({ userName: event.target.value})
    }

    GetResults(event: any) {
        this.setState({ isResultsVisible: true });
    }


    handleNextQuestion(event: any)
    {
        let count = this.state.counter + 1;
        this.setState({ counter: count });
        this.setState({ selectedAnswer: '' });
        this.setState({ submitText: '' });
        this.setState({ isHiddenBtnNext: false });
        this.setState({ isHiddenBtnSubmit: true });
        this.setState({ isDisabledBtnRadio: false });
    }

    submitScore(Points: number) {
        fetch('api/Scores/AddScore?UserName=' + this.state.userName + '&points=' + Points)
            .then(response => console.log('Status: ', response.status));

        this.setState({ scoreState: 0 });
    }

}