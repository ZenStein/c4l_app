<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class cabin_active extends Model
{
            protected $fillable = [
                'location',
                'cabin_number' ,
                'status' ,
                'linens' ,
        ];
}
