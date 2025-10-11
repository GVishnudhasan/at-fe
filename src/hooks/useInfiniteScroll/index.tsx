import { useEffect, useRef, useState } from 'react';

import type { RowWiseData } from '@/hooks/useDataTableLogics';
import { removeDuplicates } from '@/utils';

type UseInfinteScrollType = {
  tableRowWiseData: RowWiseData[];
  shouldEmptyArray: boolean;
  handlePageIncrement: () => void;
  handleResetRemoveAll: () => void;
};

const useInfinteScroll = ({
  tableRowWiseData = [],
  shouldEmptyArray = false,
  handlePageIncrement = () => {},
  handleResetRemoveAll = () => {},
}: UseInfinteScrollType) => {
  const [tableRow, setTableRow] = useState<RowWiseData[]>([]);
  const tableRef = useRef<HTMLElement | null>(null);
  const isScrollEventAttached = useRef(false);
  const isDataFromScroll = useRef(false);

  const setRef = (ele) => {
    tableRef.current = ele;
  };

  const handleScroll = (e) => {
    const scrollContainer = e.target;
    const remainingScrollHeight =
      scrollContainer.scrollHeight - scrollContainer.scrollTop;

    const isAtBottom = remainingScrollHeight <= scrollContainer.clientHeight;

    if (isAtBottom) {
      handlePageIncrement();
      isDataFromScroll.current = true;
    }
  };

  useEffect(() => {
    if (tableRef.current && !isScrollEventAttached.current) {
      tableRef.current.addEventListener('scroll', handleScroll);
      isScrollEventAttached.current = true;
    }
    return () => {
      if (tableRef.current && isScrollEventAttached.current) {
        tableRef.current.removeEventListener('scroll', handleScroll);
        isScrollEventAttached.current = false;
      }
    };
  }, [handlePageIncrement]);

  useEffect(() => {
    const nextBatch = tableRowWiseData.filter(({ id }) => !!id);
    setTableRow((pd) => {
      return isDataFromScroll.current
        ? removeDuplicates([...pd, ...nextBatch])
        : nextBatch;
    });
  }, [tableRowWiseData]);

  useEffect(() => {
    if (shouldEmptyArray) {
      setTableRow([]);
      handleResetRemoveAll();
    }
  }, [shouldEmptyArray]);

  useEffect(() => {
    isDataFromScroll.current = false;
  }, [tableRow]);

  return {
    tableRow,
    setTableRow,
    setRef,
  };
};

export default useInfinteScroll;
