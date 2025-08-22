import React, { useEffect, useState } from 'react'

function ExampleUseEffect() {
  const [count, setCount] = useState(0)

  function addCount() {
    setCount(count + 1)
  }

  useEffect(() => {
    console.log("Компонент смонтирован")
  }, [])

  useEffect(() => {
    console.log(`Счётчик поменялся.\nНовое значение: ${count}`)
  }, [count])

  return (
    <div>
      <p>Счетчик: {count}</p>
      <button onClick={addCount}>++</button>
    </div>
  )
}

export default ExampleUseEffect