(function($, window, document, undefined){

			// var canvas = {
			// 	initialize: function(){
			// 		$('#canvas').attr('width', "1200px");
			// 		$('#canvas').attr('height', "1200px");
			// 		this.drawBackground();
			// 	},
			// 	drawBackground: function(){
			// 		var img = new Image();
			// 		img.src = "./assets/images/placeholder.jpg";

			// 		var canvas = $('#canvas')[0];
   //              	var context = canvas.getContext('2d');
   //              	img.onload = function(){
			// 		    context.drawImage( img, 0,0 );
			// 		};

			// 	}
			// };

//			canvas.initialize();


            // $('#file-input').change(function(e) {
            //     var file = e.target.files[0],
            //         imageType = /image.*/;

            //     if (!file.type.match(imageType))
            //         return;

            //     var reader = new FileReader();
            //     reader.onload = fileOnload;
            //     reader.readAsDataURL(file);
            // });

            // function fileOnload(e) {
            //     var $img = $('<img>', { src: e.target.result });
            //     var canvas = $('#canvas')[0];
            //     var context = canvas.getContext('2d');

            //     $img.load(function() {
            //         context.drawImage(this, 0, 0);
            //     });
            // }


            //$('.user-image').eraser( {'size': 30 } );
            //$('.user-image').eraser("enabled");

            var workspace = {
            	erase: function(){
        			$('.user-image').eraser({
		          		progressFunction: function(p) {
		            		$('#progress').html(Math.round(p*100)+'%');
		          		}
		        	});
            	},
            	drag: function(){
            		// target elements with the "draggable" class
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

					interact('.user-image')
					  .draggable({
					    // enable inertial throwing
					    inertia: true,
					    // keep the element within the area of it's parent
					    restrict: {
					      restriction: "parent",
					      endOnly: true,
					      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
					    },
					    // enable autoScroll
					    autoScroll: true,

					    // call this function on every dragmove event
					     onmove: dragMoveListener,
					    // call this function on every dragend event
					    onend: function (event) {
					    	console.log("x: "+ event.dx+" y: "+event.dy);
					    //   var textEl = event.target.querySelector('p');

					    //   textEl && (textEl.textContent =
					    //     'moved a distance of '
					    //     + (Math.sqrt(event.dx * event.dx +
					    //                  event.dy * event.dy)|0) + 'px');
					     }
					  });
            	}
            };

            var move = false;
 			$('.btn-move').on('click', function(){
 				if( !move ) {
 					$(this).addClass('active');
 					workspace.drag();
 					move = true;
 				}
 				else {
 					$(this).removeClass('active');
 					move = false;
 					interact('.user-image').draggable(false);

 				}
 			});
 			$('.btn-crop').on('click', function(){
 				workspace.erase();
 				console.log('erase mode');
 			});

// this is used later in the resizing and gesture demos
//  window.dragMoveListener = dragMoveListener;

}(jQuery, window, document, undefined));