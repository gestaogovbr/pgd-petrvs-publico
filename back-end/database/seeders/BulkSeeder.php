<?php

namespace Database\Seeders;

class BulkSeeder
{
  private $file, $delimiter, $iterator, $header;

  public function __construct($filename, $delimiter = "\t")
  {
    $this->file = fopen($filename, 'r');
    $this->delimiter = $delimiter;
    $this->iterator = 0;
    $this->header = null;
  }

  // Entrega blocos de leitura para inserção múltipla em banco de dados.
  // No último bloco, entrega dados restantes (resto faltante).
  public function csvToArray($bulk = 1000)
  {
    $data = array();
    while (($row = fgetcsv($this->file, $bulk, $this->delimiter)) !== false) {
      $is_mul_1000 = false;
      if (!$this->header) {
        $this->header = $row;
      } else {
        $this->iterator++;
        $data[] = array_combine($this->header, $row);
        if ($this->iterator != 0 && $this->iterator % 1000 == 0) {
          $is_mul_1000 = true;
          $chunk = $data;
          $data = array();
          yield $chunk;
        }
      }
    }
    fclose($this->file);
    if (!$is_mul_1000) {
      yield $data;
    }
    return;
  }
}
