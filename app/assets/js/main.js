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

			$('.user-image').eraser({
          		progressFunction: function(p) {
            		$('#progress').html(Math.round(p*100)+'%');
          		}
        	});


}(jQuery, window, document, undefined));