var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Aufgabe11;
(function (Aufgabe11) {
    var Sky = (function (_super) {
        __extends(Sky, _super);
        function Sky() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Sky.prototype.draw = function (crc2) {
            crc2.fillStyle = "#7fd7ef";
            crc2.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
        };
        return Sky;
    }(Aufgabe11.DrawObject));
    Aufgabe11.Sky = Sky;
})(Aufgabe11 || (Aufgabe11 = {}));
//# sourceMappingURL=Sky.js.map