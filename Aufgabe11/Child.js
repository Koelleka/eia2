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
    var Child = (function (_super) {
        __extends(Child, _super);
        function Child() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Child.prototype.draw = function (crc2) {
            _super.prototype.draw.call(this, crc2);
            crc2.strokeStyle = "#000";
            crc2.fillStyle = "#000";
            var centerX = this.position.x + this.size.width / 2;
            var centerY = this.position.y + this.size.height * 0.125;
            crc2.beginPath();
            crc2.arc(centerX, centerY, this.size.width * 0.125, 0, 2 * Math.PI, false);
            crc2.fill();
            crc2.lineWidth = 5;
            crc2.stroke();
            crc2.beginPath();
            crc2.moveTo(0.25 * this.size.width + this.position.x, 0.375 * this.size.height + this.position.y);
            crc2.lineTo(0.75 * this.size.width + this.position.x, 0.375 * this.size.height + this.position.y);
            crc2.stroke();
            crc2.beginPath();
            crc2.moveTo(0.5 * this.size.width + this.position.x, 0.25 * this.size.height + this.position.y);
            crc2.lineTo(0.5 * this.size.width + this.position.x, 0.625 * this.size.height + this.position.y);
            crc2.stroke();
            crc2.beginPath();
            crc2.moveTo(0.25 * this.size.width + this.position.x, this.size.height + this.position.y);
            crc2.lineTo(0.50 * this.size.width + this.position.x, 0.625 * this.size.height + this.position.y);
            crc2.stroke();
            crc2.beginPath();
            crc2.moveTo(0.75 * this.size.width + this.position.x, this.size.height + this.position.y);
            crc2.lineTo(0.50 * this.size.width + this.position.x, 0.625 * this.size.height + this.position.y);
            crc2.stroke();
        };
        return Child;
    }(Aufgabe11.Sleigh));
    Aufgabe11.Child = Child;
})(Aufgabe11 || (Aufgabe11 = {}));
//# sourceMappingURL=Child.js.map