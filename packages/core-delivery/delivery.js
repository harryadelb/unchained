import './db/factories';
import './db/helpers';
import runMigrations from './db/schema';
import { DeliveryDirector } from './director';

export * from './db/schema';
export * from './db/collections';
export * from './director';

export default ({ sortProviders } = {}) => {
  // configure
  DeliveryDirector.setSortProviders(sortProviders);
  runMigrations();
};
