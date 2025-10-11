import type { JSXElementConstructor, ReactElement } from 'react';
import React, { useEffect, useState } from 'react';

import FilterModal from './FilterModal';
import UploadModal from './UploadModal';

export interface RowWiseData {
  [name: string]: any;
}

type ModalWrapperType = {
  children: ReactElement<string | JSXElementConstructor<any>>;
  tableData: RowWiseData[];
  columnWiseListForFilter: string[][];
  uploadFormInputsWithLabelAndKey: string[][];
  applyFilter: (filter: any) => void;
  handleFileUpload: (file: any) => void;
  handleAttachmentsAndImgUpload: (file: any) => void;
  appliedFilter: string[][];
};

const ModalWrapper: React.FC<ModalWrapperType> = ({
  children,
  tableData,
  columnWiseListForFilter,
  uploadFormInputsWithLabelAndKey,
  appliedFilter,
  applyFilter,
  handleFileUpload,
  handleAttachmentsAndImgUpload,
}: ModalWrapperType) => {
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [removeAll, setRemoveAll] = useState(false);

  const handleRemoveAll = () => setRemoveAll(true);

  const handleResetRemoveAll = () => setRemoveAll(false);

  const handleModalClose = () => {
    setShowFilterModal(false);
  };

  const handleUploadModalClose = () => {
    setShowUploadModal(false);
  };

  const handleModalOpen = () => {
    setShowFilterModal(true);
  };

  const handleUploadModalOpen = () => {
    setShowUploadModal(true);
  };

  useEffect(() => {
    setShowFilterModal(false);
  }, [tableData]);
  return (
    <>
      {React.Children.map(children, (child) =>
        child
          ? React.cloneElement<any>(child, {
              handleModalOpen,
              handleUploadModalOpen,
              removeAll,
              handleRemoveAll,
              handleResetRemoveAll,
            })
          : null
      )}
      {showFilterModal && (
        <FilterModal
          onCloseHandler={handleModalClose}
          optionList={columnWiseListForFilter}
          applyFilter={applyFilter}
          appliedFilter={appliedFilter}
          handleRemoveAll={handleRemoveAll}
        />
      )}
      {showUploadModal && (
        <UploadModal
          onCloseHandler={handleUploadModalClose}
          inputList={uploadFormInputsWithLabelAndKey}
          handleFileUpload={handleFileUpload}
          handleAttachmentsAndImgUpload={handleAttachmentsAndImgUpload}
          handleRemoveAll={handleRemoveAll}
          // responseStatus={responseStatus}
        />
      )}
    </>
  );
};

export default ModalWrapper;
