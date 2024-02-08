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

        PainelUsuario::create([
            'email' => 'marco.coelho@firstbps.com.br',
            'nome' => 'Marco Coelho',
            'password' => md5('petrvs@123'),
            'cpf' => '03400125954',
            'email_verified_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        PainelUsuario::create([
            'email' => 'genisson.albuquerque@prf.gov.br',
            'nome' => 'Genisson',
            'password' => md5('petrvs@123'),
            'cpf' => '07408707425',
            'email_verified_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        PainelUsuario::create([
            'email' => 'diogo.paiva@prf.gov.br',
            'nome' => 'Diogo Paiva',
            'password' => md5('petrvs@123'),
            'cpf' => '01710713526',
            'email_verified_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        PainelUsuario::create([
            'email' => 'ricardo.farias@prf.gov.br',
            'nome' => 'Ricardo',
            'password' => md5('petrvs@123'),
            'cpf' => '25941933304',
            'email_verified_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        PainelUsuario::create([
            'email' => 'geisimar.rech87@gmail.com',
            'nome' => 'Geisimar Rech',
            'password' => md5('petrvs@123'),
            'cpf' => '01798651106',
            'email_verified_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        PainelUsuario::create([
            'email' => 'henrique.felipe100@gmail.com',
            'nome' => 'Henrique Felipe Alves',
            'password' => md5('petrvs@123'),
            'cpf' => '40921185898',
            'email_verified_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        PainelUsuario::create([
            'email' => 'guibitar@gmail.com',
            'nome' => 'Guilherme Bitar',
            'password' => md5('petrvs@123'),
            'cpf' => '01914276167',
            'email_verified_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        PainelUsuario::create([
            'email' => 'marcoaoc83@gmail.com',
            'nome' => 'Marco Coelho',
            'password' => md5('petrvs@123'),
            'cpf' => '03400125954',
            'email_verified_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        PainelUsuario::create([
            'email' => 'tcrispim.digital@gmail.com',
            'nome' => 'thiago crispim',
            'password' => md5('petrvs@123'),
            'cpf' => '00623555685',
            'email_verified_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        PainelUsuario::create([
            'email' => 'diegobraga7@gmail.com',
            'nome' => 'Diego Braga',
            'password' => md5('petrvs@123'),
            'cpf' => '00623555685',
            'email_verified_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

    }
}
