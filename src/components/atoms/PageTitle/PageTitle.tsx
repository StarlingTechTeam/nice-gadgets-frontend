import './PageTitle.scss';

type PageTitleProps = {
  children: React.ReactNode;
};

const PageTitle = ({ children }: PageTitleProps) => {
  return (
    <div className="page-wrapper">
      <h1 className="page-title text-primary h1">{children}</h1>
    </div>
  );
};

export default PageTitle;
