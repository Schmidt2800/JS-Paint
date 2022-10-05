paint();

function paint() {
    //canvas
    var canvas = document.getElementById('paintCanvas');
    var canvasContext = canvas.getContext('2d');

    var painting = document.getElementById('paint');
    var paint_style = getComputedStyle(painting);

    canvas.width = parseInt(paint_style.getPropertyValue('width'));
    canvas.height = parseInt(paint_style.getPropertyValue('height'));

    //mouse
    var mouse = { x: 0, y: 0 };

    canvas.addEventListener('mousemove', function (e) {
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;

    }, false);

    // context
    canvasContext.lineWidth = 3;
    canvasContext.lineJoin = 'round';
    canvasContext.lineCap = 'round';
    canvasContext.strokeStyle = '#00CC99';

    canvas.addEventListener('mousedown', function (e) {
        canvasContext.beginPath();
        canvasContext.moveTo(mouse.x, mouse.y);

        canvas.addEventListener('mousemove', onPaint, false);
    });

    canvas.addEventListener('mouseup',function(){
        canvas.removeEventListener('mousemove', onPaint, false)
    }, false);

    var onPaint = function () {
        canvasContext.lineTo(mouse.x, mouse.y);
        canvasContext.stroke();
    }

    const tbody = document.querySelector('#colorsTable tbody');
    tbody.addEventListener('click', function (e) {
      const cell = e.target.closest('td');
      if (!cell) {return;} // Quit, not clicked on a cell
      const row = cell.parentElement;
      console.log(cell.innerHTML, row.rowIndex, cell.cellIndex);
      console.log(cell.style.backgroundColor);
      if (cell.style.backgroundColor)
      {
        canvasContext.strokeStyle = cell.style.backgroundColor;
      }
    });



}