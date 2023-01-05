import axios from "axios";

const DEFAULT_OPTIONS = {
  baseURL: process.env.REACT_APP_BASE_URL,
  cache: { policy: false, expiration_time: 1000 * 60 * 5 },
};

class Base {
  storage = null;

  constructor(storage) {
    this.storage = storage;
  }

  createInstance(options) {
    const merge_options = { ...DEFAULT_OPTIONS, ...options };

    const instance = axios.create(merge_options);

    instance.interceptors.request.use((config) => {
      const _config = { ...config };
      const { policy } = _config.cache;

      if (policy) {
        const cache_key = JSON.stringify(_config);

        const cache_data = this.storage.get(cache_key);

        if (cache_data) {
          const now = new Date().getTime();

          const is_expiration = now > cache_data.expiration_time;

          if (is_expiration) {
            this.storage.delete(cache_key);
          } else {
            const controller = new AbortController();

            _config.signal = controller.signal;
            _config.data = cache_data.data;

            controller.abort();
          }
        }
      }

      return _config;
    }, []);

    instance.interceptors.response.use(
      (response) => {
        const { config, data } = response;
        const { policy, expiration_time } = config.cache;

        if (policy) {
          const cache_key = JSON.stringify(config);

          this.storage.set(cache_key, {
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
