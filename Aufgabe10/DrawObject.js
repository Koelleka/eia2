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
var Aufgabe10;
(function (Aufgabe10) {
    ;
    ;
    var DrawObject = (function () {
        function DrawObject(_x, _y, _width, _height) {
            this.position = {
                x: _x,
                y: _y
            };
            this.size = {
                width: _width,
                height: _height
            };
            this.velocity = {
                x: 0,
                y: 0
            };
            this.infinite = false;
        }
        ;
        DrawObject.prototype.move = function (_speed) {
            this.position.x += this.velocity.x * _speed;
            this.position.y += this.velocity.y * _speed;
            if (this.infinite) {
                if (this.position.x > 320)
                    this.position.x = -this.size.width;
                if (this.position.y > 640)
                    this.position.y = -this.size.height;
            }
        };
        return DrawObject;
    }());
    Aufgabe10.DrawObject = DrawObject;
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
    }(DrawObject));
    Aufgabe10.Sky = Sky;
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
    }(DrawObject));
    Aufgabe10.Hill = Hill;
    var Sun = (function (_super) {
        __extends(Sun, _super);
        function Sun() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Sun.prototype.draw = function (crc2) {
            crc2.fillStyle = "#fff20c";
            crc2.strokeStyle = '#fff20c';
            var centerX = this.position.x + this.size.width / 2;
            var centerY = this.position.y + this.size.height / 2;
            crc2.beginPath();
            crc2.arc(centerX, centerY, this.size.width / 2, 0, 2 * Math.PI, false);
            crc2.fill();
            crc2.lineWidth = 5;
            crc2.stroke();
        };
        return Sun;
    }(DrawObject));
    Aufgabe10.Sun = Sun;
    var Cloud = (function (_super) {
        __extends(Cloud, _super);
        function Cloud() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Cloud.prototype.draw = function (crc2) {
            crc2.fillStyle = "#ffffff";
            crc2.strokeStyle = '#ffffff';
            var centerX = this.position.x + this.size.width / 2;
            var centerY = this.position.y + this.size.height / 2;
            crc2.beginPath();
            crc2.arc(centerX, centerY, this.size.width / 5, 0, 2 * Math.PI, false);
            crc2.fill();
            crc2.lineWidth = 5;
            crc2.stroke();
            crc2.beginPath();
            crc2.arc(centerX + 30, centerY + 20, this.size.width / 6, 0, 2 * Math.PI, false);
            crc2.fill();
            crc2.lineWidth = 5;
            crc2.stroke();
            crc2.beginPath();
            crc2.arc(centerX - 30, centerY + 10, this.size.width / 6, 0, 2 * Math.PI, false);
            crc2.fill();
            crc2.lineWidth = 5;
            crc2.stroke();
        };
        return Cloud;
    }(DrawObject));
    Aufgabe10.Cloud = Cloud;
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
    }(DrawObject));
    Aufgabe10.Tree = Tree;
    var Sleigh = (function (_super) {
        __extends(Sleigh, _super);
        function Sleigh() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.spawnArea = {
                position: { x: 0, y: 0 },
                size: { width: 0, height: 0 }
            };
            return _this;
        }
        Sleigh.prototype.move = function (_speed) {
            _super.prototype.move.call(this, _speed);
            if (this.position.x <= 0)
                this.position.x = 320;
            if (this.position.y > 640) {
                this.position.y = this.spawnArea.position.y + Math.random() * this.spawnArea.size.height;
                this.position.x = 320;
            }
        };
        Sleigh.prototype.draw = function (crc2) {
            crc2.fillStyle = "#5b3600";
            crc2.strokeStyle = "#472a01";
            crc2.fillRect(0 + this.position.x, 0.875 * this.size.height + this.position.y, this.size.width, 0.125 * this.size.height);
            crc2.fillRect(0 + this.position.x, 0.625 * this.size.height + this.position.y, 0.125 * this.size.width, 0.250 * this.size.height);
        };
        return Sleigh;
    }(DrawObject));
    Aufgabe10.Sleigh = Sleigh;
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
    }(Sleigh));
    Aufgabe10.Child = Child;
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
    }(DrawObject));
    Aufgabe10.Snowflake = Snowflake;
})(Aufgabe10 || (Aufgabe10 = {}));
//# sourceMappingURL=DrawObject.js.map