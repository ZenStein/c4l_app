<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\cabin_active;

class cabin_activeController extends Controller
{

    public function index()
    {
        $cabin_active = cabin_active::all();
        return $cabin_active;
        //return 'index called';
    }
}
