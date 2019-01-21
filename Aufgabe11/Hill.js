var Aufgabe11;
(function (Aufgabe11) {
    class Hill extends Aufgabe11.DrawObject {
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
    Aufgabe11.Hill = Hill;
})(Aufgabe11 || (Aufgabe11 = {}));
//# sourceMappingURL=Hill.js.map