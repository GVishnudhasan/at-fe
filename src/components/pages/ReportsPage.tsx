import type { ReqDatType } from '@/components/templates/ReportsTemplate';
import ReportsTemplate from '@/components/templates/ReportsTemplate';

interface ReportsPagePropsType {
  data: ReqDatType;
}

const ReportsPage = ({ data = [] }: ReportsPagePropsType) => {
  return <ReportsTemplate data={data} />;
};

export default ReportsPage;
