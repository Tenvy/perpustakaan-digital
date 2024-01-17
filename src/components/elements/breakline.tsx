type BreaklineProps = {
    className?: string;
    [propName: string]: string | undefined;
  };
  
  const Breakline = ({ className = '', ...others }: BreaklineProps) => {
    return (
      <div
        className={`border-t border-primary-color my-4 mx-4 ${className}`}
        data-testid='breakline'
        {...others}
      ></div>
    );
  };
  
  export default Breakline;