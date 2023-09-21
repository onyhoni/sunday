<?php

namespace App\Http\Controllers;

use App\Models\Request;
use App\Models\Upload;

class DashboardController extends Controller
{
    public function index()
    {
        // return Request::with('upload')->paginate();
        return inertia('Dashboard', [
            'uploads' => Request::with('upload')->paginate(50),
        ]);
    }
}
