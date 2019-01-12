declare namespace Aufgabe9 {
    interface Point {
        x: number;
        y: number;
    }
    interface Size {
        width: number;
        height: number;
    }
    interface IDrawable {
        draw: () => void;
    }
    abstract class DrawObject {
        position: Point;
        size: Size;
        velocity: Point;
        constructor(_x: number, _y: number, _width: number, _height: number);
        abstract draw(crc2: CanvasRenderingContext2D): void;
        move(_speed: number): void;
    }
    class Sky extends DrawObject {
        draw(crc2: CanvasRenderingContext2D): void;
    }
    class Hill extends DrawObject {
        draw(crc2: CanvasRenderingContext2D): void;
    }
    class Sun extends DrawObject {
        draw(crc2: CanvasRenderingContext2D): void;
    }
    class Cloud extends DrawObject {
        draw(crc2: CanvasRenderingContext2D): void;
    }
    class Tree extends DrawObject {
        draw(crc2: CanvasRenderingContext2D): void;
    }
    class Sleigh extends DrawObject {
        draw(crc2: CanvasRenderingContext2D): void;
    }
    class Child extends DrawObject {
        draw(crc2: CanvasRenderingContext2D): void;
    }
    class Snowflake extends DrawObject {
        draw(crc2: CanvasRenderingContext2D): void;
    }
}
