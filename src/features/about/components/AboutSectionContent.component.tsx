interface AboutSectionContentProps {
  title: string;
  content: string;
}

const AboutSectionContentComponent = ({
  title,
  content,
}: AboutSectionContentProps) => {
  return (
    <div className="max-w-5/12 p-2">
      <p className="text-white">{title}</p>
      <p className="text-gray-400 text-wrap">{content}</p>
    </div>
  );
};

export default AboutSectionContentComponent;
