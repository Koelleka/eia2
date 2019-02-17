var Aufgabe11;
(function (Aufgabe11) {
    ;
    ;
    var Rectangle = (function () {
        function Rectangle(_position, _size) {
            this.position = _position;
            this.size = _size;
        }
        Rectangle.prototype.randomPoint = function () {
            var rx = Math.random() * this.size.width + this.position.x;
            var ry = Math.random() * this.size.height + this.position.y;
            console.log("random point in rect: " + "x=" + this.position.x + " y=" + this.position.y + " w=" + this.size.width + " h=" + this.size.height);
            console.log("random point:         " + "x=" + rx + " y=" + ry);
            return { x: rx, y: ry };
        };
        Rectangle.prototype.isInRect = function (_point) {
            return _point.x >= this.position.x && _point.x <= this.position.x + this.size.width
                && _point.y >= this.position.y && _point.y <= this.position.y + this.size.height;
        };
        return Rectangle;
    }());
    Aufgabe11.Rectangle = Rectangle;
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
        DrawObject.prototype.faceTo = function (_target) {
            var vec = Vector.fromPoints(this.position, _target);
            console.log("target:    " + "x=" + _target.x + " y=" + _target.y);
            console.log("direction: " + vec);
            this.velocity = vec.normalize(); // Vector und Point haben die gleichen Attribute
        };
        return DrawObject;
    }());
    Aufgabe11.DrawObject = DrawObject;
    var Vector = (function () {
        function Vector(_x, _y) {
            var _this = this;
            this.toString = function () {
                return "x=" + _this.x + " y=" + _this.y;
            };
            this.x = _x;
            this.y = _y;
        }
        Vector.fromPoints = function (_from, _to) {
            console.log("point from: " + "x=" + _from.x + " y=" + _from.y);
            console.log("point to:   " + "x=" + _to.x + " y=" + _to.y);
            var result = new Vector(_to.x - _from.x, _to.y - _from.y);
            console.log("vector:     " + result);
            return result;
        };
        Vector.prototype.scalarMultiply = function (_factor) {
            return new Vector(this.x * _factor, this.y * _factor);
        };
        Vector.prototype.length = function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        };
        Vector.prototype.normalize = function () {
            return this.scalarMultiply(1 / this.length());
        };
        return Vector;
    }());
    Aufgabe11.Vector = Vector;
})(Aufgabe11 || (Aufgabe11 = {}));
//# sourceMappingURL=DrawObject.js.map