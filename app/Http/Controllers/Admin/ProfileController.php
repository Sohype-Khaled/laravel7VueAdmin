<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\UserResource;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function profile()
    {
        return new UserResource(request()->user());
    }

    public function getRolesAndPermissions(Request $request)
    {
        return $request->user()->getAllPermissions()->pluck('name');
    }

    public function updateData()
    {

    }

    public function changePassword()
    {

    }
}
