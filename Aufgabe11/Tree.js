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
    var Tree = (function (_super) {
        __extends(Tree, _super);
        function Tree() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Tree.prototype.draw = function (crc2) {
            crc2.lineWidth = 1;
            crc2.fillStyle = "#773f03";
            crc2.strokeStyle = "#5e3101";
            crc2.fillRect(0.375 * this.size.width + this.position.x, 0.625 * this.size.height + this.position.y, 0.250 * this.size.width, 0.375 * this.size.height);
            crc2.fillStyle = "#00b241";
            crc2.strokeStyle = "#005b22";
            crc2.beginPath();
            crc2.lineWidth = 2;
            crc2.moveTo(0 + this.position.x, this.size.height * 0.75 + this.position.y);
            crc2.lineTo(this.size.width + this.position.x, this.size.height * 0.75 + this.position.y);
            crc2.lineTo(this.size.width / 2 + this.position.x, this.size.height * 0.375 + this.position.y);
            crc2.closePath();
            crc2.fill();
            crc2.beginPath();
            crc2.lineWidth = 2;
            crc2.moveTo(this.size.width * 0.125 + this.position.x, this.size.height * 0.375 + this.position.y);
            crc2.lineTo(this.size.width * 0.875 + this.position.x, this.size.height * 0.375 + this.position.y);
            crc2.lineTo(this.size.width / 2 + this.position.x, this.position.y);
            crc2.closePath();
            crc2.fill();
        };
        return Tree;
    }(Aufgabe11.DrawObject));
    Aufgabe11.Tree = Tree;
})(Aufgabe11 || (Aufgabe11 = {}));
//# sourceMappingURL=Tree.js.map