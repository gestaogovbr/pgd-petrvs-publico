<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Curso;

class CursoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       $array_cursos =  [  
        /* Ciências exatas e da terra */
    ['area'=>'4d4f25c4-af4e-4483-ab14-3751e8347532','nome'=>'Matemática','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'4d4f25c4-af4e-4483-ab14-3751e8347532','nome'=>'Estatística','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'4d4f25c4-af4e-4483-ab14-3751e8347532','nome'=>'Ciência Da Computação','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'4d4f25c4-af4e-4483-ab14-3751e8347532','nome'=>'Astronomia','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'4d4f25c4-af4e-4483-ab14-3751e8347532','nome'=>'Física','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'4d4f25c4-af4e-4483-ab14-3751e8347532','nome'=>'Química','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'4d4f25c4-af4e-4483-ab14-3751e8347532','nome'=>'Geociências','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'4d4f25c4-af4e-4483-ab14-3751e8347532','nome'=>'Tecnologia da Informação e Comunicação','titulo'=>'ESPECIAL','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],//Especialização PRF
    ['area'=>'4d4f25c4-af4e-4483-ab14-3751e8347532','nome'=>'Full Stack Developer','titulo'=>'ESPECIAL','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],//Especialização
    ['area'=>'4d4f25c4-af4e-4483-ab14-3751e8347532','nome'=>'MBA em Engenharia de Software','titulo'=>'ESPECIAL','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],//MBA
     /* Ciências Biologicas */
    ['area'=>'b8029586-f82f-4bd1-9dad-dc99a2f4ca6e','nome'=>'Biologia','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'b8029586-f82f-4bd1-9dad-dc99a2f4ca6e','nome'=>'Bioquímica','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'b8029586-f82f-4bd1-9dad-dc99a2f4ca6e','nome'=>'Biofísica','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'b8029586-f82f-4bd1-9dad-dc99a2f4ca6e','nome'=>'Genética','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'b8029586-f82f-4bd1-9dad-dc99a2f4ca6e','nome'=>'Farmacologia','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'b8029586-f82f-4bd1-9dad-dc99a2f4ca6e','nome'=>'Botânica','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'b8029586-f82f-4bd1-9dad-dc99a2f4ca6e','nome'=>'Zoologia','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'b8029586-f82f-4bd1-9dad-dc99a2f4ca6e','nome'=>'Ecologia','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'b8029586-f82f-4bd1-9dad-dc99a2f4ca6e','nome'=>'Fisiologia','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'b8029586-f82f-4bd1-9dad-dc99a2f4ca6e','nome'=>'Imunologia','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'b8029586-f82f-4bd1-9dad-dc99a2f4ca6e','nome'=>'Anatomia Humana','titulo'=>'ESPECIAL','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],//Especialização
    ['area'=>'b8029586-f82f-4bd1-9dad-dc99a2f4ca6e','nome'=>'Citologia','titulo'=>'ESPECIAL','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],//Especialização
     /* Engenharias */
    ['area'=>'95ce78c2-2656-4de1-82a8-98a0439b5426','nome'=>'Civil','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'95ce78c2-2656-4de1-82a8-98a0439b5426','nome'=>'Elétrica','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'95ce78c2-2656-4de1-82a8-98a0439b5426','nome'=>'Mecânica','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'95ce78c2-2656-4de1-82a8-98a0439b5426','nome'=>'Química','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'95ce78c2-2656-4de1-82a8-98a0439b5426','nome'=>'Sanitária','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'95ce78c2-2656-4de1-82a8-98a0439b5426','nome'=>'de produção','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'95ce78c2-2656-4de1-82a8-98a0439b5426','nome'=>'Metalúrgica','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'95ce78c2-2656-4de1-82a8-98a0439b5426','nome'=>'Nuclear','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'95ce78c2-2656-4de1-82a8-98a0439b5426','nome'=>'de transportes','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'95ce78c2-2656-4de1-82a8-98a0439b5426','nome'=>'Naval','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'95ce78c2-2656-4de1-82a8-98a0439b5426','nome'=>'Aeroespacial','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'95ce78c2-2656-4de1-82a8-98a0439b5426','nome'=>'Perícias de Engenharia','titulo'=>'ESPECIAL','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],//Especialização
    ['area'=>'95ce78c2-2656-4de1-82a8-98a0439b5426','nome'=>'Segurança do Trabalho','titulo'=>'ESPECIAL','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],//Especialização
    ['area'=>'95ce78c2-2656-4de1-82a8-98a0439b5426','nome'=>'MBA em Gestão para Engenharias','titulo'=>'ESPECIAL','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],//MBA
   
     /* Ciências da Saúde */
    ['area'=>'8c408be9-beaa-40bb-b671-f6f9786ad12d','nome'=>'Medicina','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'8c408be9-beaa-40bb-b671-f6f9786ad12d','nome'=>'Enfermagem','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'8c408be9-beaa-40bb-b671-f6f9786ad12d','nome'=>'Farmácia','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'8c408be9-beaa-40bb-b671-f6f9786ad12d','nome'=>'Odontologia','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'8c408be9-beaa-40bb-b671-f6f9786ad12d','nome'=>'Nutrição','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'8c408be9-beaa-40bb-b671-f6f9786ad12d','nome'=>'Fonoaudiologia','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'8c408be9-beaa-40bb-b671-f6f9786ad12d','nome'=>'Fisioterapia','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'8c408be9-beaa-40bb-b671-f6f9786ad12d','nome'=>'Terapia Ocupacional','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'8c408be9-beaa-40bb-b671-f6f9786ad12d','nome'=>'Educação Física','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'8c408be9-beaa-40bb-b671-f6f9786ad12d','nome'=>'Biomedicina','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'8c408be9-beaa-40bb-b671-f6f9786ad12d','nome'=>'Bio Medicina Estética','titulo'=>'ESPECIAL','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],//Especialização
    ['area'=>'8c408be9-beaa-40bb-b671-f6f9786ad12d','nome'=>'Nutrição Clinica e Hospitalar','titulo'=>'ESPECIAL','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],//Especialização
    ['area'=>'8c408be9-beaa-40bb-b671-f6f9786ad12d','nome'=>'MBA em Gestão de Saúde','titulo'=>'ESPECIAL','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],//MBA
    ['area'=>'8c408be9-beaa-40bb-b671-f6f9786ad12d','nome'=>'MBA em Serviços de Saúde','titulo'=>'ESPECIAL','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],//MBA
     /* Ciências Humanas */
    ['area'=>'2b68a785-15ed-4b99-95fa-210164395060','nome'=>'Filosofia','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'2b68a785-15ed-4b99-95fa-210164395060','nome'=>'Sociologia','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'2b68a785-15ed-4b99-95fa-210164395060','nome'=>'Antropologia','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'2b68a785-15ed-4b99-95fa-210164395060','nome'=>'Arqueologia','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'2b68a785-15ed-4b99-95fa-210164395060','nome'=>'História','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'2b68a785-15ed-4b99-95fa-210164395060','nome'=>'Geografia','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'2b68a785-15ed-4b99-95fa-210164395060','nome'=>'Psicologia','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'2b68a785-15ed-4b99-95fa-210164395060','nome'=>'Educação','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'2b68a785-15ed-4b99-95fa-210164395060','nome'=>'Ciência Política','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'2b68a785-15ed-4b99-95fa-210164395060','nome'=>'Teologia','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'2b68a785-15ed-4b99-95fa-210164395060','nome'=>'Gestão de Pessoas','titulo'=>'ESPECIAL','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],//Especialização
    ['area'=>'2b68a785-15ed-4b99-95fa-210164395060','nome'=>'MBA em Gestão Empresarial','titulo'=>'ESPECIAL','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],//MBA
    ['area'=>'2b68a785-15ed-4b99-95fa-210164395060','nome'=>'MBA em Gestão de Projetos','titulo'=>'ESPECIAL','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],//MBA
    ['area'=>'2b68a785-15ed-4b99-95fa-210164395060','nome'=>'MBA Gestão Estratégica de Pessoas','titulo'=>'ESPECIAL','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],//MBA
    ['area'=>'2b68a785-15ed-4b99-95fa-210164395060','nome'=>'Gestão Operacional','titulo'=>'ESPECIAL','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],//Especialização PRF
    ['area'=>'2b68a785-15ed-4b99-95fa-210164395060','nome'=>'Inteligência','titulo'=>'ESPECIAL','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],//Especialização PRF
    ['area'=>'2b68a785-15ed-4b99-95fa-210164395060','nome'=>'Corregedoria','titulo'=>'ESPECIAL','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],//Especialização
    ['area'=>'2b68a785-15ed-4b99-95fa-210164395060','nome'=>'Gestão Executiva','titulo'=>'ESPECIAL','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],//Especialização PRF
     /* Ciências Agrárias */
    ['area'=>'7e6a3c15-9b30-4517-89ff-af49319b95fe','nome'=>'Agronomia','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'7e6a3c15-9b30-4517-89ff-af49319b95fe','nome'=>'Recursos Florestais (Incluindo Engenharia Florestal)','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'7e6a3c15-9b30-4517-89ff-af49319b95fe','nome'=>'Engenharia Agrícola','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'7e6a3c15-9b30-4517-89ff-af49319b95fe','nome'=>'Zootecnia','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'7e6a3c15-9b30-4517-89ff-af49319b95fe','nome'=>'Medicina Veterinária','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'7e6a3c15-9b30-4517-89ff-af49319b95fe','nome'=>'Recursos Pesqueiros','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'7e6a3c15-9b30-4517-89ff-af49319b95fe','nome'=>'Engenharia De Pesca E De Alimentos','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'7e6a3c15-9b30-4517-89ff-af49319b95fe','nome'=>'Citicultura','titulo'=>'ESPECIAL','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],//Especialização PRF
    ['area'=>'7e6a3c15-9b30-4517-89ff-af49319b95fe','nome'=>'Fitotecnia','titulo'=>'ESPECIAL','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],//Especialização PRF
    ['area'=>'7e6a3c15-9b30-4517-89ff-af49319b95fe','nome'=>'MBA em Agronegócio','titulo'=>'ESPECIAL','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],//MBA
   
     /* Ciências Sociais Aplicadas */
    ['area'=>'b3617c88-2807-4835-b0ed-cce973bde4d2','nome'=>'Direito','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'b3617c88-2807-4835-b0ed-cce973bde4d2','nome'=>'Administração','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'b3617c88-2807-4835-b0ed-cce973bde4d2','nome'=>'Economia','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'b3617c88-2807-4835-b0ed-cce973bde4d2','nome'=>'Arquitetura E Urbanismo','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'b3617c88-2807-4835-b0ed-cce973bde4d2','nome'=>'Ciência Da Informação','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'b3617c88-2807-4835-b0ed-cce973bde4d2','nome'=>'Ciências Contábeis','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'b3617c88-2807-4835-b0ed-cce973bde4d2','nome'=>'Biblioteconomia','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'b3617c88-2807-4835-b0ed-cce973bde4d2','nome'=>'Comunicação','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'b3617c88-2807-4835-b0ed-cce973bde4d2','nome'=>'Serviço Social','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'b3617c88-2807-4835-b0ed-cce973bde4d2','nome'=>'Turismo','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'b3617c88-2807-4835-b0ed-cce973bde4d2','nome'=>'Hotelaria','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'b3617c88-2807-4835-b0ed-cce973bde4d2','nome'=>'Relações Internacionais','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'b3617c88-2807-4835-b0ed-cce973bde4d2','nome'=>'Direito Digital','titulo'=>'ESPECIAL','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],//Especialização
    ['area'=>'b3617c88-2807-4835-b0ed-cce973bde4d2','nome'=>'Finanças','titulo'=>'ESPECIAL','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],//Especialização
    ['area'=>'b3617c88-2807-4835-b0ed-cce973bde4d2','nome'=>'Administração Pública','titulo'=>'ESPECIAL','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],//Especialização
    ['area'=>'b3617c88-2807-4835-b0ed-cce973bde4d2','nome'=>'Gestão Pública','titulo'=>'ESPECIAL','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],//Especialização
    ['area'=>'b3617c88-2807-4835-b0ed-cce973bde4d2','nome'=>'Administração e Logística','titulo'=>'ESPECIAL','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],//Especialização PRF
    ['area'=>'b3617c88-2807-4835-b0ed-cce973bde4d2','nome'=>'MBA em Administração Estratégica','titulo'=>'ESPECIAL','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],//MBA
   
     /* Linguistica Letras e Artes */
    ['area'=>'5bd2464b-6722-4f7f-afa3-bf70d33d46f5','nome'=>'Linguística','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'5bd2464b-6722-4f7f-afa3-bf70d33d46f5','nome'=>'Letras','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'5bd2464b-6722-4f7f-afa3-bf70d33d46f5','nome'=>'Artes','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'5bd2464b-6722-4f7f-afa3-bf70d33d46f5','nome'=>'Música','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'5bd2464b-6722-4f7f-afa3-bf70d33d46f5','nome'=>'Dança','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'5bd2464b-6722-4f7f-afa3-bf70d33d46f5','nome'=>'Teatro','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'5bd2464b-6722-4f7f-afa3-bf70d33d46f5','nome'=>'Cinema','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'5bd2464b-6722-4f7f-afa3-bf70d33d46f5','nome'=>'Fotografia','titulo'=>'GRAD_BAC','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],
    ['area'=>'5bd2464b-6722-4f7f-afa3-bf70d33d46f5','nome'=>'Linguagem','titulo'=>'ESPECIAL','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],//Especialização
    ['area'=>'5bd2464b-6722-4f7f-afa3-bf70d33d46f5','nome'=>'Liguistica','titulo'=>'ESPECIAL','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],//Especialização
    ['area'=>'5bd2464b-6722-4f7f-afa3-bf70d33d46f5','nome'=>'MBA em Lingua Portuguesa e Linguistica','titulo'=>'ESPECIAL','tipo'=>'fa5e96e5-a1ce-4f2d-b4b3-acd504fa8c9b'],//MBA

    /*Intitucional Operacional*/
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso Avançado em Gestão Operacional','titulo'=>'INSTITUCIONAL','tipo'=>'8b20225c-6333-442c-a175-32806000c89e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Operações Temáticas de Combate ao Crime','titulo'=>'INSTITUCIONAL','tipo'=>'8b20225c-6333-442c-a175-32806000c89e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Combate às Infrações de Menor Potencial Ofensivo','titulo'=>'INSTITUCIONAL','tipo'=>'8b20225c-6333-442c-a175-32806000c89e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Instrução em Cursos de Altos Estudos Policiais','titulo'=>'INSTITUCIONAL','tipo'=>'8b20225c-6333-442c-a175-32806000c89e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Operações Especiais','titulo'=>'INSTITUCIONAL','tipo'=>'8b20225c-6333-442c-a175-32806000c89e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Operações Policiais - Brasil','titulo'=>'INSTITUCIONAL','tipo'=>'8b20225c-6333-442c-a175-32806000c89e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Operações Policiais em Fronteira','titulo'=>'INSTITUCIONAL','tipo'=>'8b20225c-6333-442c-a175-32806000c89e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Operações Policiais na Caatinga','titulo'=>'INSTITUCIONAL','tipo'=>'8b20225c-6333-442c-a175-32806000c89e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Operações Policiais na Amazônia','titulo'=>'INSTITUCIONAL','tipo'=>'8b20225c-6333-442c-a175-32806000c89e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Operações Policiais em Áreas Urbanas','titulo'=>'INSTITUCIONAL','tipo'=>'8b20225c-6333-442c-a175-32806000c89e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Operações Policiais com Motocicletas','titulo'=>'INSTITUCIONAL','tipo'=>'8b20225c-6333-442c-a175-32806000c89e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Formação de Motociclista Policial','titulo'=>'INSTITUCIONAL','tipo'=>'8b20225c-6333-442c-a175-32806000c89e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Cinotecnia Policial','titulo'=>'INSTITUCIONAL','tipo'=>'8b20225c-6333-442c-a175-32806000c89e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Preparação de Cães Policiais','titulo'=>'INSTITUCIONAL','tipo'=>'8b20225c-6333-442c-a175-32806000c89e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Operador de Controle de Distúrbios','titulo'=>'INSTITUCIONAL','tipo'=>'8b20225c-6333-442c-a175-32806000c89e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Atirador de Precisão','titulo'=>'INSTITUCIONAL','tipo'=>'8b20225c-6333-442c-a175-32806000c89e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Piloto Privado de Aeronave de Asa Fixa','titulo'=>'INSTITUCIONAL','tipo'=>'8b20225c-6333-442c-a175-32806000c89e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Piloto Privado de Aeronave de Asa Rotativa','titulo'=>'INSTITUCIONAL','tipo'=>'8b20225c-6333-442c-a175-32806000c89e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Piloto Comercial de Aeronave de Asa Fixa','titulo'=>'INSTITUCIONAL','tipo'=>'8b20225c-6333-442c-a175-32806000c89e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Piloto Comercial de Aeronave de Asa Rotativa','titulo'=>'INSTITUCIONAL','tipo'=>'8b20225c-6333-442c-a175-32806000c89e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Piloto Policial de Aeronave de Asa Fixa','titulo'=>'INSTITUCIONAL','tipo'=>'8b20225c-6333-442c-a175-32806000c89e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Piloto Policial de Aeronave de Asa Rotativa','titulo'=>'INSTITUCIONAL','tipo'=>'8b20225c-6333-442c-a175-32806000c89e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Comandante de Aeronave de Asa Fixa','titulo'=>'INSTITUCIONAL','tipo'=>'8b20225c-6333-442c-a175-32806000c89e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Comandante de Aeronave de Asa Rotativa','titulo'=>'INSTITUCIONAL','tipo'=>'8b20225c-6333-442c-a175-32806000c89e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Operador de Sistemas de Aeronaves NãoTripuladas','titulo'=>'INSTITUCIONAL','tipo'=>'8b20225c-6333-442c-a175-32806000c89e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Operador Aerotático','titulo'=>'INSTITUCIONAL','tipo'=>'8b20225c-6333-442c-a175-32806000c89e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Gestor de Operações Aéreas','titulo'=>'INSTITUCIONAL','tipo'=>'8b20225c-6333-442c-a175-32806000c89e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Fiscalização de Trânsito','titulo'=>'INSTITUCIONAL','tipo'=>'8b20225c-6333-442c-a175-32806000c89e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso Avançado de Fiscalização de Trânsito','titulo'=>'INSTITUCIONAL','tipo'=>'8b20225c-6333-442c-a175-32806000c89e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Fiscalização de Transportes','titulo'=>'INSTITUCIONAL','tipo'=>'8b20225c-6333-442c-a175-32806000c89e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso Avançado de Fiscalização de Transportes','titulo'=>'INSTITUCIONAL','tipo'=>'8b20225c-6333-442c-a175-32806000c89e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Engenharia Rodoviária','titulo'=>'INSTITUCIONAL','tipo'=>'8b20225c-6333-442c-a175-32806000c89e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso Avançado de Engenharia Rodoviária','titulo'=>'INSTITUCIONAL','tipo'=>'8b20225c-6333-442c-a175-32806000c89e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso para Condutores de Veículos de Emergência','titulo'=>'INSTITUCIONAL','tipo'=>'8b20225c-6333-442c-a175-32806000c89e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso Avançado de Perícia em Acidentes de Trânsito','titulo'=>'INSTITUCIONAL','tipo'=>'8b20225c-6333-442c-a175-32806000c89e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Atendimento Pré-hospitalar','titulo'=>'INSTITUCIONAL','tipo'=>'8b20225c-6333-442c-a175-32806000c89e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Gestão em Educação para o Trânsito','titulo'=>'INSTITUCIONAL','tipo'=>'8b20225c-6333-442c-a175-32806000c89e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Gestores de Pátio','titulo'=>'INSTITUCIONAL','tipo'=>'8b20225c-6333-442c-a175-32806000c89e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Comando e Controle','titulo'=>'INSTITUCIONAL','tipo'=>'8b20225c-6333-442c-a175-32806000c89e'],
   
    /*Intitucional Gestão de Pessoas*/
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso Avançado em Gestão de Pessoas','titulo'=>'INSTITUCIONAL','tipo'=>'56acc8a1-4c43-4616-bc79-25a381998f3f'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Operador em Saúde','titulo'=>'INSTITUCIONAL','tipo'=>'56acc8a1-4c43-4616-bc79-25a381998f3f'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Logística de Pessoal','titulo'=>'INSTITUCIONAL','tipo'=>'56acc8a1-4c43-4616-bc79-25a381998f3f'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Administração e Gestão Processual de Pessoal','titulo'=>'INSTITUCIONAL','tipo'=>'56acc8a1-4c43-4616-bc79-25a381998f3f'],
    
    /*Intitucional TI e Comunicação*/
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso Avançado em Gestão de Tecnologia da Informação e Comunicação','titulo'=>'INSTITUCIONAL','tipo'=>'3d89d056-d97c-4ad7-bc96-ffd90c43622e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Segurança Cibernética','titulo'=>'INSTITUCIONAL','tipo'=>'3d89d056-d97c-4ad7-bc96-ffd90c43622e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Ciência de Dados e Inteligência Artificial','titulo'=>'INSTITUCIONAL','tipo'=>'3d89d056-d97c-4ad7-bc96-ffd90c43622e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Gestão em Infraestrutura de TI','titulo'=>'INSTITUCIONAL','tipo'=>'3d89d056-d97c-4ad7-bc96-ffd90c43622e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Desenvolvimento de Sistemas','titulo'=>'INSTITUCIONAL','tipo'=>'3d89d056-d97c-4ad7-bc96-ffd90c43622e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Teatro','titulo'=>'INSTITUCIONAL','tipo'=>'3d89d056-d97c-4ad7-bc96-ffd90c43622e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Cinema','titulo'=>'INSTITUCIONAL','tipo'=>'3d89d056-d97c-4ad7-bc96-ffd90c43622e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Fotografia','titulo'=>'INSTITUCIONAL','tipo'=>'3d89d056-d97c-4ad7-bc96-ffd90c43622e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Linguagem','titulo'=>'INSTITUCIONAL','tipo'=>'3d89d056-d97c-4ad7-bc96-ffd90c43622e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Liguistica','titulo'=>'INSTITUCIONAL','tipo'=>'3d89d056-d97c-4ad7-bc96-ffd90c43622e'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'MBA em Lingua Portuguesa e Linguistica','titulo'=>'INSTITUCIONAL','tipo'=>'3d89d056-d97c-4ad7-bc96-ffd90c43622e'],
    
    /*Intitucional Inteligência*/
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso Avançado em Gestão de Inteligência','titulo'=>'INSTITUCIONAL','tipo'=>'22157499-3eb9-452a-8b78-4dcd3e1f0076'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Procedimentos de Inteligência','titulo'=>'INSTITUCIONAL','tipo'=>'22157499-3eb9-452a-8b78-4dcd3e1f0076'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Produção de Conhecimento','titulo'=>'INSTITUCIONAL','tipo'=>'22157499-3eb9-452a-8b78-4dcd3e1f0076'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Contrainteligência','titulo'=>'INSTITUCIONAL','tipo'=>'22157499-3eb9-452a-8b78-4dcd3e1f0076'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Operações de Inteligência','titulo'=>'INSTITUCIONAL','tipo'=>'22157499-3eb9-452a-8b78-4dcd3e1f0076'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Busca em Fontes Abertas','titulo'=>'INSTITUCIONAL','tipo'=>'22157499-3eb9-452a-8b78-4dcd3e1f0076'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso Operacional de Entrevista e Recrutamento','titulo'=>'INSTITUCIONAL','tipo'=>'22157499-3eb9-452a-8b78-4dcd3e1f0076'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Análise em Sistemas Especiais','titulo'=>'INSTITUCIONAL','tipo'=>'22157499-3eb9-452a-8b78-4dcd3e1f0076'],
   
    /*Intitucional Corregedoria*/
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso Avançado em Gestão Correcional','titulo'=>'INSTITUCIONAL','tipo'=>'4505cc21-0060-4b91-93c3-6a28be71d41d'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Operações em Assuntos Internos','titulo'=>'INSTITUCIONAL','tipo'=>'4505cc21-0060-4b91-93c3-6a28be71d41d'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Instrução Preliminar e Análise Processual','titulo'=>'INSTITUCIONAL','tipo'=>'4505cc21-0060-4b91-93c3-6a28be71d41d'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Processo Administrativo Disciplinar','titulo'=>'INSTITUCIONAL','tipo'=>'4505cc21-0060-4b91-93c3-6a28be71d41d'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Introdução à Atividade de Corregedoria','titulo'=>'INSTITUCIONAL','tipo'=>'4505cc21-0060-4b91-93c3-6a28be71d41d'],
    
    /*Intitucional Administração e Logistica*/
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso Avançado em Gestão de Administração','titulo'=>'INSTITUCIONAL','tipo'=>'7d3273ee-f796-4e67-9a61-784e3b82ee7b'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'LetCurso de Gestão Orçamentária e Financeira e Contabilidaderas','titulo'=>'INSTITUCIONAL','tipo'=>'7d3273ee-f796-4e67-9a61-784e3b82ee7b'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'ACurso de Gestão Patrimonial de Bens Móveis e Imóveis e Suprimento de Fundosrtes','titulo'=>'INSTITUCIONAL','tipo'=>'7d3273ee-f796-4e67-9a61-784e3b82ee7b'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Gestão de Frota','titulo'=>'INSTITUCIONAL','tipo'=>'7d3273ee-f796-4e67-9a61-784e3b82ee7b'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Gestão de Materiais e Mobilização','titulo'=>'INSTITUCIONAL','tipo'=>'7d3273ee-f796-4e67-9a61-784e3b82ee7b'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Gestão em Licitações','titulo'=>'INSTITUCIONAL','tipo'=>'7d3273ee-f796-4e67-9a61-784e3b82ee7b'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso para Conformidade de Registro de Gestão','titulo'=>'INSTITUCIONAL','tipo'=>'7d3273ee-f796-4e67-9a61-784e3b82ee7b'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso em Gestão de Concessão de Diárias e Passagens - SCDP','titulo'=>'INSTITUCIONAL','tipo'=>'7d3273ee-f796-4e67-9a61-784e3b82ee7b'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Armeiro','titulo'=>'INSTITUCIONAL','tipo'=>'7d3273ee-f796-4e67-9a61-784e3b82ee7b'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Gestão em Obras Públicas da PRF','titulo'=>'INSTITUCIONAL','tipo'=>'7d3273ee-f796-4e67-9a61-784e3b82ee7b'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Gestão de Documentos','titulo'=>'INSTITUCIONAL','tipo'=>'7d3273ee-f796-4e67-9a61-784e3b82ee7b'],

    /*Intitucional Executiva*/
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso Avançado em Gestão Executiva','titulo'=>'INSTITUCIONAL','tipo'=>'668d3fba-91f7-4f4d-a34e-b14b2b377421','tipo'=>'668d3fba-91f7-4f4d-a34e-b14b2b377421'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Análise Técnica','titulo'=>'INSTITUCIONAL','tipo'=>'668d3fba-91f7-4f4d-a34e-b14b2b377421'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Controle Interno e Gestão de Riscos','titulo'=>'INSTITUCIONAL','tipo'=>'668d3fba-91f7-4f4d-a34e-b14b2b377421'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Comunicação Social e Institucional','titulo'=>'INSTITUCIONAL','tipo'=>'668d3fba-91f7-4f4d-a34e-b14b2b377421'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Gestão Estratégica Institucional','titulo'=>'INSTITUCIONAL','tipo'=>'668d3fba-91f7-4f4d-a34e-b14b2b377421'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Articulação Institucional','titulo'=>'INSTITUCIONAL','tipo'=>'668d3fba-91f7-4f4d-a34e-b14b2b377421'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Formação de Instrutores','titulo'=>'INSTITUCIONAL','tipo'=>'668d3fba-91f7-4f4d-a34e-b14b2b377421'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Formação de Docentes','titulo'=>'INSTITUCIONAL','tipo'=>'668d3fba-91f7-4f4d-a34e-b14b2b377421'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Segurança de Autoridades','titulo'=>'INSTITUCIONAL','tipo'=>'668d3fba-91f7-4f4d-a34e-b14b2b377421'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Cerimonial e Organização de Evento','titulo'=>'INSTITUCIONAL','tipo'=>'668d3fba-91f7-4f4d-a34e-b14b2b377421'],
    ['area'=>'b5cc2c7d-e50a-4212-acf9-d87e1f5a7f69','nome'=>'Curso de Oratória e Comportamento de Executivos Públicos','titulo'=>'INSTITUCIONAL','tipo'=>'668d3fba-91f7-4f4d-a34e-b14b2b377421'],
    ];
    
        foreach($array_cursos as $curso){
            $cursoI = new Curso();
            $cursoI->fill([
                //'id' => uuid(),
                'nome'=> $curso['nome'],
                'titulo'=> $curso['titulo'],
                'area_curso_id'=> $curso['area'],
                'tipo_curso_id'=>$curso['tipo']
    
            ]);
            $cursoI->save();
            
        }
    }
}

