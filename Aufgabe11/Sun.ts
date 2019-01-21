namespace Aufgabe11 {
    export class Sun extends DrawObject {
        public draw( crc2: CanvasRenderingContext2D ): void {
            crc2.fillStyle = "#fff20c";
            crc2.strokeStyle = '#fff20c';

            let centerX: number = this.position.x + this.size.width / 2;
            let centerY: number = this.position.y + this.size.height / 2;

            crc2.beginPath();
            crc2.arc( centerX, centerY, this.size.width / 2, 0, 2 * Math.PI, false );
            crc2.fill();
            crc2.lineWidth = 5;
            crc2.stroke();
        }
    }
}