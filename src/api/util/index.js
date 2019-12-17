export default (axiosInstance, interfaceObj) => {
  const api = {};
  //遍历interfaceObj 将其中的所有接口都添加转换为API的请求数据方法
  for (name in interfaceObj) {
    const {
      url,
      method,
      isForm
    } = interfaceObj[name];
    api[name] = async (data, config = {}) => {
      let transformData = null;
      //发送请求时默认用json方式 如果要用form形式需要转换
      //这里用FormData对请求数据进行转换
      if (data && isForm) {
        const formData = new FormData();
        for (let key in data) {
          formData.append(key, data[key]);
        }
        transformData = formData;

      } else {
        transformData = data;
      }
      let res = null;
      switch (method) {
        case "get":
        case "delete":
          res = await axiosInstance({
            url,
            method,
            params: transformData
          })
          break;
        case 'post':
        case 'put':
          let endData = null;
          let configData = (typeof config.data === 'object') ? config.data : {};
          if (isForm) {
            for (let key in configData) {
              transformData.append(key, config[key]);
              endData = transformData;
            }
          } else {
            endData = Object.assign(transformData, configData)
          }
          res = await axiosInstance({
            url,
            method,
            data: endData
          })
      }
      return res;
    }
  }
  return api;
}
