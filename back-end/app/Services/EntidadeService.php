<?php

namespace App\Services;

use App\Models\Entidade;
use App\Services\ServiceBase;
use App\Traits\UseDataFim;
use Exception;

class EntidadeService extends ServiceBase {
    use UseDataFim;

    public function generateApiKey($entidade_id) {
        $entidade = Entidade::find($entidade_id);
        if(!empty($entidade)) {
            $keys = openssl_pkey_new(array('private_key_bits' => 2048));
            openssl_pkey_export($keys, $private);
            $public = openssl_pkey_get_details($keys)['key'];
            $lines = preg_split('#\r?\n#', ltrim($public), 3);
            $entidade->api_public_key = $public;
            $entidade->api_private_key = $private;
            $entidade->save();
            return $lines[1];
        } else {
            throw new Exception("Entidade não encontrada");
        }
    }
}
