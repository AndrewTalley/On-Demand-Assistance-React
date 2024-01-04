import NavBar from '../components/NavBar'
import ShoppingCart from '../components/ShoppingCart'

export default function ShoppingCartPage({ toggleMode, mode }) {
  return (
    <>
      <NavBar toggleMode={toggleMode} mode={mode} />
      <ShoppingCart />
    </>
  )
}
