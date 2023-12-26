import { Base } from './base.model';

export type Idioma = "ALEMAO" | "ARABE" | "ARGELINO" | "AZERI" | "BENGALI" | "CHINES" | "COREANO" | "EGIPCIO" | "ESPANHOL" | "FRANCES" | "INDI" | "HOLANDES" | "INDONESIO" | "INGLES" | "IORUBA" | "ITALIANO" | "JAPONES" | "JAVANES" | "MALAIO" | "MALAIOB" | "MARATA" | "PERSA" | "PUNJABI" | "ROMENO" | "RUSSO" | "SUAILI" | "TAILANDES" | "TAMIL" | "TELUGU" | "TURCO" | "UCRANIANO" | "URDU" | "VIETNAMITA";

export type NivelIdioma = "BASICO" | "INTERMEDIARIO" | "AVANCADO" | "FLUENTE";

export class CurriculumIdioma extends Base {

    public idioma: Idioma = 'INGLES';
    public idiomaFala: NivelIdioma = 'BASICO';
    public idiomaEscrita: NivelIdioma = 'BASICO';
    public idiomaEntendimento: NivelIdioma = 'BASICO';  

    public constructor(data?: any) { super(); this.initialization(data); }
}
