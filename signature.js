//  When the body loads, init() gets called
function init(){
    //  Obtain canvas drawing area
    var canvas  = document.getElementById("signature");
    var ctx     = canvas.getContext("2d");
    var drawing = false;
    var w = canvas.width;
    var h = canvas.height;

    //  Obtain container and buttons
    var div     = document.getElementById("container");
    var clear   = document.getElementById("clear");
    var submit  = document.getElementById("submit");
    var status  = document.getElementById("status");

    //  Initialize the canvas and disabled submit button
    reset(ctx,w,h);
    submit.setAttribute("disabled",true);

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

            //  Enable the submit button
            submit.removeAttribute("disabled");
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
    div.onselectstart = function (e) {
        if( drawing ) {
            return false;
        }
        return true;
    };

    //  The clear button erases the canvas
    clear.onclick = function (e) {
        reset(ctx,w,h);
        submit.setAttribute("disabled",true);
    }

    //  The submit button makes an AJAX call to save the signature
    //  Since this is a small example, the URI will be written to #uri
    //  and status update will inform us of this. If you want to submit
    //  a form, you can send URI to a script of your choice!
    submit.onclick = function (e) {
        //  Get data URL and display it as an image
        var uri = canvas.toDataURL();
        status.innerHTML = "<hr><p><b>Your signature has been processed!</b><br>You can extend the <i>submit.onclick</i> function to do anything you like with this signature.<br>Simply save it as a PNG? Sure! Send it to a server over AJAX? You got it!</p> <IMG src='"+uri+"' alt='Signature' title='Signature'><p>You can now make another signature, too. This old one will remain here until you his the <i>Submit Signature</i> button again.</p>";

        //  Flush the signature field button
        reset(ctx,w,h);
        submit.setAttribute("disabled",true);
    }
}

//  Reset the ctx by drawing a white rectangle over it
function reset(ctx,w,h){
    ctx.fillStyle = "#ffffff";
    ctx.clearRect(0, 0, w, h);
    ctx.fillRect(0, 0, w, h);
}
