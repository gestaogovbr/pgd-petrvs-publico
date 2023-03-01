# Exemplo

```
Cadastro Entregas 
   Nome
   Indicador

Cadastro de Eixos Temáticos (Grupo de objetivos) 
   Nome

Planejamento Institucional
   Entidade 
   Unidade (Setor, opc)
   Objetivos
              Grupo-tematico Obj-estratégico-superior
      Ob1 ... -              -
      Ob2 ... -              -

Tipos de Processos
  Nome

Cadeia de Valor
   Entidade 
   Unidade (Setor, opc)
   Processos
                        Sequencia Path Pai
       Tipo_Proc1 ... - 
```  
```
Plano de Entregas
   Unidade (Setor)
   Planejamento_estrategico_id
   Cadeia_valor_id
   Entregas
            Inicio     Fim        Indicador (vem do cadastro entrega) Metal geral Realizado Objetivos* Processos*    Atividades*          Cliente      Hmg
      Ent1: 01/01/2022 -          Quantidade                          1000        200       Ob1, Ob1   Proc1, Proc2  Tip.Ativ1, Tip.Atv2  uOrg1, uOrg2 S
      Ent2: 01/01/2022 30/12/2022 %                                   100         70        Ob2                                                        S
      Ent3: 01/01/2022 30/12/2024 Qualitativo                         Excelente   Bom                                                                  S
      Ent4: 09/12/2022 30/12/2022 ...                                                                                                                  N
   Ponto de controle
      [01/01/2023][30/01/2023]:
          Responsável: Genisson
          Entregas:
                    Indicador (vem do cadastro entrega) Meta do Mês  Realizado  
          Ent1:     Quantidade                          100          90
          Ent3:     Qualitativo                         Satisfatório Ruim
      [01/02/2023][30/02/2023]:
          Responsável: Paiva
          Entregas:
                    Indicador (vem do cadastro entrega) Meta         Realizado
          Ent1:     Quantidade                          110          110
          Ent2:     %                                   70           70
          Ent3:     Qualitativo                         Excelente    Bom
* Deverá haver pelo menos 1
```  
```
Plano Trabalho: 
Unidade (Setor) - *TCR - Plano de entregas - Carga horária - [01/01/2023] - [30/06/2023]
    - Pontos de controle
      [01/01/2023][30/01/2023]:
         Entregas:
              			Planejado Realizado Atividade
            - Ent1: 10h       20h       0h
            - Ent2: 10h       0h        0h
            - Ent3: 10h       10h       0h
            - Ent4: 10h       10h       0h
            Nota: 8
         Eventos:
              Descição                        Tempo 
            - Deslocamento de X para local Y  16h
            - Reunião com ministério          30h
         Total horas realizadas: 40 
      [01/02/2023][30/02/2023]
         Entregas:
         			Planejado Realizado Atividade
            - Ent1: 10h       0h       0h
            - Ent2: 10h       0h       0h
            - Ent3: 10h       0h       0h
            - Ent4: 10h       5h       0h
            - Ent5: 0h        35h      0h
         Total horas realizadas: 40 
      [01/03/2023][30/03/2023]
         Entregas:
         			Planejado Realizado Atividade 
            - Ent1: 10h       20h      20h
            - Ent2: 10h       10h      10h
            - Ent3: 10h       0h       10h 
            - Ent4: 10h       10h      10h
         Total horas realizadas: 40 
      [01/04/2023][30/04/2023]
         Entregas:
         			Planejado Realizado Atividade
            - Ent1: 10h       10h      10h
            - Ent2: 10h       0h       0h
            - Ent3: 10h       0h       0h
            - Ent4: 10h       0h       0h
         Eventos:
              Descição                        Tempo 
            - Afastamento de Saúde            20h
         Total horas realizadas: 30 Saldo?
      [01/05/2023][30/05/2023]
         Entregas:
            - Ent1: 10h
            - Ent2: 10h
            - Ent3: 10h
            - Ent4: 20h
         Total horas realizadas: 50 Saldo?
      [30/06/2023]
      ...
      ...
```

# Vinculos

```
Demandas:
  [Plano de trabalho] -> [Plano de entrega] -> *[Entrega]
```

# Observações

- Criar vinculação, que servirá quando o servidor for cedido a outra unidade ou outro orgão. A demanda é criada na unidade do servidor, o qual ele tem plano de trabalho, e a outra unidade poderá visualizar. Caso uma unidade precise criar uma demanda para servidor de outra unidade, ele criará na unidade do servidor, e terá acesso a visualizar essa demanda (será adicionado automaticamente o vinculo)