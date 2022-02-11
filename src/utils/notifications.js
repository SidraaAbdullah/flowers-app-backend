import { Expo } from 'expo-server-sdk';
import logger from '../logger';

// HAVE TO ADD ACCESS TOKEN IN NEAR FUTURE
let expo = new Expo();
export const createMessages = (body, data, pushTokens) => {
  // Create the messages that you want to send to clents
  let messages = [];
  for (let pushToken of pushTokens) {
    // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]
    // Check that all your push tokens appear to be valid Expo push tokens
    if (!Expo.isExpoPushToken(pushToken)) {
      logger.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }
    // Construct a message (see https://docs.expo.io/versions/latest/guides/push-notifications.html)
    messages.push({
      to: pushToken,
      sound: 'default',
      title: 'Flowery',
      body,
      data,
    });
  }
  return messages;
};
export const sendNotification = async (body, data, pushTokens) => {
  const messages = createMessages(body, data, pushTokens);
  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];
  for (let chunk of chunks) {
    try {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);
    } catch (error) {
      console.error(error);
    }
  }
  return tickets;
};
