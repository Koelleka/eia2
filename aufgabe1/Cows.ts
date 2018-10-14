namespace Cows {


    function createCall( start: string, length: number ): string {
        for ( let k: number = length; k > 0; k-- ) {
            if ( k == 1 || k == length / 2 )
                start += "h";
            start += "u";
        }
        return start;
    }

    // x => { /* code */ } ist die Kurzform von function() {}
    document.addEventListener( "DOMContentLoaded", x => {
        let nums: number[] = [2, 6, 5];
        for ( let i: number = 0; i < nums.length; i++ ) {
            let result: string = createCall( "m", nums[i] );
            console.log( result );
        }
    } );
}