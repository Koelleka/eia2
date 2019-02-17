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
    var Snowflake = (function (_super) {
        __extends(Snowflake, _super);
        function Snowflake() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Snowflake.prototype.draw = function (crc2) {
            crc2.fillStyle = "#ffffff";
            crc2.strokeStyle = '#ffffff';
            var centerX = this.position.x + this.size.width / 2;
            var centerY = this.position.y + this.size.height / 2;
            crc2.beginPath();
            crc2.arc(centerX, centerY, this.size.width / 2, 0, 2 * Math.PI, false);
            crc2.fill();
            crc2.lineWidth = 2;
            crc2.stroke();
        };
        return Snowflake;
    }(Aufgabe11.DrawObject));
    Aufgabe11.Snowflake = Snowflake;
})(Aufgabe11 || (Aufgabe11 = {}));
//# sourceMappingURL=Snowflake.js.map