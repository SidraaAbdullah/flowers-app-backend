export const getDeliveryQuery = (body) => {
  let query = {};
  if (body.user_id) {
    query.user_id = body.user_id;
  }
  return query;
};

export const patchDeliveryQuery = (body) => {
  let query = {};
  if (body.primary) {
    query.primary = body.primary;
  }
  return query;
};

export const patchUserQuery = (body) => {
  let query = {};
  if (body.email) {
    query.email = body.email;
  }
  if (body.name) {
    query.name = body.name;
  }
  if (body.phone_number) {
    query.phone_number = body.phone_number;
  }
  if (body.expo_notification_token) {
    query.expo_notification_token = body.expo_notification_token;
  }
  return query;
};
