myApp.controller('galleryController', ['$scope', '$location', '$timeout', '$routeParams', '$log', 'galleryModel', 'Lightbox', function($scope, $location, $timeout, $routeParams, $log, galleryModel, Lightbox) {
	angular.extend($scope, {
		newGallery: {},
		singleGallery: {},
		dropzoneConfig: {
			'options': { // passed into the Dropzone constructor
				'url': baseUrl + 'upload-file'
			},
			'eventHandlers': {
				'sending': function (file, xhr, formData) {
					formData.append('_token', csrfToken);
					formData.append('galleryID', $routeParams.galleryID);
				},
				'success': function (file, response) {
					$log.log(response);
				}
			}
		},
		errorDiv: false,
		errorMessages: []
	});

	galleryModel.getAllGalleries().then(function(successResponse) {
		$scope.galleries = successResponse.data;
		$scope.showGalleries = true;
	});

	if ($routeParams.galleryID) {
		galleryModel.getGalleryById($routeParams.galleryID).then(function(successResponse) {
			$scope.singleGallery = successResponse.data;
			$scope.showGallery = true;
		});
	}

	angular.extend($scope, {
		saveNewGallery: function(addGalleryForm) {
			if (addGalleryForm.$valid) {
				$scope.submitWithError = false;
				galleryModel.saveGallery($scope.newGallery);
			} else {
				$scope.submitWithError = true;
			}
		},

		viewGallery: function(galleryID) {
			$location.path('/gallery/view/' + galleryID);
		},

        openLightboxModal: function (index) {
            Lightbox.openModal($scope.singleGallery.images, index);
        }
	});
}]);