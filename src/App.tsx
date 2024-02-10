
import { useState } from 'react'

function App() {
  
  const [isChecked, setIsChecked] = useState<{ [key: string]: boolean }>({
    pizza: false, pasta: false, gelato: false
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target
    setIsChecked(prev => ({ ...prev, [id]: checked }))
  }

  const handleClear = () => {
    const clearedState = Object.fromEntries(Object.keys(isChecked).map(key => [key, false]));
    setIsChecked(clearedState)
  }

  return (
    <>
      <p>Italy</p>
      <button onClick={handleClear}>clear</button>
      <input type="checkbox" id="pizza" name="pizza" value="pizza" checked={isChecked.pizza} onChange={handleChange} />
      <label htmlFor="pizza">pizza</label>

      <input type="checkbox" id="pasta" name="pasta" value="pasta" checked={isChecked.pasta} onChange={handleChange} />
      <label htmlFor="pasta">Pasta</label><br />

      <input type="checkbox" id="gelato" name="gelato" value="gelato" checked={isChecked.gelato} onChange={handleChange} />
      <label htmlFor="gelato">Gelato</label><br />
    </>
  )
}

export default App
