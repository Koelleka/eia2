var Aufgabe10;
(function (Aufgabe10) {
    window.addEventListener("load", init);
    var crc2;
    var backgroundImageData;
    var width = 320;
    var height = 640;
    var objects = [];
    var fps = 25;
    var animationSpeed = 0.9;
    function init(_event) {
        console.log("Canvas started");
        var canvas = document.getElementsByTagName("canvas")[0];
        crc2 = canvas.getContext("2d");
        createBackgroundData(crc2);
        var cloud1 = new Aufgabe10.Cloud(80, 60, 140, 80);
        cloud1.velocity.x = 0.5;
        cloud1.infinite = true;
        objects.push(cloud1);
        var cloud2 = new Aufgabe10.Cloud(200, 90, 200, 120);
        cloud2.velocity.x = 0.3;
        cloud2.infinite = true;
        objects.push(cloud2);
        var spawnArea = {
            position: { x: 320, y: 130 },
            size: { width: 1, height: 200 }
        };
        for (var i = 0; i < 10; i++) {
            var ry = Math.random() * 400;
            var child = new Aufgabe10.Child(250 + 10 * i, 150 + 10 * i + ry, 60, 60);
            child.spawnArea = spawnArea;
            var fac = Math.random() * 2;
            child.velocity.x = -0.5 * fac;
            child.velocity.y = 0.5 * fac;
            objects.push(child);
        }
        /*objects.push( new Sleigh( 250, 500, 60, 60 ) );
        objects.push( new Child( 250, 500, 60, 60 ) );

        objects.push( new Sleigh( 200, 400, 60, 60 ) );
        objects.push( new Child( 200, 400, 60, 60 ) );*/
        // 100 Zuläffige Schneeflocken
        var snowFlakeCount = Math.floor(Math.random() * 25) + 25;
        for (i = 0; i < snowFlakeCount; i++) {
            var tmpX = Math.floor(Math.random() * width);
            var tmpY = Math.floor(Math.random() * height);
            var size = Math.floor(Math.random() * 5) + 3;
            var flake = new Aufgabe10.Snowflake(tmpX, tmpY, size, size);
            flake.infinite = true;
            objects.push(flake);
            flake.velocity.x = Math.random() + 1;
            flake.velocity.y = Math.random() + 1;
        }
        update();
    }
    function update() {
        window.setTimeout(update, 1000 / fps);
        crc2.putImageData(backgroundImageData, 0, 0);
        for (var i = 0; i < objects.length; i++) {
            objects[i].move(animationSpeed);
            objects[i].draw(crc2);
        }
    }
    function createBackgroundData(_crc2) {
        new Aufgabe10.Sky(0, 0, 320, 640).draw(_crc2);
        new Aufgabe10.Sun(50, 30, 80, 80).draw(_crc2);
        new Aufgabe10.Hill(0, 0, 320, 640).draw(_crc2);
        var treeCount = Math.floor(Math.random() * 8) + 2;
        for (var i = 0; i < treeCount; i++) {
            var tmpX = Math.floor(Math.random() * width);
            var factor = Math.random() * 0.1 + 0.6;
            var tmpY = tmpX * (-1) + factor * height;
            new Aufgabe10.Tree(tmpX, tmpY, 100, 100).draw(_crc2);
        }
        backgroundImageData = _crc2.getImageData(0, 0, width, height);
    }
})(Aufgabe10 || (Aufgabe10 = {}));
//# sourceMappingURL=Aufgabe10.js.map