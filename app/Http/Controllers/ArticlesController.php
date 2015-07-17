<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Article;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class ArticlesController extends Controller
{
 public function index(){
     //return 'get all articles';
     $articles = Article::all();
     return $articles;
 }
}
