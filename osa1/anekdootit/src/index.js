import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ clickHandler, text }) => {
  return (
    <>
      <button onClick={clickHandler}>{text}</button>
    </>
  )
}

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdote}
    </div>
  )
}

const MostPopularAnecdote = ({ anecdotes, voteArray }) => {
  let sum = 0
  let mostPopularIndex = 0
  let biggestVoteCount = 0

  for (let index = 0; index < voteArray.length; index++) {
    sum += voteArray[index]
    if (voteArray[index] > biggestVoteCount) {
      biggestVoteCount = voteArray[index]
      mostPopularIndex = index
    }
  }

  if (!sum) {
    return (
      <div></div>
    )
  }

  return (
    <div>
      <h1>Anecdote with most votes:</h1>
      {anecdotes[mostPopularIndex]} <br/>
      has {voteArray[mostPopularIndex]} votes.
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [voteArray, setVoteArray] = useState([0, 0, 0, 0, 0, 0])

  const anecdoteClickHandler = () => {
    const anecdoteIndex = Math.floor(Math.random() * 6)
    setSelected(anecdoteIndex)
    console.log(voteArray);
    
  }

  const anecdoteVoteHandler = () => {
    const voteArrayCopy = [...voteArray]
    voteArrayCopy[selected] += 1
    setVoteArray(voteArrayCopy)
  }

  return (
    <div>
      <Anecdote anecdote={props.anecdotes[selected]} />
      <Button clickHandler={anecdoteVoteHandler} text="vote" />
      <Button clickHandler={anecdoteClickHandler} text="next anecdote" />
      <MostPopularAnecdote anecdotes={props.anecdotes} voteArray={voteArray}/>
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

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)