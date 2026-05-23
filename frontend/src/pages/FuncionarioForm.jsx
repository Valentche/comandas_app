import UniqueValidator, { useFieldValidation } from '../common/UniqueValidator';

// Hook de validação de CPF reutilizável
  const { dialog: cpfDialog, validateField: validateCpf, closeDialog, clearField } = useFieldValidation(funcionarioService, id, 'checkCpfExists');

  // Funções do diálogo de CPF existente
  const handleDialogCancel = () => {
    closeDialog();
    if (clearField) clearField();
    reset((prev) => ({ ...prev, cpf: '' })); // Limpa o campo CPF
  };

  const handleDialogView = (funcionario) => {
    closeDialog();
    navigate(`/funcionario/view/${funcionario.id}`);
  };

  const handleDialogEdit = (funcionario) => {
    closeDialog();
    navigate(`/funcionario/edit/${funcionario.id}`);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      
      if (id) { // Se for edição
        const changedData = {};
        Object.keys(dirtyFields).forEach(key => {
          if (dirtyFields[key]) {
            // Se o campo de CPF ou Telefone sofreu alteração, remove a máscara antes de enviar
            changedData[key] = (key === 'cpf' || key === 'telefone') ? data[key].replace(/\D/g, '') : data[key];
          }
        });

        if (Object.keys(changedData).length === 0) {
          showSnackbar('Nenhuma alteração detectada', 'info');
          return;
        }

        await funcionarioService.update(id, changedData);
        showSnackbar('Funcionário atualizado com sucesso!', 'success');
      } else { // Se for novo cadastro
        // Limpar máscaras antes do envio
        data.cpf = data.cpf.replace(/\D/g, '');
        data.telefone = data.telefone.replace(/\D/g, '');
        await funcionarioService.create(data);
        showSnackbar('Funcionário cadastrado com sucesso!', 'success');
      }
      navigate('/funcionarios'); // Ajuste a rota de destino conforme seu projeto
    } catch (error) {
      showSnackbar('Erro ao salvar funcionário.', 'error');
    } finally {
      setLoading(false);
    }
  };

  {/* Ajuste no Controller do CPF: */}
  <Controller
    name="cpf"
    control={control}
    rules={validationRules.cpf}
    defaultValue=""
    render={({ field }) => (
      <TextField
        {...field}
        disabled={isReadOnly}
        label="CPF"
        fullWidth
        margin="normal"
        error={!!errors.cpf}
        helperText={errors.cpf?.message}
        onChange={(e) => {
          const value = applyCpfMask(e.target.value);
          field.onChange(value);
        }}
        onBlur={() => {
          if (!isReadOnly && field.value) {
            // Remove a máscara antes de validar
            validateCpf(field.value.replace(/\D/g, ''));
          }
        }}
      />
    )}
  />

  {/* No final do arquivo, logo antes de fechar a tag </PageLayout>: */}
  <UniqueValidator
    open={cpfDialog.open}
    onClose={handleDialogCancel}
    existingRecord={cpfDialog.record}
    recordType="funcionário"
    onView={handleDialogView}
    onEdit={handleDialogEdit}
  />