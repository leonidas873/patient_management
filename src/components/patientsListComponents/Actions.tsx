import { FC, useState } from 'react';
import { Button, Modal } from 'antd';
import { useDeletePatient } from '../../api/queries';
import { useNavigate } from 'react-router-dom';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

interface ActionProps {
  id: number;
}

export const DeletePatient: FC<ActionProps> = ({ id }) => {
  const { mutate, isPending } = useDeletePatient();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    mutate(id);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        title={i18next.t('actions.deleteConfirmationTitle')}
        open={open}
        onOk={handleOk}
        confirmLoading={isPending}
        onCancel={handleCancel}
        okText={t('actions.ok')}
        cancelText={t('actions.cancel')}
      >
        <p>{t('actions.deleteConfirmationMessage')}</p>
      </Modal>
      <Button onClick={showModal}>
        {isPending ? t('actions.deleting') : t('actions.delete')}
      </Button>
    </>
  );
};

export const EditPatient: FC<ActionProps> = ({ id }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleEdit = () => {
    navigate(`/edit-patient/${id}`);
  };

  return <Button onClick={handleEdit}>{t('actions.edit')}</Button>;
};
