namespace Aufgabe9 {
    window.addEventListener( "load", init );
    let crc2: CanvasRenderingContext2D;

    function init( _event: Event ): void {
        console.log( "Canvas started" );

        let canvas: HTMLCanvasElement = document.getElementsByTagName( "canvas" )[0];
        crc2 = canvas.getContext( "2d" );
        let objects: DrawObject[] = [];

        let width: number = 320;
        let height: number = 640;

        objects.push( new Sky( 0, 0, 320, 640 ) );
        objects.push( new Sun( 50, 30, 80, 80 ) );
        objects.push( new Cloud( 80, 60, 140, 80 ) );
        objects.push( new Cloud( 200, 90, 200, 120 ) );
        objects.push( new Hill( 0, 0, 320, 640 ) );

        var treeCount: number = Math.floor( Math.random() * 8 ) + 2;
        for ( var i: number = 0; i < treeCount; i++ ) {
            var tmpX: number = Math.floor( Math.random() * width );
            var factor: number = Math.random() * 0.1 + 0.6;
            var tmpY: number = tmpX * ( - 1 ) + factor * height;

            objects.push( new Tree( tmpX, tmpY, 100, 100 ) );
        }

        objects.push( new Sleigh( 250, 500, 60, 60 ) );
        objects.push( new Child( 250, 500, 60, 60 ) );

        objects.push( new Sleigh( 200, 400, 60, 60 ) );
        objects.push( new Child( 200, 400, 60, 60 ) );

        // 100 Zuläffige Schneeflocken
        var snowFlakeCount: number = Math.floor( Math.random() * 100 ) + 50;
        for ( i = 0; i < snowFlakeCount; i++ ) {
            tmpX = Math.floor( Math.random() * width );
            tmpY = Math.floor( Math.random() * height );
            var size: number = Math.floor( Math.random() * 5 ) + 3;

            objects.push( new Snowflake( tmpX, tmpY, size, size ) );
        }


        for ( i = 0; i < objects.length; i++ ) {
            objects[i].draw( crc2 );
        }
    }
}