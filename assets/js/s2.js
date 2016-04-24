var s2 = (function(){
	var $parentContainer = $("#s2");
	var state = {};
	var userData = {};
	var isCurrent = false;

	function _initialize(){
		_render();
	}

	function _render() {
		// Next Slider Listener
		$parentContainer.find('.next').on('click', function(e){
			_nextSlide(e);
		});
		$parentContainer.find('.previous').on('click', function(e){
			_previousSlide(e);
		});
		$parentContainer.find('.startBrush').on('click', function(){
			_startBrush( $(this).data('brush'));
		});
		$parentContainer.find('#eraserResetBtn').on('click', function(){
			$parentContainer.find("#erase-box").find('canvas').eraser('reset');
			_reset();
		});

		$parentContainer.find('#confirm').on('click', function(){
			_endBrush();
			userData.userImage = $parentContainer.find('#erase-box').find('canvas');
			$parentContainer.find('.next').removeClass("disabled").addClass('btn-success');
		});
	}

	function _nextSlide(e){
		slideHandler(e, 'next');
		s3.setUserData( userData);
		s3.setCurrent(true);
	}

	function _previousSlide(e){
		slideHandler(e, 'previous');
	}

	function _startBrush(size){
		var brushSize = (size !== 'undefined') ? size : 20;
		$parentContainer.find("#erase-box").find('canvas').eraser('enable');
		$parentContainer.find("#erase-box").find('canvas').eraser('size',brushSize);

	}
	function _reset(){
		$('eraseImg').eraser('reset');
	}
	function _setUserData (data){
		console.log("hey");
		userData = data;
	}

	function _endBrush(){
		$parentContainer.find("#erase-box").find('canvas').eraser('disable');
	}

	return {
		initialize: _initialize,

		setCurrent: function(iscurrent){
			isCurrent = iscurrent;
			this.setImage();

		},
		setImage: function(){
			if(  userData.userImage !== "undefined" ){
				var b=  userData.userImage.attr('src');
				$parentContainer.find('#eraseImg').attr('src', b).removeClass('hidden');
				$parentContainer.find("#erase-box").find('img').eraser();
				$parentContainer.find("#erase-box").find('canvas').eraser('disable');
			}
			else if( userData.userImage.is("canvas") ){
				console.log("is canvas");
			}
		},
		getUserData: function(){
			return userData;
		},
		setUserData: _setUserData,
		startBrush: _startBrush,
		reset: _reset,
		endBrush: _endBrush,

	};
})();