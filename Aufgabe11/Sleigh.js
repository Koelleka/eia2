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
    var Sleigh = (function (_super) {
        __extends(Sleigh, _super);
        function Sleigh() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Sleigh.prototype.draw = function (crc2) {
            crc2.fillStyle = "#5b3600";
            crc2.strokeStyle = "#472a01";
            if (this.velocity.y > 0) {
                crc2.fillRect(0 + this.position.x, 0.875 * this.size.height + this.position.y, this.size.width, 0.125 * this.size.height);
                crc2.fillRect(0 + this.position.x, 0.625 * this.size.height + this.position.y, 0.125 * this.size.width, 0.250 * this.size.height);
            }
            else {
                crc2.fillRect(0 + this.position.x - this.size.width, 0.875 * this.size.height + this.position.y, this.size.width, 0.125 * this.size.height);
                var tx = 0.875 * this.size.width + this.position.x - this.size.width;
                var ty = 0.625 * this.size.height + this.position.y;
                crc2.fillRect(tx, ty, 0.125 * this.size.width, 0.250 * this.size.height);
                crc2.beginPath();
                crc2.strokeStyle = "#472a01";
                crc2.lineWidth = 2;
                crc2.moveTo(tx, ty);
                crc2.lineTo(tx + 25, ty - 18);
                crc2.stroke();
            }
        };
        return Sleigh;
    }(Aufgabe11.DrawObject));
    Aufgabe11.Sleigh = Sleigh;
})(Aufgabe11 || (Aufgabe11 = {}));
//# sourceMappingURL=Sleigh.js.map