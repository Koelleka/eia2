namespace Aufgabe11 {
    export class Child extends Sleigh {

        public draw( crc2: CanvasRenderingContext2D ): void {
            super.draw( crc2 );
            crc2.strokeStyle = "#000";
            crc2.fillStyle = "#000";

            let centerX: number = this.position.x + this.size.width / 2;
            let centerY: number = this.position.y + this.size.height * 0.125;

            crc2.beginPath();
            crc2.arc( centerX, centerY, this.size.width * 0.125, 0, 2 * Math.PI, false );
            crc2.fill();
            crc2.lineWidth = 5;
            crc2.stroke();

            crc2.beginPath();
            crc2.moveTo( 0.25 * this.size.width + this.position.x, 0.375 * this.size.height + this.position.y );
            crc2.lineTo( 0.75 * this.size.width + this.position.x, 0.375 * this.size.height + this.position.y );
            crc2.stroke();

            crc2.beginPath();
            crc2.moveTo( 0.5 * this.size.width + this.position.x, 0.25 * this.size.height + this.position.y );
            crc2.lineTo( 0.5 * this.size.width + this.position.x, 0.625 * this.size.height + this.position.y );
            crc2.stroke();

            crc2.beginPath();
            crc2.moveTo( 0.25 * this.size.width + this.position.x, this.size.height + this.position.y );
            crc2.lineTo( 0.50 * this.size.width + this.position.x, 0.625 * this.size.height + this.position.y );
            crc2.stroke();

            crc2.beginPath();
            crc2.moveTo( 0.75 * this.size.width + this.position.x, this.size.height + this.position.y );
            crc2.lineTo( 0.50 * this.size.width + this.position.x, 0.625 * this.size.height + this.position.y );
            crc2.stroke();
        }
    }
}