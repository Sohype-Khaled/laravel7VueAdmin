<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{

    protected $targets;

    public function __construct()
    {
        $this->targets = [
            'admins' => collect(['index', 'show', 'store', 'delete', 'update', 'bulkDelete', 'export', 'activate', 'deactivate']),
        ];
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('roles')->truncate();
        DB::table('permissions')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        $superUser = \App\User::create([
            'name' => 'Sohype Khaled',
            'email' => 'sohype.mop@gmail.com',
            'password' => '123456789',
            'email_verified_at' => now(),
            'is_super_admin' => 1,
            'account_type' => 'admin',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        foreach ($this->targets as $target => $actions) {
            foreach ($actions as $action){
               $permission = Permission::create(['name' => "$target.$action"]);
                $superUser->givePermissionTo($permission->name);
            }
        }


    }
}
