import { useEffect, useState } from 'react';

import Spinner from '@/components/atoms/Loader/Spinner';
import Modal from '@/components/molecules/Modal';
import { convertObjectToCSV, convertToSQLDate } from '@/utils';

const UploadModal = ({
  onCloseHandler,
  inputList,
  // responseStatus,
  handleFileUpload,
  handleAttachmentsAndImgUpload,
  handleRemoveAll,
}) => {
  // const screenInputsFor = ['approval_status', 'admin_remarks'];
  const imageKeys = ['client_pic', 'pic', 'volunteer_pic', 'attachments'];
  const dateKeys = [
    'outreach_date',
    'rescue_date',
    'admission_date',
    'date_of_abscond',
    'abscond_date',
    'date_of_visit',
    'informer_date',
    'enquire_date',
    'date_of_info',
    'admit_date',
  ];
  const [uploadData, setUploadData] = useState({});
  const [isDataUploading, setIsDataUploading] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isError, setIsError] = useState(false);

  const handleDataChange = (e) => {
    const { name, type } = e.currentTarget;
    let { value } = e.currentTarget;
    if (type === 'date') {
      value = convertToSQLDate(value) || value;
    }
    setErrorData((pd) => ({ ...pd, [name]: !value }));
    setUploadData((pd) => ({ ...pd, [name]: value }));
  };

  const handleFileOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.currentTarget;
    const file = e?.currentTarget.files?.[0];
    setErrorData((pd) => ({ ...pd, [name]: !file }));
    setUploadData((pd) => ({ ...pd, [name]: file }));
  };

  const isInputsValid = (submitData = {}) => {
    let isValid = true;
    const inputWiseError = {};
    Object.keys(submitData)?.forEach((k) => {
      // if (!submitData[k] && !screenInputsFor.includes(k)) {
      if (!submitData[k] && !imageKeys.includes(k)) {
        isValid = false;
      }
      // inputWiseError[k] = !submitData[k] && !screenInputsFor.includes(k);
      inputWiseError[k] = !submitData[k] && !imageKeys.includes(k);
    });
    setErrorData((pd) => ({ ...pd, ...inputWiseError }));
    return isValid;
  };

  const handleSubmit = async () => {
    const submitData = JSON.parse(JSON.stringify(uploadData));
    if (!isInputsValid(uploadData)) {
      setIsError(true);
      return;
    }
    setIsDataUploading(true);

    for (const key of Object.keys(uploadData)) {
      if (imageKeys.includes(key)) {
        try {
          // eslint-disable-next-line no-await-in-loop
          const uploadResponse = await handleAttachmentsAndImgUpload(
            uploadData[key]
          );
          if (uploadResponse?.fileLocation) {
            submitData[key] = uploadResponse?.fileLocation;
          }
        } catch (err) {
          console.error(err);
        }
      }
    }
    setIsError(false);
    const csvData = convertObjectToCSV([submitData]);
    const csvFile = new Blob([csvData], { type: 'text/csv' });
    await handleFileUpload(csvFile);
    setIsDataUploading(false);
    handleRemoveAll();
    // if (!responseStatus?.tableUploadStatus?.isError) {
    onCloseHandler();
    // }
  };

  useEffect(() => {
    setUploadData((pd) => {
      const objWithRequiredKeys = {};
      inputList.forEach(([_, key]) => {
        objWithRequiredKeys[key] = pd[key] || '';
      });

      return { ...pd, ...objWithRequiredKeys };
    });
    setErrorData((pd) => {
      const objWithRequiredKeys = {};
      inputList.forEach(([_, key]) => {
        objWithRequiredKeys[key] = false;
      });
      return { ...pd, ...objWithRequiredKeys };
    });
  }, [inputList]);

  return (
    <Modal
      ZIndex="z-200"
      align="center"
      preventDismissOnInnerTap
      onCloseHandler={onCloseHandler}
      modalBg="transparent"
      classNames="h-[75%] rounded-lg shadow-lg border border-light-gray flex-col"
    >
      <div className="h-full w-full px-4 lg:px-16">
        <div className="w-full p-10 text-center text-2xl font-thick">
          Add New Data
        </div>
        {inputList?.map(([header, key]) => {
          // if (screenInputsFor.includes(key)) return null;

          if (
            key === 'client_pic' ||
            key === 'attachments' ||
            key === 'volunteer_pic' ||
            key === 'pic'
          ) {
            const handleChange = (e) => handleFileOnChange(e);
            return (
              <div key={key} className="mb-6">
                <div className="mb-2 text-sm font-thick">{header}</div>
                <input
                  type="file"
                  className={`w-full rounded-lg  ${
                    errorData[key] ? 'border-2 border-red-600' : ''
                  } p-2 focus:outline-none`}
                  name={key}
                  onChange={handleChange}
                  accept={key === 'attachments' ? 'application/pdf' : 'image/*'}
                />
              </div>
            );
          }

          if (dateKeys.includes(key)) {
            const handleChange = (e) => handleDataChange(e);
            return (
              <div key={key} className="mb-6">
                <div className="mb-2 text-sm font-thick">{header}</div>
                <input
                  type="date"
                  className={`w-full rounded-lg border-2  ${
                    errorData[key] ? 'border-red-600' : 'border-light-blue'
                  } p-2 focus:outline-none`}
                  name={key}
                  onChange={handleChange}
                />
              </div>
            );
          }

          const handleChange = (e) => handleDataChange(e);
          return (
            <div key={key} className="mb-6">
              <div className="mb-2 text-sm font-thick">{header}</div>
              <input
                className={`w-full rounded-lg border-2 ${
                  errorData[key] ? 'border-red-600' : 'border-light-blue'
                } p-2 focus:outline-none`}
                name={key}
                value={uploadData[key] || ''}
                onChange={handleChange}
              />
            </div>
          );
        })}
        <div className="w-full pb-8">
          <button
            className="m-4 flex w-full items-center justify-center bg-blue p-2 text-center font-bold text-white"
            type="button"
            onClick={handleSubmit}
          >
            <div>Submit</div>
            {isDataUploading && (
              <div className="ml-2">
                <Spinner borderColor="border-white/30 border-t-white" />
              </div>
            )}
          </button>
          {isError && (
            <div className="mx-4 text-sm text-red-600">
              Empty Fields are not Allowed!
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default UploadModal;
