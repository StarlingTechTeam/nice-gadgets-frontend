import { useNavigate } from 'react-router-dom';
import { useCart } from '@hooks/useCart';
import CartTemplate from '@templates/CartTemplate/CartTemplate';

const CartPage = () => {
  const navigate = useNavigate();

  const {
    items,
    subtotal,
    shipping,
    discount,
    total,
    totalWithoutDiscount,
    itemCount,
    isLoading,
    error,
    discountCode,
    shippingMethod,
    shippingAddress,
    updateQuantity,
    removeItem,
    clearCart,
    applyDiscount,
    removeDiscount,
  } = useCart();

  const handleCheckout = () => {
    if (!shippingMethod || !shippingAddress) {
      console.warn('Shipping information incomplete');
      return;
    }

    navigate('/checkout', {
      state: {
        items,
        subtotal,
        shipping,
        discount,
        total,
        shippingMethod,
        shippingAddress,
      },
    });
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    updateQuantity(itemId, newQuantity);
  };
  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };

  const handleApplyCoupon = async (code: string) => {
    await applyDiscount(code);
  };
  const handleRemoveCoupon = () => {
    removeDiscount();
  };

  return (
    <CartTemplate
      items={items}
      itemCount={itemCount}
      subtotal={subtotal}
      shippingCost={shipping}
      discountAmount={discount}
      total={total}
      totalPriceWithoutDiscounts={totalWithoutDiscount}
      appliedCoupon={discountCode}
      shippingMethod={shippingMethod}
      shippingAddress={shippingAddress}
      isLoading={isLoading}
      error={error}
      onQuantityChange={handleQuantityChange}
      onRemoveItem={handleRemoveItem}
      onClearCart={handleClearCart}
      onCheckout={handleCheckout}
      onApplyCoupon={handleApplyCoupon}
      onRemoveCoupon={handleRemoveCoupon}
    />
  );
};

export default CartPage;
