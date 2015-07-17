<?php

use Illuminate\Database\Seeder;

class employeeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('employees')->truncate();
        //$table->truncate();
        factory('App\employee', 100)->create();
    }
}
