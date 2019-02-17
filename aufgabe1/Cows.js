var Cows;
(function (Cows) {
    function createCall(start, length) {
        for (var k = length; k > 0; k--) {
            if (k == 1 || k == length / 2)
                start += "h";
            start += "u";
        }
        return start;
    }
    // x => { /* code */ } ist die Kurzform von function() {}
    document.addEventListener("DOMContentLoaded", function (x) {
        var nums = [2, 6, 5];
        for (var i = 0; i < nums.length; i++) {
            var result = createCall("m", nums[i]);
            console.log(result);
        }
    });
})(Cows || (Cows = {}));
//# sourceMappingURL=Cows.js.map