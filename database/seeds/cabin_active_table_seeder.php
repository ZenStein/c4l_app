<?php

use Illuminate\Database\Seeder;

class cabin_active_table_seeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       // DB::table('cabin_actives')->truncate();
        //$table->truncate();
        factory('App\cabin_active', 29)->create();
    }
}
