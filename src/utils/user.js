export const getDeliveryQuery = (body) => {
  let query = {};
  if (body.user_id) {
    query.user_id = body.user_id;
  }
  return query;
};

export const patchUserQuery = (body) => {
  let query = {};
  if (body.primary) {
    query.primary = body.primary;
  }
  return query;
};
