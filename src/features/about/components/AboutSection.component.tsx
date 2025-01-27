import AboutSectionContentComponent from "./AboutSectionContent.component";

interface AboutSectionProps {
  title: string;
  content: string;
  children?: React.ReactNode;
}

const AboutSectionComponent = ({
  title,
  content,
  children,
}: AboutSectionProps) => {
  return (
    <div className="md:w-11/12 lg:flex">
      <div className="overflow-hidden max-w-6/12 md:contents">{children}</div>
      <AboutSectionContentComponent title={title} content={content} />
    </div>
  );
};

export default AboutSectionComponent;
