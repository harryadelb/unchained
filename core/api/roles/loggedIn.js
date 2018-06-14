import { Orders, OrderPayments, OrderDeliveries } from 'meteor/unchained:core-orders';

export default (role, actions) => {
  const isMyself = (root, { userId: foreignUserId } = {}, { userId: ownUserId } = {}) =>
    foreignUserId === ownUserId || !foreignUserId;

  const isOwnedOrder = (root, { orderId }, { userId }) => Orders.find({
    _id: orderId,
    userId,
  }).count() > 0;

  const isOwnedOrderPayment = (root, { orderPaymentId }, { userId }) => {
    const payment = OrderPayments.findOne({ _id: orderPaymentId });
    const orderId = payment && payment.orderId;
    return isOwnedOrder(null, { orderId }, { userId });
  };

  const isOwnedOrderDelivery = (root, { orderDeliveryId }, { userId }) => {
    const delivery = OrderDeliveries.findOne({ _id: orderDeliveryId });
    const orderId = delivery && delivery.orderId;
    return isOwnedOrder(null, { orderId }, { userId });
  };

  role.allow(actions.viewUser, isMyself);
  role.allow(actions.viewUserRoles, isMyself);
  role.allow(actions.updateUser, isMyself);
  role.allow(actions.viewOrder, isOwnedOrder);
  role.allow(actions.captureOrder, isOwnedOrder);
  role.allow(actions.updateOrder, isOwnedOrder);
  role.allow(actions.updateOrderPayment, isOwnedOrderPayment);
  role.allow(actions.updateOrderDelivery, isOwnedOrderDelivery);
  role.allow(actions.checkoutCart, () => true);
  role.allow(actions.updateCart, () => true);
};
