<?php

namespace App\Http\Controllers;

use Exception;
use App\Imports\RequestImport;
use Illuminate\Http\Request;


class RequestController extends Controller
{
    public function store(Request $request)
    {
        $import = new RequestImport();
        $import->import($request->uploadData);

        if ($import->failures()->isEmpty()) {
            return to_route('dashboard')->with([
                'type' => 'success',
                'message' => 'Import successfully'
            ]);
        } else {
            return to_route('dashboard')->with([
                'errorsFlash' =>  $import->failures(),
            ]);
        }
    }
}
