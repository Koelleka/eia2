var Aufgabe9;
(function (Aufgabe9) {
    window.addEventListener("load", init);
    let crc2;
    function init(_event) {
        console.log("Canvas started");
        let canvas = document.getElementsByTagName("canvas")[0];
        crc2 = canvas.getContext("2d");
        let objects = [];
        let width = 320;
        let height = 640;
        objects.push(new Aufgabe9.Sky(0, 0, 320, 640));
        objects.push(new Aufgabe9.Sun(50, 30, 80, 80));
        objects.push(new Aufgabe9.Cloud(80, 60, 140, 80));
        objects.push(new Aufgabe9.Cloud(200, 90, 200, 120));
        objects.push(new Aufgabe9.Hill(0, 0, 320, 640));
        var treeCount = Math.floor(Math.random() * 8) + 2;
        for (var i = 0; i < treeCount; i++) {
            var tmpX = Math.floor(Math.random() * width);
            var factor = Math.random() * 0.1 + 0.6;
            var tmpY = tmpX * (-1) + factor * height;
            objects.push(new Aufgabe9.Tree(tmpX, tmpY, 100, 100));
        }
        objects.push(new Aufgabe9.Sleigh(250, 500, 60, 60));
        objects.push(new Aufgabe9.Child(250, 500, 60, 60));
        objects.push(new Aufgabe9.Sleigh(200, 400, 60, 60));
        objects.push(new Aufgabe9.Child(200, 400, 60, 60));
        // 100 Zuläffige Schneeflocken
        var snowFlakeCount = Math.floor(Math.random() * 100) + 50;
        for (i = 0; i < snowFlakeCount; i++) {
            tmpX = Math.floor(Math.random() * width);
            tmpY = Math.floor(Math.random() * height);
            var size = Math.floor(Math.random() * 5) + 3;
            objects.push(new Aufgabe9.Snowflake(tmpX, tmpY, size, size));
        }
        for (i = 0; i < objects.length; i++) {
            objects[i].draw(crc2);
        }
    }
})(Aufgabe9 || (Aufgabe9 = {}));
//# sourceMappingURL=Aufgabe9.js.map