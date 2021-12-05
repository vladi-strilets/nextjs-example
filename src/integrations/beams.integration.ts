import config from 'src/config';
import * as Pusher from '@pusher/push-notifications-server';

export let beamsClient: Pusher;

export const initializeBeams = () => {
  beamsClient = new Pusher(config.beams);
};
