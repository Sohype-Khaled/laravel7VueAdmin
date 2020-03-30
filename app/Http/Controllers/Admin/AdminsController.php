<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\AdminResource;
use App\User;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class AdminsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index(Request $request)
    {
//        QueryBuilder::for(User::class)->allowedFilters(['id','name','email',])->get();

        $admins = new User;
        if ($request->has('search')) {
            $search = $request->input('search');
            $admins = $admins->where('id', 'LIKE', "%$search%")
                ->orWhere('name', 'LIKE', "%$search%")
                ->orWhere('email', 'LIKE', "%$search%")
                ->orWhere('id', 'LIKE', "%$search%");
        }
        if ($request->has('sort')) {
            foreach ($request->input('sort') as $sortable) {
                $order = strpos($sortable, '-') === 0 ? 'desc' : 'asc';
                $prop = str_replace('-', '', $sortable);
                $admins = $admins->orderBy($prop, $order);
            }
        }
        $admins = $admins->paginate($request->input('per_page') ?? 10);

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
