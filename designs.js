$(document).ready(function () {
    function makeGrid() {
        let gridCols, gridRows = '';
        // build out the columns based on the width value
        for (let cols = 0; cols <= $gridWidth - 1; cols++) {
            gridCols += '<td></td>';
        }
        // build out the rows, adding in the number of columns we need to each row
        for (let rows = 0; rows <= $gridHeight - 1; rows++) {
            gridRows += "<tr>" + gridCols + "</tr>";
        }
        // first clear the grid of old cells
        $grid.html('');
        // add the new cells to the grid
        $grid.append(gridRows);
    }

    // the color value from the color picker is in hex, but jQuery .css() method adds colors in rgb format
    // we need to convert the hex value to rgb so we can accurately compare them.
    function hexToRgb(hex) {
        // regex to convert the hex value
        /*
            ^# - starts with a hash symbol and matches the hash character
            ?  - quantifier - match between 0 and 1 of the preceding token - can only have one hash token
            () - starts a capture group; hex values use six hexadecimal digits, the first two digits represent the red color, the second two the green color and the last two are the blue color. We simplifiy this by grouping 2 tokens three times.
            [] - a character set - matches any token with the set of defined characters - hexadecimal values range from 0-9 and then a-f, the charcter set defined matches on any numeric digit `\d = 0-9` and the alpha characters a-f
            {} - quantifier - matches x number of the preceding tokens - we need two 0-9a-f tokens inside the capture group to make one color, so we define the quantifier with a value of 2 
            i - case insensitive matching - we don't care if the letter values are upper or lower case, it makes no difference.
        */
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        // console.log(result);
        /* 
            result is an array of the hex values
            index[0] is the original value
            index[1] is the red color value
            index[2] is the green color value
            index[3] is the blue color value
        */
        // use a ternary operation to build out the rgb value of the hex color.
        /* parseInt() takes two parameters
            1. the number to parse 
            2. the radix to return the parse value as. 
        */
        // In our case we want hexadecimal which is base 16 (hexa = 6 = a - f, decimal = 10 = 0 - 9; 6 + 10 = 16).
        return result ? 'rgb(' + parseInt(result[1], 16) + ', ' + parseInt(result[2], 16) + ', ' + parseInt(result[3], 16) + ')' : null;
    }



    // Select color input
    let $colorValue = $('#colorPicker').val();
    // attach the change event handler
    $('#colorPicker').change(function () {
        $colorValue = $(this).val();
    });

    // Select height input
    let $gridHeight = $('#inputHeight').val();
    // attach the change event handler
    $('#inputHeight').change(function (e) {
        $gridHeight = $(this).val();
    });

    // Select width input
    let $gridWidth = $('#inputWidth').val();
    // attach the change event handler
    $('#inputWidth').change(function (e) {
        $gridWidth = $(this).val();
    });

    // When size is submitted by the user, call makeGrid()
    $('.submit').click(function (e) {
        // stop the form from refreshing the page.
        e.preventDefault();
        // call the function to build out the grid.
        makeGrid();
    });

    // setup click handlers for the grid squares.
    let $grid = $('#pixelCanvas');
    $grid.on('click', 'td', function (e) {
        // if the choosen color value does not match the current value of the square, change the color of the square to the current value
        if ($(this).css('background-color') !== hexToRgb($colorValue)) {
            $(this).css('background-color', hexToRgb($colorValue));
        } else {
            // other wise clear the color and make it white it again, in case we clicked on the wrong square or want to remove some color completely.
            $(this).removeAttr('style');
        }
    });

});
