import BaseHeading from './BaseHeading';
const Heading1 = ({ children, ...rest }) => (
    <BaseHeading as="h1" fontSize={[3,4,5]} {...props}>
      {children}
    </BaseHeading>
  );
  
  export {Heading1 as H1}
  