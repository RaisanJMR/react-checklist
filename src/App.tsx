
import { useState } from 'react'


interface CheckboxState {
  [key: string]: boolean;
}

interface ShopItems {
  [key: string]: CheckboxState;
}

const shopDefaults: ShopItems = {
  a: { pizza: true, pasta: false, ramen: true },
  b: { pizza: true, gelato: true, tempura: true },
  c: { pizza: true, tempura: true }
};

function App() {

  const [isChecked, setIsChecked] = useState<Record<string, CheckboxState>>({
    italy: { pizza: false, pasta: false, gelato: false },
    japan: { sushi: false, ramen: false, tempura: false }
  })

  const [selectedShop, setSelectedShop] = useState<string>('a');

  // CHANGE HANDLER
  const handleChange = (section: string, id: string, checked: boolean) => {
    setIsChecked(prev => ({
      ...prev,
      [section]: { ...prev[section], [id]: checked }
    }));
  }

  // CLEAR HANDLER
  const handleClear = (section: string) => {
    const sectionKeys: string[] = Object.keys(isChecked[section]);
    const checkboxEntries: [string, boolean][] = sectionKeys.map((key: string) => [key, false]);
    const clearedState: CheckboxState = Object.fromEntries(checkboxEntries);
    setIsChecked((prevState: Record<string, CheckboxState>) => ({
      ...prevState,
      [section]: clearedState
    }));
  }

  //  CLEAR ALL HANDLER
  const handleClearAll = () => {
    const clearedState: Record<string, CheckboxState> = Object.fromEntries(
      Object.keys(isChecked).map(sectionKey => {
        const checkboxEntries = Object.keys(isChecked[sectionKey]).map(key => [key, false]);
        const sectionEntries: [string, CheckboxState] = [sectionKey, Object.fromEntries(checkboxEntries)];
        return sectionEntries;
      })
    );
    setIsChecked(clearedState);
  }

  const handleShopChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedShop = e.target.value;
    setSelectedShop(selectedShop);
    const newCheckedState: ShopItems = {};
    for (const shopKey in shopDefaults[selectedShop]) {
      newCheckedState[shopKey] = { ...shopDefaults[selectedShop][shopKey] };
    }
  
    setIsChecked(newCheckedState);

  }

  return (
    <>
      <label htmlFor='shop'>choose a shop:</label>
      <select name="shop" id="shop" onChange={handleShopChange} value={selectedShop}>
        <option value="a">A</option>
        <option value="b">B</option>
        <option value="c">C</option>
      </select>
      <br />
      <button onClick={handleClearAll}>clear all</button>
      <p>Italy</p>
      <button onClick={() => handleClear('italy')}>clear</button>
      <input type="checkbox" id="pizza" name="pizza" value="pizza" checked={isChecked.italy.pizza} onChange={(e) => handleChange('italy', e.target.id, e.target.checked)} />
      <label htmlFor="pizza">pizza</label>

      <input type="checkbox" id="pasta" name="pasta" value="pasta" checked={isChecked.italy.pasta} onChange={(e) => handleChange('italy', e.target.id, e.target.checked)} />
      <label htmlFor="pasta">Pasta</label><br />

      <input type="checkbox" id="gelato" name="gelato" value="gelato" checked={isChecked.italy.gelato} onChange={(e) => handleChange('italy', e.target.id, e.target.checked)} />
      <label htmlFor="gelato">Gelato</label><br />

      <p>Japan:</p>
      <button onClick={() => handleClear('japan')}>clear</button>
      <input type="checkbox" id="sushi" name="sushi" value="sushi" checked={isChecked.japan.sushi} onChange={(e) => handleChange('japan', e.target.id, e.target.checked)} />
      <label htmlFor="sushi">Sushi</label>

      <input type="checkbox" id="ramen" name="ramen" value="ramen" checked={isChecked.japan.ramen} onChange={(e) => handleChange('japan', e.target.id, e.target.checked)} />
      <label htmlFor="ramen">Ramen</label><br />

      <input type="checkbox" id="tempura" name="tempura" value="tempura" checked={isChecked.japan.tempura} onChange={(e) => handleChange('japan', e.target.id, e.target.checked)} />
      <label htmlFor="tempura">Tempura</label><br />
    </>
  )
}

export default App
