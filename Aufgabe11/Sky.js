var Aufgabe11;
(function (Aufgabe11) {
    class Sky extends Aufgabe11.DrawObject {
        draw(crc2) {
            crc2.fillStyle = "#7fd7ef";
            crc2.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
        }
    }
    Aufgabe11.Sky = Sky;
})(Aufgabe11 || (Aufgabe11 = {}));
//# sourceMappingURL=Sky.js.map