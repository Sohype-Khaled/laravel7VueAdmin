<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\UserResource;
use App\User;
use Auth;
use Hash;
use Illuminate\Http\Request;
use Validator;

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

    public function updateData(Request $request)
    {
        if (! empty($request->user)) {
            $founded_user = User::findOrFail($request->user);
            $founded_user->update($request->all());

            return response()->json(['data' => 'User Updated Successfully']);
        } else {
            return response()->json('We can\'t find this user for you');
        }
    }

    public function updatePassword(Request $request)
    {

        if (! (Hash::check($request->input('current_password'), Auth::user()->getAuthPassword()))) {
            return response()->json(['error' => 'Your current password does not matches with the password you provided. Please try again.']);
        }
        if (strcmp($request->input('current_password'), $request->input('new_password')) == 0) {
            return response()->json(['errors' => 'New Password cannot be same as your current password.']);
        }

        $validatedData = Validator::make($request->all(), [
            'current_password' => 'required',
            'new_password' => 'required|min:9|confirmed',
        ]);

        if ($validatedData->fails()) {
            return response()->json(['errors' => $validatedData->errors()]);
        }

        $user = Auth::user();

        $user->password = bcrypt($request->input('new_password'));
        $user->save();

        if (! empty($user->email)) {
            Auth::guard('web')->attempt(['email' => $user->email, 'password' => $request->input('new_password')], true);
        }

        return response()->json(['success' => 'Password changed successfully and remembered']);

    }
}
