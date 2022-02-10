import { USER_TYPES } from '../constants';

export const getOrdersQuery = (params, user) => {
  let query = {};
  if (params.type) {
    if (params.type === USER_TYPES.ADMIN) {
      query = {};
    }
  } else {
    query = { ...query, user_id: user._id };
  }
  if (params.status) {
    query = { ...query, status: params.status };
  }
  return query;
};
