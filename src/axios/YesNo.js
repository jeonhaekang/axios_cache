import Base from "./Base";

class YesNo extends Base {
  path = "api";

  instance = this.createInstance({
    cache: { policy: true, expiration_time: 60 * 60 * 1 },
  });

  getYesOrNo() {
    return this.instance.get(this.path);
  }
}

export default YesNo;
