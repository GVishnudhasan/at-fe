import { useEffect, useState } from 'react';

import Img from '@/components/atoms/Img';
import Spinner from '@/components/atoms/Loader/Spinner';

const FieldImgUpload = ({
  isvalNotDefined,
  bodyDataType,
  value,
  extraPayload,
  handleUpdate,
  handleAttachmentsAndImgUpload,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [val, setval] = useState('');
  const [fileToUpload, setFileToUpload] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const handleShowInput = () => setIsEdit(true);
  const handleFileUpload = async (file) => {
    setIsUploading(true);
    try {
      // eslint-disable-next-line no-await-in-loop
      const uploadResponse = await handleAttachmentsAndImgUpload(file);
      if (uploadResponse?.fileLocation) {
        setval(uploadResponse?.fileLocation);
        handleUpdate(uploadResponse?.fileLocation);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };
  const handleSave = async () => {
    if (fileToUpload) {
      await handleFileUpload(fileToUpload);
      setIsEdit(false);
    }
  };
  const handleDiscard = () => {
    setIsEdit(false);
  };
  const handleFileChange = (e) => {
    const file = e?.currentTarget.files?.[0];
    setFileToUpload(file);
  };

  useEffect(() => {
    if (!isvalNotDefined) setval(value);
  }, [isvalNotDefined, value]);

  if (isEdit) {
    return (
      <div>
        <div className="">
          <input
            type="file"
            accept={
              extraPayload?.key === 'attachments'
                ? 'application/pdf'
                : 'image/*'
            }
            onChange={handleFileChange}
          />
        </div>
        <div className="mt-2 flex justify-between">
          <div className="flex items-center">
            <button
              type="button"
              className="mr-2 block text-green no-underline"
              onClick={handleSave}
            >
              Save
            </button>
            {isUploading && (
              <Spinner borderColor="border-blue/30 border-t-blue" />
            )}
          </div>
          <button
            type="button"
            className="text-red-600 no-underline"
            onClick={handleDiscard}
          >
            Discard
          </button>
        </div>
      </div>
    );
  }
  if (val && !Array.isArray(val)) {
    if (bodyDataType === 'image')
      return (
        <Img
          src={val || '/assets/images/ic-default-profile-pic.png'}
          onClickHandler={handleShowInput}
          alt={extraPayload?.name}
          classNames="h-7 w-7 mx-auto cursor-pointer"
          imgClassNames="rounded-full bg-cover"
        />
      );
    if (bodyDataType === 'doc')
      return (
        <div className="flex items-center justify-center">
          <Img
            src="/assets/images/ic-file.png"
            alt="file icon"
            classNames="h-6 w-6 cursor-alias"
            onClickHandler={handleShowInput}
          />
          <a href={val} download>
            <div className="ml-2">View All</div>
          </a>
        </div>
      );
  }
  return (
    <div
      aria-hidden="true"
      onClick={handleShowInput}
      className="cursor-pointer"
    >
      -
    </div>
  );
};

export default FieldImgUpload;
