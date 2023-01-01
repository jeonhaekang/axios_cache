import axios from "axios";

class Base {
  actions = null;

  constructor(instance_actions) {
    this.actions = instance_actions;
  }

  createInstance(options) {
    const { baseUrl, headers, params, data, cache } = options || {};

    const _cache = {
      policy: false,
      expiration_time: 60 * 1000 * 5,
      ...cache,
    };

    const instance = axios.create({
      baseURL: baseUrl || process.env.REACT_APP_BASE_URL,
      headers,
      params,
      data,
      cache: _cache,
    });

    instance.interceptors.request.use((config) => {
      const { policy } = config.cache;

      const _config = {
        ...config,
      };

      if (policy) {
        const key = JSON.stringify(config);

        const cache_data = this.actions.storage.get(key);

        if (cache_data) {
          const { data, expiration_time } = cache_data;

          const now = new Date().getTime();

          const is_expiration = now > expiration_time;

          if (is_expiration) {
            console.log("만료된 캐시 데이터");
            this.actions.storage.delete(key);
          } else {
            console.log("캐시 데이터 호출");
            const controller = new AbortController();

            _config.signal = controller.signal;
            _config.data = data;

            controller.abort();
          }
        }
      }

      return _config;
    });

    instance.interceptors.response.use(
      (response) => {
        const { config, data } = response;
        const { policy, expiration_time } = config.cache;

        if (policy) {
          console.log("데이터 캐시");
          const key = JSON.stringify(config);

          this.actions.storage.set(key, {
            data,
            expiration_time: new Date().getTime() + expiration_time,
          });
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
