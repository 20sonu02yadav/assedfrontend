// src/services/cart.ts
export type CartItem = {
  productId: number;
  slug: string;
  title: string;
  image?: string;
  price: number; // sale price
  mrp?: number;
  gstPercent?: number;
  qty: number;
};

const KEY = "tunturu_cart_v1";

function read(): CartItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function write(items: CartItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
  // let components refresh
  window.dispatchEvent(new Event("cart:changed"));
}

export function getCart(): CartItem[] {
  return read();
}

export function clearCart() {
  write([]);
}

export function getCartCount(): number {
  return read().reduce((sum, it) => sum + (Number(it.qty) || 0), 0);
}

export function addToCart(
  item: Omit<CartItem, "qty">,
  qty: number = 1
) {
  const items = read();
  const q = Math.max(1, Number(qty) || 1);

  const idx = items.findIndex((x) => x.productId === item.productId);
  if (idx >= 0) {
    items[idx] = { ...items[idx], qty: items[idx].qty + q };
  } else {
    items.push({ ...item, qty: q });
  }
  write(items);
}

export function updateQty(productId: number, qty: number) {
  const items = read();
  const q = Number(qty) || 0;

  const idx = items.findIndex((x) => x.productId === productId);
  if (idx === -1) return;

  if (q <= 0) {
    items.splice(idx, 1);
  } else {
    items[idx] = { ...items[idx], qty: q };
  }
  write(items);
}

export function removeFromCart(productId: number) {
  const items = read().filter((x) => x.productId !== productId);
  write(items);
}