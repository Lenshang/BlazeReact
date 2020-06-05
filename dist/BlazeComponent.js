"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
class BlazeComponent extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.setPrivateState = () => {
            let getObj = (obj) => {
                let r = {};
                for (var key in obj) {
                    if (key.indexOf("o_") < 0) {
                        continue;
                    }
                    if (typeof (obj[key]) === "object") {
                        r[key.substr(2)] = getObj(obj[key]);
                    }
                    else {
                        r[key.substr(2)] = obj[key];
                    }
                }
                return r;
            };
            let r = getObj(this.$data);
            this.setState(r);
        };
        this.createObs = (obj) => {
            let _this = this;
            let result = {};
            if (typeof (obj) === "object") {
                for (var skey in obj) {
                    if (typeof (obj[skey]) == "object") {
                        result["o_" + skey] = this.createObs(obj[skey]);
                    }
                    else {
                        result["o_" + skey] = obj[skey];
                    }
                    (function (key) {
                        Object.defineProperty(result, key, {
                            set: function (val) {
                                let _val = _this.createObs(val);
                                result["o_" + key] = _val;
                                let newObj = new Object();
                                Object.defineProperty(newObj, key, {
                                    configurable: false,
                                    writable: true,
                                    enumerable: true,
                                    value: _val
                                });
                                _this.setPrivateState();
                            },
                            get: function () {
                                return result["o_" + key];
                            }
                        });
                    })(skey);
                }
                return result;
            }
            return obj;
        };
        this.$data = this.data();
        let _this = this;
        this.$data = this.createObs(this.data());
        this.state = this.$data;
    }
    model(_key) {
        let model = {
            key: _key,
            obj: this.$data
        };
        return model;
    }
}
exports.default = BlazeComponent;
