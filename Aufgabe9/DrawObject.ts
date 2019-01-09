namespace Aufgabe9 {

    export interface Point {
        x: number;
        y: number;
    };

    export interface Size {
        width: number;
        height: number;
    };

    export interface IDrawable {
        draw: () => void;
    }

    export abstract class DrawObject {
        position: Point;
        size: Size;
        velocity: Point;
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
        };

        public abstract draw( crc2: CanvasRenderingContext2D ): void;

        public move( _speed: number ): void {
            this.position.x += this.position.x * this.velocity.x * _speed;
            this.position.y += this.position.y * this.velocity.y * _speed;
        }
    }

    export class Sky extends DrawObject {
        public draw( crc2: CanvasRenderingContext2D ): void {
            console.log( "Draw Sky" );
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
            console.log( "Draw Hill" );
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
            console.log( "Draw Sun" );
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
            console.log( "Draw Cloud" );

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
            console.log( "Draw Tree" );
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
        public draw( crc2: CanvasRenderingContext2D ): void {
            console.log( "Draw sleigh" );
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

    export class Child extends DrawObject {
        public draw( crc2: CanvasRenderingContext2D ): void {
            console.log( "Draw child" );
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
            console.log( "draw Snowflake" );
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