﻿import * as React from 'react';
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
    resultClassName: string;
    userName: string;
    progressClassBar: string;
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
            resultClassName: '',
            userName: '',
            progressClassBar: ''
        };
        this.handleNextQuestion = this.handleNextQuestion.bind(this);
        this.handleAnswer = this.handleAnswer.bind(this);
        this.submitScore = this.submitScore.bind(this);
        this.Submit = this.Submit.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.StartQuiz = this.StartQuiz.bind(this);
        this.GetResults = this.GetResults.bind(this);
        this.handleRestartQuiz = this.handleRestartQuiz.bind(this);

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
            <h3 hidden={!this.state.isNameTextboxAndLabelVisible} className="nameLabel">Skriv in ditt namn:</h3>
            <input type="text" onChange={this.handleChangeName} className="nameInput" id="nameInput" value={this.state.userName} name="username" hidden={!this.state.isNameTextboxAndLabelVisible}></input>
            <button className="btn-success GreenBtn" type="button" onClick={this.StartQuiz} hidden={!this.state.isStartQuizVisible}> Start Quiz!</button>

            <ul className="list-group" hidden={!this.state.isQuizVisible}>
               
                <div className="list-group-item"><h3>{question[counter1]._question}</h3><span className="questionCounter"> <div className="progress">
                    <div id="progressbar" className={this.state.progressClassBar} role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">{counter1 + 1} / {question.length}
                        <span className="sr-only"></span>
                    </div>
                </div></span></div>
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
                <br />
                <button hidden={!this.state.isHiddenBtnSubmit} className="btn-success GreenBtn" onClick={this.Submit}> Submit </button>
                <p className={this.state.resultClassName}>{this.state.submitText}</p>
                <button hidden={!this.state.isHiddenBtnNext} className="btn-success GreenBtn" type="button" onClick={this.handleNextQuestion}>Next</button>
                <button hidden={!this.state.isGetResultsButtonVisible} className="btn-success GreenBtn" type="button" onClick={this.GetResults}>Get Result</button>
            </ul>
            <br/>
            <div hidden={!this.state.isResultsVisible}>
                <p>Well done {this.state.userName}!</p>
                <p>You got {Points} points</p>
                <button className="btn btn-success" onClick={this.handleRestartQuiz}>Restart quiz</button>
            </div>
        </div>;

    }

    handleAnswer(event: any) {
        this.setState({ selectedAnswer: event.target.value })
    }

    handleRestartQuiz(event: any) {
        this.setState({ counter: 0 });
        let count = this.state.counter;
        this.setState({ isNameTextboxAndLabelVisible: true });
        this.setState({ isStartQuizVisible: true });
        this.setState({ userName: '' });
        Points = 0;
        this.setState({ isResultsVisible: false });
        this.setState({ isGetResultsButtonVisible: false });
        this.setState({ submitText: '' });
        this.setState({ isDisabledBtnRadio: false });
        this.setState({ isHiddenBtnSubmit: true });
        this.setState({ progressClassBar: 'progress-bar progress-bar-striped active' })
        document.getElementById('progressbar')!.style.width = count / this.state.questions.length * 100 + '%';
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
            this.setState({ resultClassName: 'correct' });
            this.setState({ submitText: "Correct" })
            console.log('Correct answer!');
        
            this.checkIfLastQuestion(Points);
        }
        else {
            this.setState({ resultClassName: 'wrong' });
            this.setState({ submitText: "Wrong Answer!" });
            console.log('Wrong answer!')
            this.checkIfLastQuestion(Points);
        }

    }

    checkIfLastQuestion(Points: number) {
     
        if (this.state.counter + 1 == this.state.questions.length) {
            let count = this.state.counter + 1;
            this.setState({ isHiddenBtnNext: false });
            this.setState({ isGetResultsButtonVisible: true });
            this.submitScore(Points);
            this.setState({ progressClassBar: 'progress-bar progress-bar-success ' })
            document.getElementById('progressbar')!.style.width = count / this.state.questions.length * 100 + '%';
        }
    }

    handleChangeName(event: any) {
        this.setState({ userName: event.target.value })
    }

    GetResults(event: any) {
        this.setState({ isResultsVisible: true });
        this.setState({ isHiddenBtnNext: false });
        this.setState({ isHiddenBtnSubmit: false });
        this.setState({ isDisabledBtnRadio: true });
        this.setState({ isQuizVisible: false });
        this.setState({ isStartQuizVisible: false });
        this.setState({ isNameTextboxAndLabelVisible: false });
    }


    handleNextQuestion(event: any) {
        let count = this.state.counter + 1;
        this.setState({ counter: count });
        this.setState({ selectedAnswer: '' });
        this.setState({ submitText: '' });
        this.setState({ isHiddenBtnNext: false });
        this.setState({ isHiddenBtnSubmit: true });
        this.setState({ isDisabledBtnRadio: false });
        this.setState({ progressClassBar: 'progress-bar progress-bar-striped active' })
        document.getElementById('progressbar')!.style.width = count / this.state.questions.length * 100 + '%';
        
    }

    submitScore(Points: number) {
        fetch('api/Scores/AddScore?UserName=' + this.state.userName + '&points=' + Points)
            .then(response => console.log('Status: ', response.status));

        this.setState({ scoreState: 0 });
    }

}