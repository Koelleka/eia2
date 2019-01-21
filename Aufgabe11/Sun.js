var Aufgabe11;
(function (Aufgabe11) {
    class Sun extends Aufgabe11.DrawObject {
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
    Aufgabe11.Sun = Sun;
})(Aufgabe11 || (Aufgabe11 = {}));
//# sourceMappingURL=Sun.js.map