<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
   return view('layout');
    //return 'test app is good!';
});

Route::get('articles','ArticlesController@index');
Route::get('housekeepers','employeeController@housekeepers');
Route::get('cabin_active','cabin_activeController@index');
Route::get('upload_occ_pos','occ_active_pos_Controller@index');
Route::get('make_call',function(){
    return view('makecall');
});
Route::resource('employee','employeeController');
Route::resource('authorize','authorizeController');
