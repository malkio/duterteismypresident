var s3 = (function(){
	var $parentContainer = $("#s3");
	var state = {};
	var userData = {};
	var isCurrent = false;

	function _initialize(){

		interact('#s3 canvas')
		  .draggable({
		    onmove: window.dragMoveListener
		  })
		  .resizable({
		    preserveAspectRatio: false,
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
		window.dragMoveListener = dragMoveListener;

	}

	function _render() {
		$parentContainer.find('.previous').on('click', function(e){
			_previousSlide(e);
		});

		$parentContainer.find('#toggleGrayScale').on('click', function(e){
			console.log(e);
			console.log($(this));
		});

		$("#s3 #confirms3").on('click', function(){
			$('#downloadBtn').removeClass('disabled').addClass('btn-success');
		});


		$('#downloadBtn').on('click',function(){
			saveSupporter();
			var bg = $("#s3 #placeholder").get(0);
		//	convertToGrayScale();
			var image = $("#s3 canvas#eraseImg").get(0);
			var ctx = document.getElementById('output').getContext('2d');

			var imageHeight = $("#s3 canvas#eraseImg").css("height");
			imageHeight = parseInt(imageHeight.substr(0, imageHeight.length -2));  // Extract px character
			var imageWidth = $("#s3 canvas#eraseImg").css("width");
			imageWidth = parseInt(imageWidth.substr(0, imageWidth.length -2));  // Extract px character
			var imageX = parseInt($('#s3 canvas#eraseImg').data("x")) || 0;
			var imageY = parseInt($('#s3 canvas#eraseImg').data("y")) || 0;

			// Set text


	        	ctx.drawImage(bg, 0,0, 600, 600);
	        	ctx.font = "15px Arial";
	        	ctx.fillStyle = 'black';
			ctx.fillText(userData.userStatus,360,420);
			ctx.font = "24px Arial";
			ctx.fillText(userData.userName,360,390);

	        	ctx.drawImage(image, imageX,imageY, imageWidth, imageHeight);
	        downloadCanvas(this, 'output', 'test.png');
		});

	}

	function saveSupporter(){
		function Supporter(args) {
		    args = args || {};
		    this.name = args.name || "";
		    this.status = args.age || "";
		}
		var supporterObject = new Supporter({
			name: userData.userName,
			status: userData.userStatus,
		});
		Backendless.Persistence.of( Supporter ).save( supporterObject, new Backendless.Async(
			function(){
			console.log("Du30 for President!");
		}, function(){
			console.log("Oops");
		} ) );
	}

	function convertToGrayScale(){
		// var imgd = context.getImageData(0, 0, 500, 300);
		// var pix = imgd.data;
		// for (var i = 0, n = pix.length; i < n; i += 4) {
		// var grayscale = pix[i  ] * .3 + pix[i+1] * .59 + pix[i+2] * .11;
		// pix[i  ] = grayscale; 	// red
		// pix[i+1] = grayscale; 	// green
		// pix[i+2] = grayscale; 	// blue
		// // alpha
		// }
		// context.putImageData(imgd, 0, 0);
	}

	function downloadCanvas(link, canvasId, filename) {
		link.href = document.getElementById(canvasId).toDataURL();
		link.download = filename;
	}
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

	function compileCanvas(){

	}
	function getStampNumber(){

	}

	function _previousSlide(e){
		slideHandler(e, 'previous');

		//save before go back
		userData.userImage = $parentContainer.find("#eraseImg");
		s2.setUserData( getUserData() );
		s2.setCurrent(true);
	}
	function _setUserData(data){
		userData = data;
	}

	function getUserData(){
		return userData;
	}
	return {
		initialize: _initialize,
		render: _render,
		setCurrent: function(iscurrent){
			isCurrent = iscurrent;
			this.setImage();
			_initialize();
		},
		setImage: function(){
			$image = userData.userImage;
			var placeholderText = $("span").text("hello world").css("font-size", 30).css('position',"absolute").css("bottom", "200").css("right", "200");
			$parentContainer.find('#resize-box').prepend(placeholderText);
			$parentContainer.find('#resize-box').append($image).attr("width", "600").attr('height', "600");
		},
		setPattern: function(){

		},
		startMove: function(){

		},
		endMove: function(){

		},
		startResize: function(){

		},
		endResize: function(){

		},
		setUserData: _setUserData,
		reset: function(){

		},
		download: function(){
			getStampNumber();
			compileCanvas();
			//redirect here
		},


	};
})();