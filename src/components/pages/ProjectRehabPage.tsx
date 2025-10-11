import type {
  FoodSectionDataPropsType,
  SectionDataPropsType,
} from '@/components/templates/ProjectRehabTemplate';
import ProjectRehabTemplate from '@/components/templates/ProjectRehabTemplate';

interface ProjectRehabPagePropsType {
  data: SectionDataPropsType | undefined;
  foodSectionData: FoodSectionDataPropsType | undefined;
}

const ProjectRehabPage = ({
  data = [],
  foodSectionData = [],
}: ProjectRehabPagePropsType) => {
  return <ProjectRehabTemplate data={data} foodSectionData={foodSectionData} />;
};

export default ProjectRehabPage;
