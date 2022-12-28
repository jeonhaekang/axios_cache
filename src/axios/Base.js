import axios from "axios";

class Base {
  actions = null;

  constructor(instance_actions) {
    this.actions = instance_actions;
  }

  createInstance(options) {
    const { baseUrl, headers, params, data } = options || {};

    const instance = axios.create({
      baseURL: baseUrl || process.env.REACT_APP_BASE_URL,
      headers,
      params,
      data,
    });

    instance.interceptors.request.use((config) => {
      const { cache } = config;

      const _config = {
        ...config,
      };

      if (cache) {
        const key = JSON.stringify(config);

        const cache_data = this.actions.storage.get(key);

        if (cache_data) {
          const controller = new AbortController();

          _config.signal = controller.signal;
          _config.data = cache_data;

          controller.abort();
        }
      }

      return _config;
    });

    instance.interceptors.response.use(
      (response) => {
        const { config, data } = response;

        if (config.cache) {
          const key = JSON.stringify(config);

          this.actions.storage.set(key, data);
        }

        return response.data;
      },
      (error) => {
        if (error.code === "ERR_CANCELED") {
          return error.config.data;
        } else {
          return Promise.reject(error);
        }
      }
    );

    return instance;
  }
}

export default Base;
