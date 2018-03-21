import request from './request';

function get(url) {
  return request({
    url: `${url}`,
  });
}

const ISSApi = {
  get, // create, update, delete, etc. ...
};

export default ISSApi;
