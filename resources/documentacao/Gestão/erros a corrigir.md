# Unidades-Integrantes

- ao excluir um usuário-integrante e ele for lotado, as demais atribuições são extintas, mas a de lotado permanece. É necessário enviar uma mensagem para o usuário informando que a lotação não pode ser apagada, apenas transferida para outra unidade.

- ao excluir um usuário-integrante, o grid não é atualizado automaticamente.

- os dois erros acima ocorrem também em unidade-integrante.

- ao incluir um novo integrante, o select de usuario/unidade não deve mostrar os usuarios/unidades já vinculados.

********************** OBSERVAÇÕES *************

Sequência de métodos para salvar um registro em um grid editável:
1. Ao pressionar o botão de gravar da nova linha, o método private async saveItem(itemRow: Base | IIndexable) do GridComponent é chamado;
2. 



PONTOS A DISCUTIR


- homologação x pactuação (plano de entregas)
- MOD_PENT_EDT_ATV_HOMOL: segundo a IN 24/2023, eventuais ajustes no plano de entregas não enseja nova pactuação
- a própria unidade instituidora pode elaborar o seu plano de entregas, tornando-se também uma unidade de execução, e, nesse caso, ele é dispensado de aprovação pelo superior hierárquico, assim como eventuais ajustes são dispensados de serem comunicados.
- Meta pode ser em quantidade ou percentual
