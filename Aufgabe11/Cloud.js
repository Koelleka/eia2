var Aufgabe11;
(function (Aufgabe11) {
    class Cloud extends Aufgabe11.DrawObject {
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
    Aufgabe11.Cloud = Cloud;
})(Aufgabe11 || (Aufgabe11 = {}));
//# sourceMappingURL=Cloud.js.map