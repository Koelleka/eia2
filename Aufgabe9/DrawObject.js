var Aufgabe9;
(function (Aufgabe9) {
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
        }
        ;
    }
    Aufgabe9.DrawObject = DrawObject;
    class Sky extends DrawObject {
        draw(crc2) {
            console.log("Draw Sky");
            crc2.fillStyle = "#7fd7ef";
            crc2.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
        }
    }
    Aufgabe9.Sky = Sky;
    class Hill extends DrawObject {
        draw(crc2) {
            console.log("Draw Hill");
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
    Aufgabe9.Hill = Hill;
    class Sun extends DrawObject {
        draw(crc2) {
            console.log("Draw Sun");
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
    Aufgabe9.Sun = Sun;
    class Cloud extends DrawObject {
        draw(crc2) {
            console.log("Draw Cloud");
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
    Aufgabe9.Cloud = Cloud;
    class Tree extends DrawObject {
        draw(crc2) {
            console.log("Draw Tree");
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
    Aufgabe9.Tree = Tree;
    class Sleigh extends DrawObject {
        draw(crc2) {
            console.log("Draw sleigh");
            crc2.fillStyle = "#5b3600";
            crc2.strokeStyle = "#472a01";
            crc2.fillRect(0 + this.position.x, 0.875 * this.size.height + this.position.y, this.size.width, 0.125 * this.size.height);
            crc2.fillRect(0 + this.position.x, 0.625 * this.size.height + this.position.y, 0.125 * this.size.width, 0.250 * this.size.height);
        }
    }
    Aufgabe9.Sleigh = Sleigh;
    class Child extends DrawObject {
        draw(crc2) {
            console.log("Draw child");
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
    Aufgabe9.Child = Child;
    class Snowflake extends DrawObject {
        draw(crc2) {
            console.log("draw Snowflake");
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
    Aufgabe9.Snowflake = Snowflake;
})(Aufgabe9 || (Aufgabe9 = {}));
//# sourceMappingURL=DrawObject.js.map