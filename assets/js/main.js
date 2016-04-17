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

  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;

            var workspace = {
            	initialize: function() {

		        	interact('.user-image')
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
            	eraserStart: function(){
        			$('.user-image').eraser({
	          			progressFunction: function(p) {
	            			$('#progress').html(Math.round(p*100)+'%');
	          			}
	        		});
        			$('.user-image').eraser('enable');
            	},
            	eraserEnd: function(){
            		$('.user-image').eraser('disable');
            	},
            	dragEnd: function() {
            		interact('.user-image').draggable(false);
            		//interact('.user-image').resizeable(false);
            	},
            	dragStart: function(){
            		interact('.user-image').draggable(true);
            		//interact('.user-image').resizeable(true);
            	}
            };

            workspace.initialize();
            workspace.eraserEnd();
             // this is used later in the resizing and gesture demos


            var move = false;
            var crop = false;
            function beforeStartAction (){
            	workspace.dragEnd();
            	move = false;
            	workspace.eraserEnd();
            	crop = false;
            	$(".btn-group .btn").removeClass('active');
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
 			$('.btn-crop').on('click', function(){
 				if( !crop ){
 					beforeStartAction();
 					$(this).addClass('active');
 					workspace.eraserStart();
 					crop = true;
 				}
 				else {
 					$(this).removeClass('active');
 					workspace.eraserEnd();
 					crop = false;
 				}
 			});

// this is used later in the resizing and gesture demos


}(jQuery, window, document, undefined));