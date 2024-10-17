<?php

namespace App\Services\Validador;

use App\Exceptions\DataInvalidException;
use App\Services\Validador\IValidador;
use Illuminate\Http\Request;

abstract class BaseValidador implements IValidador
{
   CONST TIPO_STORE = 'store';
    CONST TIPO_UPDATE = 'update';
    CONST TIPO_DELETE = 'delete';
    CONST TIPO_SHOW = 'show';
    CONST TIPO_INDEX = 'index';
    CONST TIPO_SEARCH = 'search';
    CONST TIPO_EXPORT = 'export';
    CONST TIPO_IMPORT = 'import';
    CONST TIPO_IMPORT_FILE = 'import_file';
    CONST TIPO_IMPORT_FILE_VALIDATE = 'import_file_validate';
    CONST TIPO_IMPORT_FILE_SAVE = 'import_file_save';
    CONST TIPO_IMPORT_FILE_SAVE_VALIDATE = 'import_file_save_validate';
    CONST TIPO_IMPORT_FILE_SAVE_VALIDATE_STORE = 'import_file_save_validate_store';
    CONST TIPO_IMPORT_FILE_SAVE_VALIDATE_UPDATE = 'import_file_save_validate_update';
    CONST TIPO_IMPORT_FILE_SAVE_VALIDATE_DELETE = 'import_file_save_validate_delete';
    CONST TIPO_IMPORT_FILE_SAVE_VALIDATE_SHOW = 'import_file_save_validate_show';
    CONST TIPO_IMPORT_FILE_SAVE_VALIDATE_INDEX = 'import_file_save_validate_index';
    CONST TIPO_IMPORT_FILE_SAVE_VALIDATE_SEARCH = 'import_file_save_validate_search';
    CONST TIPO_IMPORT_FILE_SAVE_VALIDATE_EXPORT = 'import_file_save_validate_export';
    CONST TIPO_IMPORT_FILE_SAVE_VALIDATE_IMPORT = 'import_file_save_validate_import';


    private string  $tipo = self::TIPO_STORE;

    public function setTipo(string $tipo) : void
    {
        $this->tipo = $tipo;
    }

    public function getTipo() : string
    {
        return $this->tipo;
    }

    public function validar(Request $request): array
    {
        $data = match ($this->tipo) {
            self::TIPO_STORE => $this->validarStore($request),
            self::TIPO_UPDATE => $this->validarUpdate($request),
            default => throw new DataInvalidException('Tipo de validação não encontrado')
        };

        return $this->validarRegra($data);
    }
   

    protected function validarStore(Request $request) : array
    {
        $data = $request->validate([
            'entity' => ['required'],
            'with' => ['array']
        ]);
        
        return $data;
    }

    protected function validarUpdate(Request $request) : array
    {
        $data = $request->validate([
            'id' => ['required'],
            'data' => ['required'],
            'with' => ['array']
        ]);
        return $data;
    }
    

}