<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\RoleResource;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class RolesController extends Controller
{

    public function index(Request $request)
    {
        $roles = new Role();
        if ($request->has('search')) {
            $search = $request->input('search');
            $roles = $roles->where('id', 'LIKE', "%$search%")
                ->orWhere('name', 'LIKE', "%$search%")
                ->orWhere('id', 'LIKE', "%$search%");
        }
        if ($request->has('sort')) {
            foreach ($request->input('sort') as $sortable) {
                $order = strpos($sortable, '-') === 0 ? 'desc' : 'asc';
                $prop = str_replace('-', '', $sortable);
                $roles = $roles->orderBy($prop, $order);
            }
        }
        $roles = $roles->paginate($request->input('per_page') ?? 10);
        return RoleResource::collection($roles);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|unique:roles,name',
            'permissions' => 'required|exists:permissions,name'
        ]);

        $role = Role::create(['name' => $request->input('name')]);
        if ($role)
            foreach ($request->input('permissions') as $permission)
                $role->givePermissionTo($permission);

        return response()->json(['msg' => 'Role created successfully']);
    }

    public function show(Role $role)
    {
        return new RoleResource($role);
    }

    public function update(Request $request, Role $role)
    {
        $this->validate($request, [
            'name' => 'required|unique:roles,name,' . $role->id,
            'permissions' => 'required|exists:permissions,name'
        ]);

        $role->update(['name' => $request->input('name')]);

        $role->syncPermissions($request->input('permissions'));

        return response()->json(['msg' => 'Role updated successfully']);
    }

    public function destroy(Role $role)
    {

    }
}
