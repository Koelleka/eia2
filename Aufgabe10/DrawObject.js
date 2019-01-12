var Aufgabe10;
(function (Aufgabe10) {
    ;
    ;
    class DrawObject {
        constructor(_x, _y, _width, _height) {
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
        move(_speed) {
            this.position.x += this.velocity.x * _speed;
            this.position.y += this.velocity.y * _speed;
            if (this.infinite) {
                if (this.position.x > 320)
                    this.position.x = -this.size.width;
                if (this.position.y > 640)
                    this.position.y = -this.size.height;
            }
        }
    }
    Aufgabe10.DrawObject = DrawObject;
    class Sky extends DrawObject {
        draw(crc2) {
            crc2.fillStyle = "#7fd7ef";
            crc2.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
        }
    }
    Aufgabe10.Sky = Sky;
    class Hill extends DrawObject {
        draw(crc2) {
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
        }
    }
    Aufgabe10.Hill = Hill;
    class Sun extends DrawObject {
        draw(crc2) {
            crc2.fillStyle = "#fff20c";
            crc2.strokeStyle = '#fff20c';
            let centerX = this.position.x + this.size.width / 2;
            let centerY = this.position.y + this.size.height / 2;
            crc2.beginPath();
            crc2.arc(centerX, centerY, this.size.width / 2, 0, 2 * Math.PI, false);
            crc2.fill();
            crc2.lineWidth = 5;
            crc2.stroke();
        }
    }
    Aufgabe10.Sun = Sun;
    class Cloud extends DrawObject {
        draw(crc2) {
            crc2.fillStyle = "#ffffff";
            crc2.strokeStyle = '#ffffff';
            let centerX = this.position.x + this.size.width / 2;
            let centerY = this.position.y + this.size.height / 2;
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
        }
    }
    Aufgabe10.Cloud = Cloud;
    class Tree extends DrawObject {
        draw(crc2) {
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
        }
    }
    Aufgabe10.Tree = Tree;
    class Sleigh extends DrawObject {
        constructor() {
            super(...arguments);
            this.spawnArea = {
                position: { x: 0, y: 0 },
                size: { width: 0, height: 0 }
            };
        }
        move(_speed) {
            super.move(_speed);
            if (this.position.x <= 0)
                this.position.x = 320;
            if (this.position.y > 640) {
                this.position.y = this.spawnArea.position.y + Math.random() * this.spawnArea.size.height;
                this.position.x = 320;
            }
        }
        draw(crc2) {
            crc2.fillStyle = "#5b3600";
            crc2.strokeStyle = "#472a01";
            crc2.fillRect(0 + this.position.x, 0.875 * this.size.height + this.position.y, this.size.width, 0.125 * this.size.height);
            crc2.fillRect(0 + this.position.x, 0.625 * this.size.height + this.position.y, 0.125 * this.size.width, 0.250 * this.size.height);
        }
    }
    Aufgabe10.Sleigh = Sleigh;
    class Child extends Sleigh {
        draw(crc2) {
            super.draw(crc2);
            crc2.strokeStyle = "#000";
            crc2.fillStyle = "#000";
            let centerX = this.position.x + this.size.width / 2;
            let centerY = this.position.y + this.size.height * 0.125;
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
        }
    }
    Aufgabe10.Child = Child;
    class Snowflake extends DrawObject {
        draw(crc2) {
            crc2.fillStyle = "#ffffff";
            crc2.strokeStyle = '#ffffff';
            let centerX = this.position.x + this.size.width / 2;
            let centerY = this.position.y + this.size.height / 2;
            crc2.beginPath();
            crc2.arc(centerX, centerY, this.size.width / 2, 0, 2 * Math.PI, false);
            crc2.fill();
            crc2.lineWidth = 2;
            crc2.stroke();
        }
    }
    Aufgabe10.Snowflake = Snowflake;
})(Aufgabe10 || (Aufgabe10 = {}));
//# sourceMappingURL=DrawObject.js.map