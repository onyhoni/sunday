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

    public function export(Request $request)
    {
        // ExportDataToExcel::dispatch($request->all());
        // return redirect(route('reports.index'))->with([
        //     'type' => 'success',
        //     'message' => 'Export successfully'
        // ]);

        $handle = fopen(public_path('storage/reports.csv'), 'w');
        $headerRow = [
            'AWB',
            'PACKAGEID/NOORDER',
            'NAMA PIC',
            'ACCOUNT',
            'ORIGIN',
            'REGIONAL',
            'NAMA KOTA',
            'CUSTOMER NAME',
            'SELLER NAME',
            'MERCHANT ID',
            'SELLER ADDRESS',
            'SELLER PHONE',
            'DESTINASI',
            'Service',
            'INTRUKSI',
            'Ins Value ',
            'COD & NON COD',
            'COD AMOUNT',
            'ARMADA',
            'MODUL ENTRY',
            'KET',
            'QTY',
            'WEIGHT',
            'Create Time',
            'Start Time',
            'DATE REQUEST',
            'DATE 1# ATTEMPT',
            'RESULT 1# Attempt',
            'Date 2nd Attempt',
            'RESULT 2nd Attempt',
            'Date 3nd Attempt',
            'RESULT 3rd Attempt',
            'Entry Cnote',
            'Coding Status',
            'Final Status',
            'H+',
            'Reason Failed 1 Attempt',
            'Reason Failed 2 Attempt',
            'Reason Failed 3 Attempt',

            // Tambahkan header untuk setiap kolom yang Anda miliki
        ];
        fputcsv($handle, $headerRow);
        Report::query()->with('user', 'statuses', 'last_attempt', 'first_attempt', 'account', 'city')->whereBetween('create_time', [$request['s'], $request['e']])
            ->when($request['q'], fn ($q, $v) => $q->where('code', 'like', '%' . $v . '%')->orWhere('seller_name', 'like', '%' . $v . '%'))
            ->when($request['status'], fn ($q, $v) => $q->whereHas(
                'statuses',
                fn ($s) => $s->where('label_code', $v)
            ))
            ->when($request['customer'], fn ($q, $v) => $q->whereHas('account', fn ($a) => $a->where('slug', $v)))->lazyById(2000, 'id')
            ->each(function ($report) use ($handle) {
                fputcsv($handle, [
                    'code' => "'" . $report->code,
                    'no_order' => $report->no_order,
                    'nama_pic' => $report->nama_pic,
                    'account_code' => $report->account->code,
                    'origin_code' => $report->city->code,
                    'regional' => $report->city->regional,
                    'nama_kota' => $report->nama_kota,
                    'customer' => $report->account->name,
                    'seller_name' => $report->seller_name,
                    'merchant_id' => $report->merchant_id,
                    'seller_address' => $report->seller_address,
                    'seller_phone' => $report->seller_phone,
                    'destinasi' => $report->destinasi,
                    'service' => $report->service,
                    'intruksi' => $report->intruksi,
                    'ins_value' => $report->ins_value,
                    'cod_flag' => $report->cod_flag,
                    'cod_amount' => $report->cod_amount,
                    'armada' => $report->armada,
                    'modul_entry' => $report->modul_entry,
                    'ket' => $report->ket,
                    'qty' => $report->qty,
                    'weight' => $report->weight,
                    'create_time' => $report->create_time,
                    'start_time' => $report->start_time,
                    '1# req' => !empty($report->statuses[0])   ? $report->statuses[0]->attempt : '',
                    '1# date' => !empty($report->statuses[0])   ? $report->statuses[0]->attempt : '',
                    '1# attempt' => !empty($report->statuses[0])   ? $report->statuses[0]->label->name : '',
                    '2# date' => !empty($report->statuses[1])   ? $report->statuses[1]->attempt : '',
                    '2# attempt' => !empty($report->statuses[1])   ? $report->statuses[1]->label->name : '',
                    '3# date' => !empty($report->statuses[2])   ? $report->statuses[2]->attempt : '',
                    '3# attempt' => !empty($report->statuses[2])   ? $report->statuses[2]->label->name : '',
                    'entry_date' => !empty($report->last_attempt->entry) ? $report->last_attempt->entry : '',
                    'coding_status' => !empty($report->last_attempt->label->code) ? $report->last_attempt->label->code : '',
                    'report' => !empty($report->last_attempt->label->name) ? $report->last_attempt->label->name : '',
                    'h+' =>  !empty($report->statuses) ? count($report->statuses) > 0 ?? count($report->statuses) - 1  : '',
                    'reason 1# attempt' => !empty($report->statuses[0])   ? $report->statuses[0]->reason : '',
                    'reason 2# attempt' => !empty($report->statuses[1])   ? $report->statuses[1]->reason : '',
                    'reason 3# attempt' => !empty($report->statuses[2])   ? $report->statuses[2]->reason : '',
                ]);
            });

        fclose($handle);

        // Path to the generated CSV file
        $csvFilePath = public_path('storage/reports.csv');

        // Set appropriate headers for file download
        header('Content-Description: File Transfer');
        header('Content-Type: application/csv');
        header('Content-Disposition: attachment; filename=' . basename($csvFilePath));
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($csvFilePath));

        // Read and output the CSV file
        readfile($csvFilePath);

        // Delete the CSV file after download (optional)
        unlink($csvFilePath);
    }
}
