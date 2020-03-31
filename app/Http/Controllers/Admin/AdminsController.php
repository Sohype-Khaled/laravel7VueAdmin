<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\AdminResource;
use App\User;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class AdminsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index(Request $request)
    {
        $admins = QueryBuilder::for(User::class)
            ->allowedFilters([AllowedFilter::exact('id'), 'name', 'email',])
            ->allowedSorts('id', 'name', 'email')
            ->paginate($request->perPage)
            ->appends(request()->query());

        return AdminResource::collection($admins);
    }


    public function store(Request $request)
    {
        //
    }


    public function show($id)
    {
        //
    }


    public function update(Request $request, $id)
    {
        //
    }


    public function destroy(User $admin)
    {
        try {
            $admin->delete();
        } catch (\Exception $e) {
        }

        return response()->json(['msg' => 'User deleted successfully'], 200);
    }
}
