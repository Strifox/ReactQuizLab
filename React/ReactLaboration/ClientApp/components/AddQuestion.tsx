import * as React from 'react';
import { render } from 'react-dom';
import { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface IAddQuizQuestionProps { }
interface IAddQuizQuestionState {
    _question: string;
    answerA: string;
    answerB: string;
    answerC: string;
    answerD: string;
    correctAnswer: string;
    hasFetchedData: boolean;
}

export class AddQuestion extends React.Component<RouteComponentProps<{}>, IAddQuizQuestionState> {
    public constructor() {
        super();
        this.state = {
            _question: "",
            answerA: "",
            answerB: "",
            answerC: "",
            answerD: "",
            correctAnswer: "",
            hasFetchedData: false
        };
        this.handleChangeQuestion = this.handleChangeQuestion.bind(this);
        this.handleChangeAnswerA = this.handleChangeAnswerA.bind(this);
        this.handleChangeAnswerB = this.handleChangeAnswerB.bind(this);
        this.handleChangeAnswerC = this.handleChangeAnswerC.bind(this);
        this.handleChangeAnswerD = this.handleChangeAnswerD.bind(this);
        this.handleCorrectAnswer = this.handleCorrectAnswer.bind(this);
        this.fetchAddQuestion = this.fetchAddQuestion.bind(this);
    }

    public render() {
        return (
            <div>
                <h1>Add Question</h1>
                <div className="AddQuestion">
                    <label>Question</label>
                    <br />
                    <input type="text"
                        placeholder="Skriv in din fråga"
                        value={this.state._question}
                        onChange={this.handleChangeQuestion} />
                </div>
                <br />
                <div className="Answer">
                    <label>Answer A</label>
                    <br />
                    <input type="text"
                        placeholder="Alternative A"
                        value={this.state.answerA}
                        onChange={this.handleChangeAnswerA} />
                </div>
                <br />
                <div className="Answer">
                    <label>Answer B</label>
                    <br />
                    <input type="text"
                        placeholder="Alternative B"
                        value={this.state.answerB}
                        onChange={this.handleChangeAnswerB} />
                </div>
                <br />
                <div className="Answer">
                    <label>Answer C</label>
                    <br />
                    <input type="text"
                        placeholder="Alternative C"
                        value={this.state.answerC}
                        onChange={this.handleChangeAnswerC} />
                </div>
                <br />
                <div className="Answer">
                    <label>Answer D</label>
                    <br />
                    <input type="text"
                        placeholder="Alternative D"
                        value={this.state.answerD}
                        onChange={this.handleChangeAnswerD} />
                </div>
                <br />
                <div className="CorrectAnswer">
                    <label>Correct Answer</label>
                    <br />
                    <input type="text"
                        placeholder="Correct Answer"
                        value={this.state.correctAnswer}
                        onChange={this.handleCorrectAnswer} />
                </div>
                <br />
                <button className="btn btn-default" onClick={this.fetchAddQuestion}>Add Question</button>
            </div>
        )
    }

    handleChangeQuestion(event: any) {
        this.setState({ _question: event.target.value })
    }

    handleChangeAnswerA(event: any) {
        this.setState({ answerA: event.target.value })
    }
    handleChangeAnswerB(event: any) {
        this.setState({ answerB: event.target.value })
    }
    handleChangeAnswerC(event: any) {
        this.setState({ answerC: event.target.value })
    }
    handleChangeAnswerD(event: any) {
        this.setState({ answerD: event.target.value })
    }
    handleCorrectAnswer(event: any) {
        this.setState({ correctAnswer: event.target.value })
    }

    fetchAddQuestion() {

        fetch('api/Questions/AddQuestion?_question=' + this.state._question + '&answerA=' + this.state.answerA + '&answerB=' + this.state.answerB + '&answerC=' + this.state.answerC + '&answerD=' + this.state.answerD + '&correctAnswer=' + this.state.correctAnswer)
            .then(Response => { console.log(Response.json())})
            .catch(message => { console.log('Error' + message); });
        this.setState({ hasFetchedData: false });

    }
}

