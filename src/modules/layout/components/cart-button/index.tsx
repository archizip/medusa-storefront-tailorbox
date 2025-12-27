import { retrieveCart } from "@lib/data/cart"
import CartButtonMui from "../cart-button-mui"

export default async function CartButton() {
  const cart = await retrieveCart().catch(() => null)

  return <CartButtonMui cart={cart} />
}
