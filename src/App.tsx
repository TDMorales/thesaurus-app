import { useState } from 'react'
import './App.css'

interface Result {
  word: string,
  score: number
}

function App() {
  const [input, setInput] = useState<string>("")
  const [results, setResults] = useState<Result[]>([])

  const handleFetchSynonym = (e: React.FormEvent) => {
    e.preventDefault()

    fetch(`https://api.datamuse.com/words?rel_syn=${input}`)
      .then((res) => {
        if(!res.ok){
          alert(`there was an issue with the query ${res.statusText}`)
        }
        return res.json()
      })
      .then(json => setResults(json))
      .catch((err) =>{
        alert(`Error getting synonyms: ${err.message}`)
      })
  }

  return (
    <div className="App">
      <form action="/url" onSubmit={handleFetchSynonym}>
        <label htmlFor="word-input">Your Word: </label>
        <input value={input} id="word-input" type="text" onChange={(e) => setInput(e.target.value)}/>
        <button>Submit</button>
      </form>
      {results.map(({word}: Result) => (
        <h2>{word}</h2>
      ))}
    </div>
  )
}

export default App
