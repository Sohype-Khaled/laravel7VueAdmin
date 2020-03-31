<?php
//Route::group(['prefix'=>'admin'], function () {
//    Route::get('/{any}', 'HomeController@admin')->where('any', '.*');
//});

Route::get('/', function () {
    return view('welcome')->with('pages', \App\Pages::all());
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::view('admin/{any}', 'layouts.admin')->where('any', '.*');
Route::view('admin', 'layouts.admin')->where('any', '.*');
