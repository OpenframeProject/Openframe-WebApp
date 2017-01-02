import { CrossStorageHub } from 'cross-storage';

CrossStorageHub.init([
    {
        origin: /localhost:3030$/,
        allow: ['get']
    }
]);