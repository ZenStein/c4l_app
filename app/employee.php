<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class employee extends Model
{
        protected $fillable = [
                'first_name' ,
                'last_name' ,
                'email' ,
                'phone' ,
                'phone2',
                'SSN' ,
                'department' ,
                'birthday' ,
                'start_date' ,
                'hourly_rate'
        ];
}
