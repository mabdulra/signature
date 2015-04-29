function init(){
    //  Obtain canvas drawing area
    var canvas  = document.getElementById("myCanvas");
    var ctx     = canvas.getContext("2d");
    var drawing = false;
    var w = canvas.width;
    var h = canvas.height;
    
    //  Initialize canvas background to white by drawing rectangle on it
    ctx.fillStyle = "#ffffff";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //  Start drawing process when user clicks the canvas
    canvas.onmousedown = function (e) {
        if (!drawing) {
            drawing = true;
            ctx.beginPath();
            document.body.className = "unselectable";
        }
    };

    //  Draw line between points when mouse is moved while held down
    canvas.onmousemove = function (e) {
        if (drawing) {
            var x = e.clientX - canvas.offsetLeft;
            var y = e.clientY - canvas.offsetTop;
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    };
    
    //  Determine exit point of mouse and draw line to edge of pad
    canvas.onmouseout = function (e) {
        if( drawing ) {
            var x = e.clientX - canvas.offsetLeft;
            var y = e.clientY - canvas.offsetTop;

            if( x<0 )
                x = 0;
            else if( x>w )
                x = w;

            if( y<0 )
                y = 0;
            else if( y>h )
                y = h;

            ctx.lineTo(x,y);
            ctx.stroke();
        }
    };

    //  User can release click off canvas, so this is a document.body event
    document.body.onmouseup = function (e) {
        if( drawing ) {
            drawing = false;
            document.body.className = "";
        }
    };

    //  The container cannot be selected during a drawing process
    var div = document.getElementById("container");
    div.onselectstart = function (e) {
        if( drawing ) {
            return false;
        }
        return true;
    };
}
