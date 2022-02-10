import { USER_TYPES } from '../constants';

export const getDriversQuery = (params, user) => {
  let query = {};
  if (params.type) {
    if (params.type === USER_TYPES.ADMIN) {
      query = {};
    }
  } else {
    query = { ...query, _id: user._id };
  }
  return query;
};
