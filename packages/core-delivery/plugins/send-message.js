import { WorkerDirector } from 'meteor/unchained:core-worker';
import { DeliveryAdapter, DeliveryDirector } from '../director';

class SendMessage extends DeliveryAdapter {
  static key = 'shop.unchained.delivery.send-message';

  static label = 'Forward Delivery via Messaging';

  static version = '1.0';

  static initialConfiguration = [
    { key: 'from', value: '' },
    { key: 'to', value: '' },
    { key: 'cc', value: '' },
  ];

  static typeSupported(type) {
    return type === 'SHIPPING';
  }

  // eslint-disable-next-line
  isActive() {
    return true;
  }

  // eslint-disable-next-line
  async estimatedDeliveryThroughput(warehousingThroughputTime) {
    return 0;
  }

  // eslint-disable-next-line
  configurationError() {
    return null;
  }

  async send(transactionContext) {
    const { order } = this.context;

    return WorkerDirector.addWork({
      type: 'MESSAGE',
      retries: 0,
      input: {
        template: 'DELIVERY',
        orderId: order._id,
        config: this.config,
        transactionContext,
      },
    });
  }
}

DeliveryDirector.registerAdapter(SendMessage);
