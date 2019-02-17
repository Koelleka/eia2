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
    var Hill = (function (_super) {
        __extends(Hill, _super);
        function Hill() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Hill.prototype.draw = function (crc2) {
            crc2.fillStyle = "#eeeeee";
            crc2.strokeStyle = "#30302d";
            crc2.beginPath();
            crc2.lineWidth = 2;
            crc2.moveTo(0, this.size.height * 0.75);
            crc2.lineTo(this.size.width, this.size.height * 0.25);
            crc2.lineTo(this.size.width, this.size.height);
            crc2.lineTo(0, this.size.height);
            crc2.closePath();
            crc2.fill();
            crc2.stroke();
        };
        return Hill;
    }(Aufgabe11.DrawObject));
    Aufgabe11.Hill = Hill;
})(Aufgabe11 || (Aufgabe11 = {}));
//# sourceMappingURL=Hill.js.map