(function($, window, document, undefined){
 function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  function cloneCanvas(oldCanvas) {

    //create a new canvas
    var newCanvas = document.createElement('canvas');
    var context = newCanvas.getContext('2d');

    //set dimensions
    newCanvas.width = oldCanvas.width;
    newCanvas.height = oldCanvas.height;
    //apply the old canvas to the new one
    context.drawImage(oldCanvas, 0, 0);

    //return the new canvas
    return newCanvas;
}

  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;

            var workspace = {
            	initialize: function() {

		        	interact('.crop-user-image')
						  .draggable({
						    onmove: window.dragMoveListener
						  })
						  .resizable({
						    preserveAspectRatio: true,
						    edges: { left: true, right: true, bottom: true, top: true }
						  })
						  .on('resizemove', function (event) {
						    var target = event.target,
						        x = (parseFloat(target.getAttribute('data-x')) || 0),
						        y = (parseFloat(target.getAttribute('data-y')) || 0);

						    // update the element's style
						    target.style.width  = event.rect.width + 'px';
						    target.style.height = event.rect.height + 'px';

						    // translate when resizing from top or left edges
						    x += event.deltaRect.left;
						    y += event.deltaRect.top;

						    target.style.webkitTransform = target.style.transform =
						        'translate(' + x + 'px,' + y + 'px)';

						    target.setAttribute('data-x', x);
						    target.setAttribute('data-y', y);
						    target.textContent = Math.round(event.rect.width) + '×' + Math.round(event.rect.height);
						  });
            	},
            	eraserStart: function(size){
            		var brushSize = 20;
            		if (size !== 'undefined') brushSize = size;

        			$('.crop-user-image').eraser({
	          			progressFunction: function(p) {
	            			$('#progress').html(Math.round(p*100)+'%');
	          			}
	        		});
        			$('.crop-user-image').eraser('enable');
        			$('.crop-user-image').eraser('size',brushSize);
            	},
            	eraserEnd: function(){
            		$('.crop-user-image').eraser('disable');
            	},
            	dragEnd: function() {
            		interact('.crop-user-image').draggable(false);
            		//interact('.crop-user-image').resizeable(false);
            	},
            	dragStart: function(){
            		interact('.crop-user-image').draggable(true);
            		//interact('.crop-user-image').resizeable(true);
            	}
            };

            //workspace.initialize();
             // this is used later in the resizing and gesture demos


            var move = false;
            var crop = false;
            function beforeStartAction (){
            	workspace.dragEnd();
            	move = false;
            	workspace.eraserEnd();
            	crop = false;
            	$(".btn").removeClass('active');
            }
 			$('.btn-move').on('click', function(){
 				if( !move ) {
 					beforeStartAction();
 					$(this).addClass('active');
 					workspace.dragStart();
 					move = true;
 				}
 				else {
 					$(this).removeClass('active');
 					move = false;
 					workspace.dragEnd();
 				}
 			});
 			$('#btn-crop').on('click', '.btn', function(){
 				if( !crop ){
 					beforeStartAction();
 					$(this).addClass('active');
 					var size = $(this).data('brush-size');
 					workspace.eraserStart(size);
 					crop = true;
 				}
 				else {
 					$(this).removeClass('active');
 					workspace.eraserEnd();
 					crop = false;
 				}
 			});

			$('#btn-crop-done').on('click', function(){
			 	$('.crop-user-image').appendTo('#workspace');
			});

			 $('#upload').on('change', function(){
            	 if (this.files && this.files[0]) {
			        var reader = new FileReader();

			        reader.onload = function (e) {
			            $('#imageCanvas').attr('src', e.target.result);
			        };

			        reader.readAsDataURL(this.files[0]);
			    }
            });

}(jQuery, window, document, undefined));