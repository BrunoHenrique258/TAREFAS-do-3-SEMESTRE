"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DataUtil {
    static isBissexto(ano) {
        if (ano % 400 == 0) {
            return true;
        }
        else if (ano % 4 == 0 && ano % 100 != 0) {
            return true;
        }
        return false;
    }
}
exports.default = DataUtil;
