<?php

namespace App\Http\Controllers;

use App\Models\Upload;
use Exception;
use FFI\CData;
use Illuminate\Http\Request;

class UploadController extends Controller
{
    public function index()
    {
        return inertia('Upload');
    }

    public function store(Request $request)
    {
        try {
            foreach ($request->file('uploadFile') as $upload) {
                $Explode = explode(".", $upload->getClientOriginalName());
                $namaFile = $Explode[0];
                $extensiFile = $Explode[1];
                $code = substr($namaFile, -4);
                $key = explode(" ", $namaFile);

                if ($key[1] == 'ERAFONE') {
                    $key[1] = 'EAR';
                }

                $unique = $key[1] . "_" . Date('y_m') . "_" . $code; // NO.DCM/23/09/0998

                $lastName = $namaFile . "_" . $unique . '.' . $extensiFile;


                $upload->storeAs('public', $lastName);

                Upload::create([
                    'code' => $unique,
                    'file_name' => $lastName
                ]);
            }


            return redirect(route('dashboard'))->with([
                'type' => 'success',
                'message' => 'Import successfully'
            ]);
        } catch (Exception $e) {
            return redirect(route('dashboard'))->with([
                'type' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }
}
