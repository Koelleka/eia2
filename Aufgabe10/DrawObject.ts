namespace Aufgabe10 {

    export interface Point {
        x: number;
        y: number;
    };

    export interface Size {
        width: number;
        height: number;
    };

    export interface Rectangle {
        position: Point;
        size: Size;
    }

    export interface IDrawable {
        draw: () => void;
    }

    export abstract class DrawObject {
        position: Point;
        size: Size;
        velocity: Point;
        infinite: boolean;
        constructor( _x: number, _y: number, _width: number, _height: number ) {
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
        };

        public abstract draw( crc2: CanvasRenderingContext2D ): void;

        public move( _speed: number ): void {
            this.position.x += this.velocity.x * _speed;
            this.position.y += this.velocity.y * _speed;

            if ( this.infinite ) {
                if ( this.position.x > 320 )
                    this.position.x = -this.size.width;
                if ( this.position.y > 640 )
                    this.position.y = -this.size.height;
            }
        }
    }

    export class Sky extends DrawObject {
        public draw( crc2: CanvasRenderingContext2D ): void {
            crc2.fillStyle = "#7fd7ef";

            crc2.fillRect(
                this.position.x,
                this.position.y,
                this.size.width,
                this.size.height );
        }
    }

    export class Hill extends DrawObject {
        public draw( crc2: CanvasRenderingContext2D ): void {
            crc2.fillStyle = "#eeeeee";
            crc2.strokeStyle = "#30302d";

            crc2.beginPath();
            crc2.lineWidth = 2;
            crc2.moveTo( 0, this.size.height * 0.75 );
            crc2.lineTo( this.size.width, this.size.height * 0.25 );
            crc2.lineTo( this.size.width, this.size.height );
            crc2.lineTo( 0, this.size.height );
            crc2.closePath();
            crc2.fill();
            crc2.stroke();
        }
    }

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

    export class Cloud extends DrawObject {
        public draw( crc2: CanvasRenderingContext2D ): void {
            crc2.fillStyle = "#ffffff";
            crc2.strokeStyle = '#ffffff';

            let centerX: number = this.position.x + this.size.width / 2;
            let centerY: number = this.position.y + this.size.height / 2;

            crc2.beginPath();
            crc2.arc( centerX, centerY, this.size.width / 5, 0, 2 * Math.PI, false );
            crc2.fill();
            crc2.lineWidth = 5;
            crc2.stroke();

            crc2.beginPath();
            crc2.arc( centerX + 30, centerY + 20, this.size.width / 6, 0, 2 * Math.PI, false );
            crc2.fill();
            crc2.lineWidth = 5;
            crc2.stroke();

            crc2.beginPath();
            crc2.arc( centerX - 30, centerY + 10, this.size.width / 6, 0, 2 * Math.PI, false );
            crc2.fill();
            crc2.lineWidth = 5;
            crc2.stroke();
        }
    }

    export class Tree extends DrawObject {
        public draw( crc2: CanvasRenderingContext2D ): void {
            crc2.lineWidth = 1;
            crc2.fillStyle = "#773f03";
            crc2.strokeStyle = "#5e3101";

            crc2.fillRect(
                0.375 * this.size.width + this.position.x,
                0.625 * this.size.height + this.position.y,
                0.250 * this.size.width,
                0.375 * this.size.height );

            crc2.fillStyle = "#00b241";
            crc2.strokeStyle = "#005b22";
            crc2.beginPath();
            crc2.lineWidth = 2;
            crc2.moveTo( 0 + this.position.x, this.size.height * 0.75 + this.position.y );
            crc2.lineTo( this.size.width + this.position.x, this.size.height * 0.75 + this.position.y );
            crc2.lineTo( this.size.width / 2 + this.position.x, this.size.height * 0.375 + this.position.y );
            crc2.closePath();
            crc2.fill();

            crc2.beginPath();
            crc2.lineWidth = 2;
            crc2.moveTo( this.size.width * 0.125 + this.position.x, this.size.height * 0.375 + this.position.y );
            crc2.lineTo( this.size.width * 0.875 + this.position.x, this.size.height * 0.375 + this.position.y );
            crc2.lineTo( this.size.width / 2 + this.position.x, this.position.y );
            crc2.closePath();
            crc2.fill();
        }
    }

    export class Sleigh extends DrawObject {
        spawnArea: Rectangle = {
            position: { x: 0, y: 0 },
            size: { width: 0, height: 0 }
        };

        public move( _speed: number ): void {
            super.move( _speed );

            if ( this.position.x <= 0 )
                this.position.x = 320;

            if ( this.position.y > 640 ) {
                this.position.y = this.spawnArea.position.y + Math.random() * this.spawnArea.size.height;
                this.position.x = 320;
            }
        }

        public draw( crc2: CanvasRenderingContext2D ): void {
            crc2.fillStyle = "#5b3600";
            crc2.strokeStyle = "#472a01";

            crc2.fillRect(
                0 + this.position.x,
                0.875 * this.size.height + this.position.y,
                this.size.width,
                0.125 * this.size.height );

            crc2.fillRect(
                0 + this.position.x,
                0.625 * this.size.height + this.position.y,
                0.125 * this.size.width,
                0.250 * this.size.height );
        }
    }

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

    export class Snowflake extends DrawObject {
        public draw( crc2: CanvasRenderingContext2D ): void {
            crc2.fillStyle = "#ffffff";
            crc2.strokeStyle = '#ffffff';

            let centerX: number = this.position.x + this.size.width / 2;
            let centerY: number = this.position.y + this.size.height / 2;

            crc2.beginPath();
            crc2.arc( centerX, centerY, this.size.width / 2, 0, 2 * Math.PI, false );
            crc2.fill();
            crc2.lineWidth = 2;
            crc2.stroke();
        }
    }
}