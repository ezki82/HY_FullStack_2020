import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Title = () => {
    return (
        <div>
            <h1>Please give feedback from your visit:</h1>
        </div>
    )
}

const Button = (props) => {
    return (
        <>
            <button onClick={props.clickHandler}>{props.text}</button>
        </>
    )
}

const Statistics = ({ good, neutral, bad }) => {
    const sum = good + neutral + bad
    const average = sum !== 0 ? ((good * 1.0) + (bad * -1.0)) / sum : 0
    const positive = sum !== 0 ? (good / sum) * 100 : 0

    const votes = () => {
        if (!sum) {
            return (
                <div>
                    <p>No feedback</p>
                </div>
            )
        }
        return (
            <table>
                <tbody>
                    <StatisticLine text="good" value={good} />
                    <StatisticLine text="neutral" value={neutral} />
                    <StatisticLine text="bad" value={bad} />
                    <StatisticLine text="all" value={good + neutral + bad} />
                    <StatisticLine text="average" value={average} />
                    <StatisticLine text="positive" value={positive} unit="%" />
                </tbody>
            </table>
        )
    }

    return (
        <div>
            <h1>Statistics:</h1>
            {votes()}
        </div>
    )
}

const StatisticLine = ({ text, value, unit }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
            <td>{unit}</td>
        </tr>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const positiveClickHandler = () => {
        setGood(good + 1)
    }
    const neutralClickHandler = () => {
        setNeutral(neutral + 1)
    }
    const negativeClickHandler = () => {
        setBad(bad + 1)
    }

    return (
        <div>
            <Title />
            <Button clickHandler={positiveClickHandler} text="Positive" />
            <Button clickHandler={neutralClickHandler} text="Neutral" />
            <Button clickHandler={negativeClickHandler} text="Negative" />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
