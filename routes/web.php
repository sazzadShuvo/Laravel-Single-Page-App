<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('/', function () {
    return view('master');
});

Route::post('auth/login', 'UsersController@authenticate');

Route::get('galleries', 'GalleriesController@index');
Route::get('gallery/{galleryID}', 'GalleriesController@show');
Route::post('galleries', 'GalleriesController@store');
Route::delete('gallery/{galleryId}/delete-image/{imageId}', 'GalleriesController@destroyImage');

Route::post('upload-file', 'GalleriesController@uploadImage');