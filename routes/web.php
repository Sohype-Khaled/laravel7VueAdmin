<?php

use Illuminate\Support\Facades\Route;

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
