import { api } from "./api";
import {
  getCart as getLocalCart,
  clearCart as clearLocalCart,
  type CartItem as LocalCartItem,
} from "./cart";

export type CartItem = {
  id: number;
  product: number;
  product_title: string;
  product_slug?: string;
  product_image?: string | null;
  unit_price?: string;
  quantity: number;
  line_total?: string;
};

export type Cart = {
  id: number;
  items: CartItem[];
  total_amount?: string;
};

export async function getCart(): Promise<Cart> {
  const res = await api.get("/cart/");
  return res.data;
}

export async function addToCart(product_id: number, quantity = 1) {
  const res = await api.post("/cart/add/", { product_id, quantity });
  window.dispatchEvent(new Event("cart:changed"));
  return res.data;
}

export async function updateCartItemQty(item_id: number, quantity: number) {
  const res = await api.patch(`/cart/items/${item_id}/`, { quantity });
  window.dispatchEvent(new Event("cart:changed"));
  return res.data;
}

export async function removeCartItem(item_id: number) {
  const res = await api.delete(`/cart/items/${item_id}/remove/`);
  window.dispatchEvent(new Event("cart:changed"));
  return res.data;
}

/* --------------------------------
   GUEST CART MERGE
-------------------------------- */

function sumGuestCartByProduct(items: LocalCartItem[]) {
  const map = new Map<number, number>();

  for (const item of items) {
    const pid = Number(item.productId);
    const qty = Math.max(1, Number(item.qty || 1));

    map.set(pid, (map.get(pid) || 0) + qty);
  }

  return map;
}

export async function mergeGuestCartToServer() {
  const guestItems = getLocalCart();

  if (!guestItems.length) {
    return { merged: 0, skipped: 0 };
  }

  let serverCart: Cart | null = null;

  try {
    serverCart = await getCart();
  } catch {
    serverCart = null;
  }

  const guestQtyMap = sumGuestCartByProduct(guestItems);

  const serverQtyMap = new Map<number, { itemId: number; quantity: number }>();

  if (serverCart?.items?.length) {
    for (const item of serverCart.items) {
      serverQtyMap.set(Number(item.product), {
        itemId: item.id,
        quantity: Number(item.quantity || 0),
      });
    }
  }

  let merged = 0;
  let skipped = 0;

  for (const [productId, guestQty] of guestQtyMap.entries()) {
    try {
      const serverRow = serverQtyMap.get(productId);

      if (serverRow) {
        await updateCartItemQty(serverRow.itemId, serverRow.quantity + guestQty);
      } else {
        await addToCart(productId, guestQty);
      }

      merged += 1;
    } catch {
      skipped += 1;
    }
  }

  if (merged > 0) {
    clearLocalCart();
    window.dispatchEvent(new Event("cart:changed"));
  }

  return { merged, skipped };
}