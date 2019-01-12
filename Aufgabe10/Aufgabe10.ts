namespace Aufgabe10 {
    window.addEventListener( "load", init );
    let crc2: CanvasRenderingContext2D;
    let backgroundImageData: ImageData;
    let width: number = 320;
    let height: number = 640;
    let objects: DrawObject[] = [];
    let fps: number = 25;
    let animationSpeed: number = 0.9;

    function init( _event: Event ): void {
        console.log( "Canvas started" );

        let canvas: HTMLCanvasElement = document.getElementsByTagName( "canvas" )[0];
        crc2 = canvas.getContext( "2d" );

        createBackgroundData( crc2 );

        var cloud1: Cloud = new Cloud( 80, 60, 140, 80 );
        cloud1.velocity.x = 0.5;
        cloud1.infinite = true;
        objects.push( cloud1 );

        var cloud2: Cloud = new Cloud( 200, 90, 200, 120 );
        cloud2.velocity.x = 0.3;
        cloud2.infinite = true;
        objects.push( cloud2 );

        var spawnArea: Rectangle = {
            position: { x: 320, y: 130 },
            size: { width: 1, height: 200 }
        };
        for ( var i: number = 0; i < 10; i++ ) {

            var ry: number = Math.random() * 400;

            var child: Child = new Child( 250 + 10 * i, 150 + 10 * i + ry, 60, 60 );
            child.spawnArea = spawnArea;
            var fac: number = Math.random() * 2;
            child.velocity.x = -0.5 * fac;
            child.velocity.y = 0.5 * fac;
            objects.push( child );
        }

        /*objects.push( new Sleigh( 250, 500, 60, 60 ) );
        objects.push( new Child( 250, 500, 60, 60 ) );

        objects.push( new Sleigh( 200, 400, 60, 60 ) );
        objects.push( new Child( 200, 400, 60, 60 ) );*/

        // 100 Zuläffige Schneeflocken
        var snowFlakeCount: number = Math.floor( Math.random() * 25 ) + 25;
        for ( i = 0; i < snowFlakeCount; i++ ) {
            var tmpX: number = Math.floor( Math.random() * width );
            var tmpY: number = Math.floor( Math.random() * height );
            var size: number = Math.floor( Math.random() * 5 ) + 3;

            var flake: Snowflake = new Snowflake( tmpX, tmpY, size, size );
            flake.infinite = true;
            objects.push( flake );

            flake.velocity.x = Math.random() + 1;
            flake.velocity.y = Math.random() + 1;
        }

        update();
    }

    function update(): void {
        window.setTimeout( update, 1000 / fps );
        crc2.putImageData( backgroundImageData, 0, 0 );
        for ( var i: number = 0; i < objects.length; i++ ) {
            objects[i].move( animationSpeed );
            objects[i].draw( crc2 );
        }

    }

    function createBackgroundData( _crc2: CanvasRenderingContext2D ): void {
        new Sky( 0, 0, 320, 640 ).draw( _crc2 );
        new Sun( 50, 30, 80, 80 ).draw( _crc2 );
        new Hill( 0, 0, 320, 640 ).draw( _crc2 );

        var treeCount: number = Math.floor( Math.random() * 8 ) + 2;
        for ( var i: number = 0; i < treeCount; i++ ) {
            var tmpX: number = Math.floor( Math.random() * width );
            var factor: number = Math.random() * 0.1 + 0.6;
            var tmpY: number = tmpX * ( - 1 ) + factor * height;

            new Tree( tmpX, tmpY, 100, 100 ).draw( _crc2 );
        }

        backgroundImageData = _crc2.getImageData( 0, 0, width, height );
    }
}