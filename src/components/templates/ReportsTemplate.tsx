import PageHeaderSection from '@/components/molecules/PageHeaderSection';
import TableSection from '@/components/molecules/TableSection';
import { reportsDataKeys, reportsHeaders } from '@/utils/tableDataUtils';

type ReportsDataType = {
  id: string;
  metrics: string;
  male: string;
  female: string;
  age20To50: string;
  ageGreaterThan50: string;
  locationInErode: string;
};

interface ReportsType {
  [name: string]: ReportsDataType;
}

export type ReqDatType = ReportsType[];

interface ReportsTemplatePropsType {
  data: ReqDatType;
}

const ReportsTemplate = ({ data = [] }: ReportsTemplatePropsType) => {
  return (
    <div className="mx-auto mt-12 h-full w-[85%] md:w-[95%]">
      <PageHeaderSection pageTitle="Reports" noUpload />
      <TableSection
        tableHeaders={reportsHeaders}
        tableRowWiseData={data}
        tableDataKeys={reportsDataKeys}
        noSelection
      />
    </div>
  );
};

export default ReportsTemplate;
