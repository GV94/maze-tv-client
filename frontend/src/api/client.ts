import { clientFactory } from './clientFactory';

export type Client = ReturnType<typeof clientFactory>;
