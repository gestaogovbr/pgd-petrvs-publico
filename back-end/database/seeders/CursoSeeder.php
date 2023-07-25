<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Curso;
use App\Models\TipoCurso;
use App\Models\AreaConhecimento;

class CursoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       $cursos =  [  
            /* Ciências exatas e da terra */
            ['area'=>'Ciências Exatas e da Terra','nome'=>'Matemática','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Exatas e da Terra','nome'=>'Estatística','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Exatas e da Terra','nome'=>'Ciência Da Computação','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Exatas e da Terra','nome'=>'Astronomia','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Exatas e da Terra','nome'=>'Física','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Exatas e da Terra','nome'=>'Química','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Exatas e da Terra','nome'=>'Geociências','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Exatas e da Terra','nome'=>'Tecnologia da Informação e Comunicação','titulo'=>'ESPECIAL','tipo'=>'Acadêmico'],//Especialização PRF
            ['area'=>'Ciências Exatas e da Terra','nome'=>'Full Stack Developer','titulo'=>'ESPECIAL','tipo'=>'Acadêmico'],//Especialização
            ['area'=>'Ciências Exatas e da Terra','nome'=>'MBA em Engenharia de Software','titulo'=>'ESPECIAL','tipo'=>'Acadêmico'],//MBA
            /* Ciências Biologicas */
            ['area'=>'Ciências Biológicas','nome'=>'Biologia','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Biológicas','nome'=>'Bioquímica','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Biológicas','nome'=>'Biofísica','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Biológicas','nome'=>'Genética','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Biológicas','nome'=>'Farmacologia','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Biológicas','nome'=>'Botânica','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Biológicas','nome'=>'Zoologia','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Biológicas','nome'=>'Ecologia','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Biológicas','nome'=>'Fisiologia','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Biológicas','nome'=>'Imunologia','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Biológicas','nome'=>'Anatomia Humana','titulo'=>'ESPECIAL','tipo'=>'Acadêmico'],//Especialização
            ['area'=>'Ciências Biológicas','nome'=>'Citologia','titulo'=>'ESPECIAL','tipo'=>'Acadêmico'],//Especialização
            /* Engenharias */
            ['area'=>'Engenharias','nome'=>'Civil','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Engenharias','nome'=>'Elétrica','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Engenharias','nome'=>'Mecânica','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Engenharias','nome'=>'Química','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Engenharias','nome'=>'Sanitária','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Engenharias','nome'=>'de produção','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Engenharias','nome'=>'Metalúrgica','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Engenharias','nome'=>'Nuclear','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Engenharias','nome'=>'de transportes','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Engenharias','nome'=>'Naval','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Engenharias','nome'=>'Aeroespacial','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Engenharias','nome'=>'Perícias de Engenharia','titulo'=>'ESPECIAL','tipo'=>'Acadêmico'],//Especialização
            ['area'=>'Engenharias','nome'=>'Segurança do Trabalho','titulo'=>'ESPECIAL','tipo'=>'Acadêmico'],//Especialização
            ['area'=>'Engenharias','nome'=>'MBA em Gestão para Engenharias','titulo'=>'ESPECIAL','tipo'=>'Acadêmico'],//MBA
            /* Ciências da Saúde */
            ['area'=>'Ciências da Saúde','nome'=>'Medicina','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências da Saúde','nome'=>'Enfermagem','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências da Saúde','nome'=>'Farmácia','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências da Saúde','nome'=>'Odontologia','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências da Saúde','nome'=>'Nutrição','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências da Saúde','nome'=>'Fonoaudiologia','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências da Saúde','nome'=>'Fisioterapia','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências da Saúde','nome'=>'Terapia Ocupacional','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências da Saúde','nome'=>'Educação Física','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências da Saúde','nome'=>'Biomedicina','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências da Saúde','nome'=>'Bio Medicina Estética','titulo'=>'ESPECIAL','tipo'=>'Acadêmico'],//Especialização
            ['area'=>'Ciências da Saúde','nome'=>'Nutrição Clinica e Hospitalar','titulo'=>'ESPECIAL','tipo'=>'Acadêmico'],//Especialização
            ['area'=>'Ciências da Saúde','nome'=>'MBA em Gestão de Saúde','titulo'=>'ESPECIAL','tipo'=>'Acadêmico'],//MBA
            ['area'=>'Ciências da Saúde','nome'=>'MBA em Serviços de Saúde','titulo'=>'ESPECIAL','tipo'=>'Acadêmico'],//MBA
            /* Ciências Humanas */
            ['area'=>'Ciências Humanas','nome'=>'Filosofia','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Humanas','nome'=>'Sociologia','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Humanas','nome'=>'Antropologia','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Humanas','nome'=>'Arqueologia','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Humanas','nome'=>'História','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Humanas','nome'=>'Geografia','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Humanas','nome'=>'Psicologia','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Humanas','nome'=>'Educação','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Humanas','nome'=>'Ciência Política','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Humanas','nome'=>'Teologia','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Humanas','nome'=>'Gestão de Pessoas','titulo'=>'ESPECIAL','tipo'=>'Acadêmico'],//Especialização
            ['area'=>'Ciências Humanas','nome'=>'MBA em Gestão Empresarial','titulo'=>'ESPECIAL','tipo'=>'Acadêmico'],//MBA
            ['area'=>'Ciências Humanas','nome'=>'MBA em Gestão de Projetos','titulo'=>'ESPECIAL','tipo'=>'Acadêmico'],//MBA
            ['area'=>'Ciências Humanas','nome'=>'MBA Gestão Estratégica de Pessoas','titulo'=>'ESPECIAL','tipo'=>'Acadêmico'],//MBA
            ['area'=>'Ciências Humanas','nome'=>'Gestão Operacional','titulo'=>'ESPECIAL','tipo'=>'Acadêmico'],//Especialização PRF
            ['area'=>'Ciências Humanas','nome'=>'Inteligência','titulo'=>'ESPECIAL','tipo'=>'Acadêmico'],//Especialização PRF
            ['area'=>'Ciências Humanas','nome'=>'Corregedoria','titulo'=>'ESPECIAL','tipo'=>'Acadêmico'],//Especialização
            ['area'=>'Ciências Humanas','nome'=>'Gestão Executiva','titulo'=>'ESPECIAL','tipo'=>'Acadêmico'],//Especialização PRF
            /* Ciências Agrárias */
            ['area'=>'Ciências Agrárias','nome'=>'Agronomia','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Agrárias','nome'=>'Recursos Florestais (Incluindo Engenharia Florestal)','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Agrárias','nome'=>'Engenharia Agrícola','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Agrárias','nome'=>'Zootecnia','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Agrárias','nome'=>'Medicina Veterinária','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Agrárias','nome'=>'Recursos Pesqueiros','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Agrárias','nome'=>'Engenharia De Pesca E De Alimentos','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Agrárias','nome'=>'Citicultura','titulo'=>'ESPECIAL','tipo'=>'Acadêmico'],//Especialização PRF
            ['area'=>'Ciências Agrárias','nome'=>'Fitotecnia','titulo'=>'ESPECIAL','tipo'=>'Acadêmico'],//Especialização PRF
            ['area'=>'Ciências Agrárias','nome'=>'MBA em Agronegócio','titulo'=>'ESPECIAL','tipo'=>'Acadêmico'],//MBA
            /* Ciências Sociais Aplicadas */
            ['area'=>'Ciências Sociais Aplicadas','nome'=>'Direito','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Sociais Aplicadas','nome'=>'Administração','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Sociais Aplicadas','nome'=>'Economia','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Sociais Aplicadas','nome'=>'Arquitetura E Urbanismo','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Sociais Aplicadas','nome'=>'Ciência Da Informação','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Sociais Aplicadas','nome'=>'Ciências Contábeis','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Sociais Aplicadas','nome'=>'Biblioteconomia','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Sociais Aplicadas','nome'=>'Comunicação','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Sociais Aplicadas','nome'=>'Serviço Social','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Sociais Aplicadas','nome'=>'Turismo','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Sociais Aplicadas','nome'=>'Hotelaria','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Sociais Aplicadas','nome'=>'Relações Internacionais','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Ciências Sociais Aplicadas','nome'=>'Direito Digital','titulo'=>'ESPECIAL','tipo'=>'Acadêmico'],//Especialização
            ['area'=>'Ciências Sociais Aplicadas','nome'=>'Finanças','titulo'=>'ESPECIAL','tipo'=>'Acadêmico'],//Especialização
            ['area'=>'Ciências Sociais Aplicadas','nome'=>'Administração Pública','titulo'=>'ESPECIAL','tipo'=>'Acadêmico'],//Especialização
            ['area'=>'Ciências Sociais Aplicadas','nome'=>'Gestão Pública','titulo'=>'ESPECIAL','tipo'=>'Acadêmico'],//Especialização
            ['area'=>'Ciências Sociais Aplicadas','nome'=>'Administração e Logística','titulo'=>'ESPECIAL','tipo'=>'Acadêmico'],//Especialização PRF
            ['area'=>'Ciências Sociais Aplicadas','nome'=>'MBA em Administração Estratégica','titulo'=>'ESPECIAL','tipo'=>'Acadêmico'],//MBA
            /* Linguistica, Letras e Artes */
            ['area'=>'Linguistica, Letras e Artes','nome'=>'Linguística','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Linguistica, Letras e Artes','nome'=>'Letras','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Linguistica, Letras e Artes','nome'=>'Artes','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Linguistica, Letras e Artes','nome'=>'Música','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Linguistica, Letras e Artes','nome'=>'Dança','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Linguistica, Letras e Artes','nome'=>'Teatro','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Linguistica, Letras e Artes','nome'=>'Cinema','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Linguistica, Letras e Artes','nome'=>'Fotografia','titulo'=>'GRAD_BAC','tipo'=>'Acadêmico'],
            ['area'=>'Linguistica, Letras e Artes','nome'=>'Linguagem','titulo'=>'ESPECIAL','tipo'=>'Acadêmico'],//Especialização
            ['area'=>'Linguistica, Letras e Artes','nome'=>'Liguistica','titulo'=>'ESPECIAL','tipo'=>'Acadêmico'],//Especialização
            ['area'=>'Linguistica, Letras e Artes','nome'=>'MBA em Lingua Portuguesa e Linguistica','titulo'=>'ESPECIAL','tipo'=>'Acadêmico'],//MBA
            /*Intitucional Operacional*/
            ['area'=>'Institucional','nome'=>'Curso Avançado em Gestão Operacional','titulo'=>'INSTITUCIONAL','tipo'=>'Operacional'],
            ['area'=>'Institucional','nome'=>'Curso de Operações Temáticas de Combate ao Crime','titulo'=>'INSTITUCIONAL','tipo'=>'Operacional'],
            ['area'=>'Institucional','nome'=>'Curso de Combate às Infrações de Menor Potencial Ofensivo','titulo'=>'INSTITUCIONAL','tipo'=>'Operacional'],
            ['area'=>'Institucional','nome'=>'Curso de Instrução em Cursos de Altos Estudos Policiais','titulo'=>'INSTITUCIONAL','tipo'=>'Operacional'],
            ['area'=>'Institucional','nome'=>'Curso de Operações Especiais','titulo'=>'INSTITUCIONAL','tipo'=>'Operacional'],
            ['area'=>'Institucional','nome'=>'Curso de Operações Policiais - Brasil','titulo'=>'INSTITUCIONAL','tipo'=>'Operacional'],
            ['area'=>'Institucional','nome'=>'Curso de Operações Policiais em Fronteira','titulo'=>'INSTITUCIONAL','tipo'=>'Operacional'],
            ['area'=>'Institucional','nome'=>'Curso de Operações Policiais na Caatinga','titulo'=>'INSTITUCIONAL','tipo'=>'Operacional'],
            ['area'=>'Institucional','nome'=>'Curso de Operações Policiais na Amazônia','titulo'=>'INSTITUCIONAL','tipo'=>'Operacional'],
            ['area'=>'Institucional','nome'=>'Curso de Operações Policiais em Áreas Urbanas','titulo'=>'INSTITUCIONAL','tipo'=>'Operacional'],
            ['area'=>'Institucional','nome'=>'Curso de Operações Policiais com Motocicletas','titulo'=>'INSTITUCIONAL','tipo'=>'Operacional'],
            ['area'=>'Institucional','nome'=>'Curso de Formação de Motociclista Policial','titulo'=>'INSTITUCIONAL','tipo'=>'Operacional'],
            ['area'=>'Institucional','nome'=>'Curso de Cinotecnia Policial','titulo'=>'INSTITUCIONAL','tipo'=>'Operacional'],
            ['area'=>'Institucional','nome'=>'Curso de Preparação de Cães Policiais','titulo'=>'INSTITUCIONAL','tipo'=>'Operacional'],
            ['area'=>'Institucional','nome'=>'Curso de Operador de Controle de Distúrbios','titulo'=>'INSTITUCIONAL','tipo'=>'Operacional'],
            ['area'=>'Institucional','nome'=>'Curso de Atirador de Precisão','titulo'=>'INSTITUCIONAL','tipo'=>'Operacional'],
            ['area'=>'Institucional','nome'=>'Curso de Piloto Privado de Aeronave de Asa Fixa','titulo'=>'INSTITUCIONAL','tipo'=>'Operacional'],
            ['area'=>'Institucional','nome'=>'Curso de Piloto Privado de Aeronave de Asa Rotativa','titulo'=>'INSTITUCIONAL','tipo'=>'Operacional'],
            ['area'=>'Institucional','nome'=>'Curso de Piloto Comercial de Aeronave de Asa Fixa','titulo'=>'INSTITUCIONAL','tipo'=>'Operacional'],
            ['area'=>'Institucional','nome'=>'Curso de Piloto Comercial de Aeronave de Asa Rotativa','titulo'=>'INSTITUCIONAL','tipo'=>'Operacional'],
            ['area'=>'Institucional','nome'=>'Curso de Piloto Policial de Aeronave de Asa Fixa','titulo'=>'INSTITUCIONAL','tipo'=>'Operacional'],
            ['area'=>'Institucional','nome'=>'Curso de Piloto Policial de Aeronave de Asa Rotativa','titulo'=>'INSTITUCIONAL','tipo'=>'Operacional'],
            ['area'=>'Institucional','nome'=>'Curso de Comandante de Aeronave de Asa Fixa','titulo'=>'INSTITUCIONAL','tipo'=>'Operacional'],
            ['area'=>'Institucional','nome'=>'Curso de Comandante de Aeronave de Asa Rotativa','titulo'=>'INSTITUCIONAL','tipo'=>'Operacional'],
            ['area'=>'Institucional','nome'=>'Curso de Operador de Sistemas de Aeronaves NãoTripuladas','titulo'=>'INSTITUCIONAL','tipo'=>'Operacional'],
            ['area'=>'Institucional','nome'=>'Curso de Operador Aerotático','titulo'=>'INSTITUCIONAL','tipo'=>'Operacional'],
            ['area'=>'Institucional','nome'=>'Curso de Gestor de Operações Aéreas','titulo'=>'INSTITUCIONAL','tipo'=>'Operacional'],
            ['area'=>'Institucional','nome'=>'Curso de Fiscalização de Trânsito','titulo'=>'INSTITUCIONAL','tipo'=>'Operacional'],
            ['area'=>'Institucional','nome'=>'Curso Avançado de Fiscalização de Trânsito','titulo'=>'INSTITUCIONAL','tipo'=>'Operacional'],
            ['area'=>'Institucional','nome'=>'Curso de Fiscalização de Transportes','titulo'=>'INSTITUCIONAL','tipo'=>'Operacional'],
            ['area'=>'Institucional','nome'=>'Curso Avançado de Fiscalização de Transportes','titulo'=>'INSTITUCIONAL','tipo'=>'Operacional'],
            ['area'=>'Institucional','nome'=>'Curso de Engenharia Rodoviária','titulo'=>'INSTITUCIONAL','tipo'=>'Operacional'],
            ['area'=>'Institucional','nome'=>'Curso Avançado de Engenharia Rodoviária','titulo'=>'INSTITUCIONAL','tipo'=>'Operacional'],
            ['area'=>'Institucional','nome'=>'Curso para Condutores de Veículos de Emergência','titulo'=>'INSTITUCIONAL','tipo'=>'Operacional'],
            ['area'=>'Institucional','nome'=>'Curso Avançado de Perícia em Acidentes de Trânsito','titulo'=>'INSTITUCIONAL','tipo'=>'Operacional'],
            ['area'=>'Institucional','nome'=>'Curso de Atendimento Pré-hospitalar','titulo'=>'INSTITUCIONAL','tipo'=>'Operacional'],
            ['area'=>'Institucional','nome'=>'Curso de Gestão em Educação para o Trânsito','titulo'=>'INSTITUCIONAL','tipo'=>'Operacional'],
            ['area'=>'Institucional','nome'=>'Curso de Gestores de Pátio','titulo'=>'INSTITUCIONAL','tipo'=>'Operacional'],
            ['area'=>'Institucional','nome'=>'Curso de Comando e Controle','titulo'=>'INSTITUCIONAL','tipo'=>'Operacional'],
            /*Intitucional Gestão de Pessoas*/
            ['area'=>'Institucional','nome'=>'Curso Avançado em Gestão de Pessoas','titulo'=>'INSTITUCIONAL','tipo'=>'Gestão de Pessoas'],
            ['area'=>'Institucional','nome'=>'Curso de Operador em Saúde','titulo'=>'INSTITUCIONAL','tipo'=>'Gestão de Pessoas'],
            ['area'=>'Institucional','nome'=>'Curso de Logística de Pessoal','titulo'=>'INSTITUCIONAL','tipo'=>'Gestão de Pessoas'],
            ['area'=>'Institucional','nome'=>'Curso de Administração e Gestão Processual de Pessoal','titulo'=>'INSTITUCIONAL','tipo'=>'Gestão de Pessoas'],
            /*Intitucional TI e Comunicação*/
            ['area'=>'Institucional','nome'=>'Curso Avançado em Gestão de Tecnologia da Informação e Comunicação','titulo'=>'INSTITUCIONAL','tipo'=>'TI e Comunicação'],
            ['area'=>'Institucional','nome'=>'Curso de Segurança Cibernética','titulo'=>'INSTITUCIONAL','tipo'=>'TI e Comunicação'],
            ['area'=>'Institucional','nome'=>'Curso de Ciência de Dados e Inteligência Artificial','titulo'=>'INSTITUCIONAL','tipo'=>'TI e Comunicação'],
            ['area'=>'Institucional','nome'=>'Curso de Gestão em Infraestrutura de TI','titulo'=>'INSTITUCIONAL','tipo'=>'TI e Comunicação'],
            ['area'=>'Institucional','nome'=>'Curso de Desenvolvimento de Sistemas','titulo'=>'INSTITUCIONAL','tipo'=>'TI e Comunicação'],
            /*Intitucional Inteligência*/
            ['area'=>'Institucional','nome'=>'Curso Avançado em Gestão de Inteligência','titulo'=>'INSTITUCIONAL','tipo'=>'Inteligência'],
            ['area'=>'Institucional','nome'=>'Curso de Procedimentos de Inteligência','titulo'=>'INSTITUCIONAL','tipo'=>'Inteligência'],
            ['area'=>'Institucional','nome'=>'Curso de Produção de Conhecimento','titulo'=>'INSTITUCIONAL','tipo'=>'Inteligência'],
            ['area'=>'Institucional','nome'=>'Curso de Contrainteligência','titulo'=>'INSTITUCIONAL','tipo'=>'Inteligência'],
            ['area'=>'Institucional','nome'=>'Curso de Operações de Inteligência','titulo'=>'INSTITUCIONAL','tipo'=>'Inteligência'],
            ['area'=>'Institucional','nome'=>'Curso de Busca em Fontes Abertas','titulo'=>'INSTITUCIONAL','tipo'=>'Inteligência'],
            ['area'=>'Institucional','nome'=>'Curso Operacional de Entrevista e Recrutamento','titulo'=>'INSTITUCIONAL','tipo'=>'Inteligência'],
            ['area'=>'Institucional','nome'=>'Curso de Análise em Sistemas Especiais','titulo'=>'INSTITUCIONAL','tipo'=>'Inteligência'],
            /*Intitucional Corregedoria*/
            ['area'=>'Institucional','nome'=>'Curso Avançado em Gestão Correcional','titulo'=>'INSTITUCIONAL','tipo'=>'Corregedoria'],
            ['area'=>'Institucional','nome'=>'Curso de Operações em Assuntos Internos','titulo'=>'INSTITUCIONAL','tipo'=>'Corregedoria'],
            ['area'=>'Institucional','nome'=>'Curso de Instrução Preliminar e Análise Processual','titulo'=>'INSTITUCIONAL','tipo'=>'Corregedoria'],
            ['area'=>'Institucional','nome'=>'Curso de Processo Administrativo Disciplinar','titulo'=>'INSTITUCIONAL','tipo'=>'Corregedoria'],
            ['area'=>'Institucional','nome'=>'Curso de Introdução à Atividade de Corregedoria','titulo'=>'INSTITUCIONAL','tipo'=>'Corregedoria'],
            /*Intitucional Administração e Logistica*/
            ['area'=>'Institucional','nome'=>'Curso Avançado em Gestão de Administração','titulo'=>'INSTITUCIONAL','tipo'=>'Administração e Logística'],
            ['area'=>'Institucional','nome'=>'Curso de Gestão Orçamentária e Financeira e Contabilidaderas','titulo'=>'INSTITUCIONAL','tipo'=>'Administração e Logística'],
            ['area'=>'Institucional','nome'=>'Curso de Gestão Patrimonial de Bens Móveis e Imóveis e Suprimento de Fundosrtes','titulo'=>'INSTITUCIONAL','tipo'=>'Administração e Logística'],
            ['area'=>'Institucional','nome'=>'Curso de Gestão de Frota','titulo'=>'INSTITUCIONAL','tipo'=>'Administração e Logística'],
            ['area'=>'Institucional','nome'=>'Curso de Gestão de Materiais e Mobilização','titulo'=>'INSTITUCIONAL','tipo'=>'Administração e Logística'],
            ['area'=>'Institucional','nome'=>'Curso de Gestão em Licitações','titulo'=>'INSTITUCIONAL','tipo'=>'Administração e Logística'],
            ['area'=>'Institucional','nome'=>'Curso para Conformidade de Registro de Gestão','titulo'=>'INSTITUCIONAL','tipo'=>'Administração e Logística'],
            ['area'=>'Institucional','nome'=>'Curso em Gestão de Concessão de Diárias e Passagens - SCDP','titulo'=>'INSTITUCIONAL','tipo'=>'Administração e Logística'],
            ['area'=>'Institucional','nome'=>'Curso de Armeiro','titulo'=>'INSTITUCIONAL','tipo'=>'Administração e Logística'],
            ['area'=>'Institucional','nome'=>'Curso de Gestão em Obras Públicas da PRF','titulo'=>'INSTITUCIONAL','tipo'=>'Administração e Logística'],
            ['area'=>'Institucional','nome'=>'Curso de Gestão de Documentos','titulo'=>'INSTITUCIONAL','tipo'=>'Administração e Logística'],
            /*Intitucional Executiva*/
            ['area'=>'Institucional','nome'=>'Curso Avançado em Gestão Executiva','titulo'=>'INSTITUCIONAL','tipo'=>'Executiva'],
            ['area'=>'Institucional','nome'=>'Curso de Análise Técnica','titulo'=>'INSTITUCIONAL','tipo'=>'Executiva'],
            ['area'=>'Institucional','nome'=>'Curso de Controle Interno e Gestão de Riscos','titulo'=>'INSTITUCIONAL','tipo'=>'Executiva'],
            ['area'=>'Institucional','nome'=>'Curso de Comunicação Social e Institucional','titulo'=>'INSTITUCIONAL','tipo'=>'Executiva'],
            ['area'=>'Institucional','nome'=>'Curso de Gestão Estratégica Institucional','titulo'=>'INSTITUCIONAL','tipo'=>'Executiva'],
            ['area'=>'Institucional','nome'=>'Curso de Articulação Institucional','titulo'=>'INSTITUCIONAL','tipo'=>'Executiva'],
            ['area'=>'Institucional','nome'=>'Curso de Formação de Instrutores','titulo'=>'INSTITUCIONAL','tipo'=>'Executiva'],
            ['area'=>'Institucional','nome'=>'Curso de Formação de Docentes','titulo'=>'INSTITUCIONAL','tipo'=>'Executiva'],
            ['area'=>'Institucional','nome'=>'Curso de Segurança de Autoridades','titulo'=>'INSTITUCIONAL','tipo'=>'Executiva'],
            ['area'=>'Institucional','nome'=>'Curso de Cerimonial e Organização de Evento','titulo'=>'INSTITUCIONAL','tipo'=>'Executiva'],
            ['area'=>'Institucional','nome'=>'Curso de Oratória e Comportamento de Executivos Públicos','titulo'=>'INSTITUCIONAL','tipo'=>'Executiva'],
            /*Institucional Geral*/
            ['area'=>'Institucional','nome'=>'Curso Institucional','titulo'=>'INSTITUCIONAL','tipo'=>'Institucional'],
        ];
        foreach($cursos as $c){
            $curso = new Curso();
            $curso->fill([
                'nome'=> $c['nome'],
                'titulo'=> $c['titulo'],
                'area_id'=> AreaConhecimento::where('nome', $c['area'])->first()?->id,
                'tipo_curso_id'=> TipoCurso::where('nome',$c['tipo'])->first()?->id,
            ]);
            $curso->save();
        }
    }
}

