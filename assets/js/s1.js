var s1 = (function(){
	var $parentContainer = $("#s1");
	var isCurrent = false;
	var state = {};
	var userData = {};

	function _initialize(data){
		isCurrent = true;
		userData = data;
		_render();
	}

	function _render(){
		// Upload Box listener
		$parentContainer.find("#upload-box").click(function(e){
		    $parentContainer.find('#uploadInput').trigger('click');
		});
		$parentContainer.find('#uploadInput').on('change', function(){
		     setUserImage(this, $parentContainer.find('#upload-box >img') );
		});

		// Next Slide Listener
		$parentContainer.find('.next').on('click', function(e){
			setUserName( $parentContainer.find('.username-input').val() );
			setUserStatus( $parentContainer.find('.userstatus-input').val() );
			_nextSlide(e);
		});
	}

	function _nextSlide(e){
		slideHandler(e, 'next');
		s2.setUserData( _getUserData() );
		s2.setCurrent(true);
	}

	function setUserImage(_inputelement, _imageelement){
		if (_inputelement.files && _inputelement.files[0]) {
		     var reader = new FileReader();

	        reader.onload = function (e) {
	            _imageelement.attr('src', e.target.result).removeClass('hidden');
	        };
	        reader.readAsDataURL(_inputelement.files[0]);
		}
		// Save the element to object
		userData.userImage = _imageelement;
	}

	function setUserName(_username){
		_username = _username.trim().split(" ");
		$.each(_username, function(index, item) {
		    _username[index] = item.charAt(0).toUpperCase() + item.substr(1).toLowerCase();
		});
		_username = _username.join(" ");
		// Save the name to object
		userData.userName = _username;
	}

	function setUserStatus(_userstatus){
		_userstatus = _userstatus.charAt(0).toUpperCase() + _userstatus.substr(1).toLowerCase();
		// Save the status to object
		userData.userStatus = _userstatus;
	}

	function _getUserData(){
		return userData;
	}

	return {
		nextSlide : _nextSlide,
		initialize: _initialize,
		getUserData: _getUserData,

		setCurrent: function(iscurrent){
			isCurrent = iscurrent;
		},
	};

})();