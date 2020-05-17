import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
    return (
        <button onClick={props.onClick}>
            {props.text}
        </button>
    )
}

const Header = ({ name }) => {
    return (
        <div>
            <h1>{name}</h1>
        </div>
    )
}

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState(Array(anecdotes.length+1).join('0').split('').map(parseFloat))

    const updatePoints = () => {
        // Maintaining immutable state: creating copy of points array
        const copy = [...points]
        copy[selected] += 1
        setPoints(copy)
    }

    const chooseRandom = () => {
        const random_num = Math.floor(Math.random() * anecdotes.length)
        console.log(random_num)
        setSelected(random_num)
    }
    
    const obtainMax = () => {
        var highestVotes = Math.max(...points)
        var i;
        var mostPoints; 
        for (i = 0; i < points.length; i++) {
            if (points[i] === highestVotes) {
                mostPoints = i
            }
        }

        return mostPoints
    }

    return (
        <div>
            <Header name='Anecdote of the day' />
            <p>{props.anecdotes[selected]}</p>
            <p>has {points[selected]} votes</p>
            <p>
                <Button onClick={() => updatePoints()} text='vote' />
                <Button onClick={() => chooseRandom()} text='next anecdote' />
            </p>
            <Header name='Anecdote with most votes' />
            <p>{props.anecdotes[obtainMax()]}</p>
            <p>has {points[obtainMax()]} votes</p>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
  
ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))