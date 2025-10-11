import type {
  FoodSectionDataPropsType,
  SectionDataPropsType,
} from '@/components/templates/ProjectRehabTemplate';
import ProjectShelterTemplate from '@/components/templates/ProjectShelterTemplate';

interface ProjectShelterPagePropsType {
  data: SectionDataPropsType | undefined;
  foodSectionData: FoodSectionDataPropsType | undefined;
}

const ProjectShelterPage = ({
  data = [],
  foodSectionData = [],
}: ProjectShelterPagePropsType) => {
  return (
    <ProjectShelterTemplate data={data} foodSectionData={foodSectionData} />
  );
};

export default ProjectShelterPage;
