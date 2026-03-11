import { getStoredAccessToken } from "./api";
import { addToCart as addToServerCart } from "./cartApi";
import { addToCart as addToLocalCart } from "./cart";
import type { ProductListItem, ProductDetail } from "./storeApi";

type AddableProduct =
  | ProductListItem
  | (ProductDetail & { image?: string | null });

function getImageFromProduct(product: AddableProduct): string | undefined {
  if ("image" in product && product.image) {
    return product.image || undefined;
  }

  if ("images" in product && Array.isArray(product.images) && product.images.length > 0) {
    return product.images[0]?.image_url || undefined;
  }

  return undefined;
}

export async function addProductToHybridCart(
  product: AddableProduct,
  qty: number = 1
) {
  const finalQty = Math.max(1, Number(qty) || 1);
  const token = getStoredAccessToken();

  if (token) {
    return await addToServerCart(product.id, finalQty);
  }

  addToLocalCart(
    {
      productId: product.id,
      slug: product.slug,
      title: product.title,
      image: getImageFromProduct(product),
      price: Number(product.sale_price || 0),
      mrp: Number(product.mrp || 0),
      gstPercent: Number(product.gst_percent || 0),
    },
    finalQty
  );

  window.dispatchEvent(new Event("cart:changed"));

  return {
    success: true,
    mode: "local",
  };
}