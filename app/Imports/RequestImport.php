<?php

namespace App\Imports;

use App\Models\Request;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\SkipsFailures;
use Maatwebsite\Excel\Concerns\SkipsOnFailure;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class RequestImport implements ToModel, WithHeadingRow, WithValidation, SkipsOnFailure
{
    use Importable, SkipsFailures;

    public function model(array $row)
    {
        return new Request([
            'awb' => $row['awb'],
            'package_id' => $row['package_id'],
            'nama_pic' => $row['nama_pic'],
            'account' => $row['account'],
            'origin' => $row['origin'],
            'regional' => $row['regional'],
            'nama_kota' => $row['nama_kota'],
            'customer_name' => $row['customer_name'],
            'seller_name' => $row['seller_name'],
            'merchant_id' => $row['merchant_id'],
            'seller_address' => $row['seller_address'],
            'seller_phone' => $row['seller_phone'],
            'destinasi' => $row['destinasi'],
            'service' => $row['service'],
            'intruksi' => $row['intruksi'],
            'ins_value' => $row['ins_value'],
            'cod_flag' => $row['cod_flag'],
            'cod_amount' => $row['cod_amount'],
            'armada' => $row['armada'],
            'modul_entry' => $row['modul_entry'],
            'ket' => $row['ket'],
            'qty' => $row['qty'],
            'weight' => $row['weight'],
            'create_time' => $row['create_time'],
            'start_time' => $row['start_time'],
            'date_request' => $row['date_request'],
            'date_attempt' => $row['date_attempt'],
        ]);
    }

    public function rules(): array
    {
        return [
            '*.package_id' => ['required', 'unique:requests,package_id'],
        ];
    }
}
