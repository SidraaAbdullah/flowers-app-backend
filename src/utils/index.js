import { apiLogger } from '../logger';

export const sortByMethod = (sort_by, order) => {
  if (sort_by && order) {
    return { [sort_by]: order };
  }
  return { createdAt: -1 };
};
export const paginateData = async (model, query, params, populate) => {
  try {
    apiLogger.info('[paginateData] for returning data with respect to every model');
    const sortBy = sortByMethod(params.sort_by, params.order);
    const options = {
      page: params.page_no,
      limit: parseInt(params.records_per_page),
      sort: sortBy,
      pagination: params.page_no && params.records_per_page,
      populate,
    };
    const data = await model.paginate(query, options);
    apiLogger.info('ending [paginateData] for returning data with respect to every model');
    const { docs, ...remaining } = data;
    return { pagination: remaining, data: docs };
  } catch (error) {
    console.log(error.toString());
    apiLogger.error(JSON.stringify((error = error.stack)));
    return error;
  }
};
export * from './auth';
