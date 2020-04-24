import { WorkerDirector } from 'meteor/unchained:core-worker';
import WorkerPlugin from 'meteor/unchained:core-worker/workers/base';
import { SubscriptionStatus } from '../db/subscriptions/schema';
import { Subscriptions } from '../db/subscriptions/collections';

class GenerateSubscriptionOrders extends WorkerPlugin {
  static key = 'shop.unchained.worker-plugin.generate-subscription-orders';

  static label = 'Generates new Orders from Subscriptions';

  static version = '1.0';

  static type = 'SUBSCRIPTION_ORDER_GENERATOR';

  static async doWork(input) {
    const subscriptions = Subscriptions.find({
      status: SubscriptionStatus.ACTIVE,
    }).fetch();
    const errors = (
      await Promise.all(
        subscriptions.map(async (subscription) => {
          try {
            const period = await subscription.director().nextPeriod();
            console.log(period);
          } catch (e) {
            return {
              name: e.name,
              message: e.message,
              stack: e.stack,
            };
          }
          return null;
        })
      )
    ).filter(Boolean);

    if (errors.length) {
      return {
        success: false,
        error: {
          name: 'SOME_SUBSCRIPTIONS_COULD_NOT_PROCESS',
          message: 'Some errors have been reported during order generation',
          logs: errors,
        },
        result: {},
      };
    }
    return {
      success: true,
      result: input,
    };
  }
}

WorkerDirector.registerPlugin(GenerateSubscriptionOrders);

export default GenerateSubscriptionOrders;
