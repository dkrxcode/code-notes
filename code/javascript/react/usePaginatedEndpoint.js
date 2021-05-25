const geoLoginsRequest = PaginatedEndpoint('/misc/geolocation', {
  user_id: userEmail,
  limit: LIMIT,
});

function PaginatedEndpoint(url, params) {
const { limit } = params;
let isLoading = false;
let offset = 0;
let data = [];
let hasNext = true;

function fetchNext(handleResponse) {
  isLoading = true;
  console.log({before: true, isLoading, offset, hasNext, data: data.length});
  return axios
    .get(url, {
      params: {
        ...params,
        offset,
      },
    })
    .then((res) => {

      if (res.data.length < limit) {
        hasNext = false;
      }
      offset = offset + limit;
      data = [...data, ...res.data];
      isLoading = false;

      const result = {
        isLoading,
        hasNext,
        data
      };
      console.log({after: true, isLoading, offset, hasNext, data: data.length});
      handleResponse(result);
      return result;
    });
}

return {
  hasNext,
  fetchNext,
  data,
  isLoading,
};
}