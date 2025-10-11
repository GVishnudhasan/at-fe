import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

type ModalType = {
  children: ReactNode;
  align?: string;
  isFullScreen?: boolean;
  Bgc?: string;
  ZIndex?: string;
  modalBg?: string;
  noBxsh?: boolean;
  noBgBlur?: boolean;
  preventDismissOnInnerTap?: boolean;
  onCloseHandler: (bool: boolean) => void;
  classNames?: string;
  applyAlignClasses?: boolean;
  padding?: string;
  showModal?: boolean;
  animate?: boolean;
  disableInnerScroll?: boolean;
};

const Modal = ({
  children,
  align = 'bottom',
  isFullScreen = false,
  Bgc = 'bg-white',
  ZIndex = 'z-50',
  modalBg = 'bg-black/40',
  noBxsh = false,
  noBgBlur = false,
  preventDismissOnInnerTap = false,
  onCloseHandler,
  classNames = '',
  applyAlignClasses = true,
  padding = 'pb-16',
  showModal = false,
  animate = false,
  disableInnerScroll = false,
}: ModalType) => {
  const router = useRouter();
  const bodyStyleAltered = useRef(false);
  const [selfHideModal, setSelfHideModal] = useState(true);

  const onClose = () => {
    if (onCloseHandler) {
      onCloseHandler(false);
    } else {
      router.back();
    }
  };

  const onInnerTap = (e: React.MouseEvent) => {
    if (preventDismissOnInnerTap) {
      e.stopPropagation();
    }
  };

  useEffect(() => {
    const bodyEl = document.body;
    if (!bodyEl.classList.contains('overflow-hidden')) {
      bodyEl.classList.add('overflow-hidden');
      bodyStyleAltered.current = true;
    }

    return () => {
      if (bodyStyleAltered.current) {
        bodyEl.classList.remove('overflow-hidden');
      }
    };
  }, []);

  useEffect(() => {
    setSelfHideModal(!showModal && animate);
  }, [showModal]);

  let alignClasses = `absolute bottom-0 left-0 w-full`;
  let bxshClass = `shadow-header`;
  if (align === 'top' || align === 'right') {
    alignClasses = `absolute top-0 transition-all duration-600 ease-out-in w-[80%] md:w-[40%] ${
      showModal ? 'left-0' : '-left-[80%] md:-left-[40%]'
    } h-full`;
  } else if (align === 'center') {
    alignClasses = `flex justify-center items-center min-w-[70%] absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]`;
  } else {
    bxshClass = ``;
  }

  if (!noBxsh) {
    alignClasses = `${alignClasses} ${bxshClass}`;
  }

  const fullScreenClasses = isFullScreen ? `h-full` : ``;

  return (
    <div
      onClick={onClose}
      className={`absolute left-0 top-0 h-full w-full ${
        selfHideModal && 'invisible transition-all duration-700 ease-in-out'
      } ${ZIndex} ${modalBg}`}
      style={{ ...(!noBgBlur ? { backdropFilter: 'blur(4px)' } : {}) }}
      aria-hidden="true"
    >
      <div
        className={`${!disableInnerScroll && 'overflow-scroll'} ${padding} ${
          applyAlignClasses ? alignClasses : ''
        } ${fullScreenClasses} ${Bgc} ${classNames}`}
        onClick={onInnerTap}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
