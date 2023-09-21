<?php

namespace App\Http\Controllers;

use App\Models\Request as RequestModel;
use App\Models\Upload;
use Illuminate\Http\Request;

use function PHPUnit\Framework\isEmpty;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $query = RequestModel::with('upload')
            ->when(
                $request->q,
                fn ($q, $v) => $q->where('package_id', 'like', '%' . $v . '%')
                    ->orWhere('seller_name', 'like', '%' . $v . '%')
            );
        return inertia('Dashboard', [
            'uploads' => $query->paginate($request->load),
            'filtered' => [
                'q' => $request->q  ?? '',
                'load' => $request->load ?? 10
            ],
        ]);
    }
    public function export(Request $request)
    {
        // return RequestModel::with('upload')->get();
        $handle = fopen(public_path('storage/reports.csv'), 'w');
        $headerRow = [
            'AWB',
            'PACKAGEID',
            'ACCOUNT',
            'REGIONAL',
            'ORIGIN',
            'SELLER_NAME',
            'LINKS',
            'CREATED_AT'
        ];
        fputcsv($handle, $headerRow);
        RequestModel::with('upload')
            ->when(
                $request->q,
                fn ($q, $v) => $q->where('package_id', 'like', '%' . $v . '%')
                    ->orWhere('seller_name', 'like', '%' . $v . '%')
            )->lazyById(100, 'id')
            ->each(function ($report) use ($handle) {
                fputcsv($handle, [
                    'awb' => "'" . $report->awb,
                    'package_id' => $report->package_id,
                    'ACCOUNT' => $report->account,
                    'REGIONAL' => $report->regional,
                    'ORIGIN' => $report->origin,
                    'SELLER_NAME' => $report->seller_name,
                    'LINKS' => !empty($report->upload) ? "http://sunday.test/" . $report->upload->file_name : '',
                    'CREATED_AT' => $report->created_at
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
