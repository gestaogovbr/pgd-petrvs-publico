<?php

namespace Database\Seeders;

use App\Models\PainelUsuario;
use Illuminate\Database\Seeder;

class PainelUsuarioSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    PainelUsuario::firstOrCreate([
      'email' => 'marco.coelho@firstbps.com.br',
    ], [
      'nome' => 'Marco Coelho',
      'password' => md5('petrvs@123'),
      'cpf' => '03400125954',
      'nivel' => 1,
      'email_verified_at' => now(),
      'created_at' => now(),
      'updated_at' => now(),
    ]);

    PainelUsuario::firstOrCreate([
      'email' => 'geisimar.rech87@gmail.com',
    ], [
      'nome' => 'Geisimar Rech',
      'password' => md5('petrvs@123'),
      'cpf' => '01798651106',
      'nivel' => 1,
      'email_verified_at' => now(),
      'created_at' => now(),
      'updated_at' => now(),
    ]);

    PainelUsuario::firstOrCreate([
      'email' => 'henrique.felipe100@gmail.com',
    ], [
      'nome' => 'Henrique Felipe Alves',
      'password' => md5('petrvs@123'),
      'cpf' => '40921185898',
      'nivel' => 1,
      'email_verified_at' => now(),
      'created_at' => now(),
      'updated_at' => now(),
    ]);

    PainelUsuario::firstOrCreate([
      'email' => 'guibitar@gmail.com',
    ], [
      'nome' => 'Guilherme Bitar',
      'password' => md5('petrvs@123'),
      'cpf' => '01914276167',
      'nivel' => 1,
      'email_verified_at' => now(),
      'created_at' => now(),
      'updated_at' => now(),
    ]);

    PainelUsuario::firstOrCreate([
      'email' => 'marcoaoc83@gmail.com',
    ], [
      'nome' => 'Marco Coelho',
      'password' => md5('petrvs@123'),
      'cpf' => '03400125954',
      'nivel' => 1,
      'email_verified_at' => now(),
      'created_at' => now(),
      'updated_at' => now(),
    ]);

    PainelUsuario::firstOrCreate([
      'email' => 'tcrispim.digital@gmail.com',
    ], [
      'nome' => 'thiago crispim',
      'password' => md5('petrvs@123'),
      'cpf' => '00623555685',
      'nivel' => 1,
      'email_verified_at' => now(),
      'created_at' => now(),
      'updated_at' => now(),
    ]);

    PainelUsuario::firstOrCreate([
      'email' => 'diegobraga7@gmail.com',
    ], [
      'nome' => 'Diego Braga',
      'password' => md5('petrvs@123'),
      'cpf' => '00623555685',
      'nivel' => 1,
      'email_verified_at' => now(),
      'created_at' => now(),
      'updated_at' => now(),
    ]);   

    PainelUsuario::firstOrCreate([
      'email' => 'programadegestaomgi@gmail.com',
    ], [
      'nome' => 'PGD',
      'password' => md5('40587302003'),
      'cpf' => '40587302003',
      'email_verified_at' => now(),
      'created_at' => now(),
      'updated_at' => now(),
    ]);
  }
}
