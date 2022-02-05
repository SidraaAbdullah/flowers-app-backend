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
    let data = [];
    if (params.page_no && params.records_per_page) {
      const skipPage = parseInt(params.page_no) - 1;
      const limitPage = parseInt(params.records_per_page);
      const skipDocuments = skipPage * limitPage;
      data = await model
        .find(query)
        .populate(populate)
        .skip(skipDocuments)
        .limit(limitPage)
        .sort(sortBy);
    } else {
      data = await model.find(query).populate(populate).sort(sortBy);
    }
    const count = await model.countDocuments(query);
    apiLogger.info('ending [paginateData] for returning data with respect to every model');
    return { data, count };
  } catch (error) {
    console.log(error.toString());
    apiLogger.error(JSON.stringify((error = error.stack)));
    return error;
  }
};
export * from './auth';
