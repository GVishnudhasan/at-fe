import Modal from '@/components/molecules/Modal';

const UploadPopUp = () => {
  return (
    <Modal
      ZIndex="z-200"
      align="center"
      preventDismissOnInnerTap
      onCloseHandler={() => {}}
    >
      <div>Upload</div>
    </Modal>
  );
};

export default UploadPopUp;
