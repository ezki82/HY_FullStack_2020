import React from 'react'

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => {

    const total = parts.reduce((sum, part) =>{       
        return(
            sum + part.exercises
        )
    },0)
    
    return (
        <div>
                {parts.map((part, index) =>
                    <Part key={index} part={part} />
                )}
                <p><b>total of {total} exercises</b></p>
        </div>
    )
}

const Header = ({ header }) => <h2>{header}</h2>


const Course = ({ course }) => {
    return (
        <div>
            <Header header={course.name} />
            <Content parts={course.parts}/>
        </div>
    )
}

export default Course