import { CrossStorageHub } from 'cross-storage';
import config from 'config';

CrossStorageHub.init(config.crossStorageRules);