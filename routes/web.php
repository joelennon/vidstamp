<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::group(['middleware' => 'auth'], function() {
    Route::get('/app/{path?}', 'AppController@index')->name('app')->where('path', '.*');
    Route::get('/jobs/{job}/video', 'VideosController@show');
    Route::get('/jobs/{job}/watermarks', 'WatermarksController@show');
});
