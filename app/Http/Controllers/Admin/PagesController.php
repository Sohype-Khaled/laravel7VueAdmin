<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\PagesResource;
use App\Pages;
use Illuminate\Http\Request;

class PagesController extends Controller
{

    public function index()
    {
        return PagesResource::collection(Pages::all());
    }


    public function store(Request $request)
    {
        $this->validate($request, [
            'title' => 'required',
            'slug' => 'required',
            'descr' => 'required',
            'short_descr' => 'required'
        ]);

        Pages::create($request->all());

        return response()->json(['msg' => 'Page created successfully']);
    }


    public function show($id)
    {
        //
    }


    public function update(Request $request, $id)
    {
        //
    }


    public function destroy($id)
    {
        //
    }

    public function translate(Request $request, $id)
    {
        $this->validate($request, [
            'title' => 'required',
            'descr' => 'required',
            'short_descr' => 'required'
        ]);

        $page = Pages::find($id);

        $page->setTranslation('ar', $request->only('title', 'descr', 'short_descr'));

        return response()->json(['msg' => 'Page translated successfully']);
    }
}
