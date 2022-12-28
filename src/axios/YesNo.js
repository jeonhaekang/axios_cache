import Base from "./Base";

class YesNo extends Base {
  path = "api";
  instance = this.createInstance();

  getYesOrNo() {
    return this.instance.get(this.path, { cache: true });
  }
}

export default YesNo;
