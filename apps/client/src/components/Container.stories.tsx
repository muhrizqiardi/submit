import { Story } from "@ladle/react";
import ContainerComponent from "./Container";

const PlaceholderContent = () => <div className="h-screen bg-red-700"></div>;

export const Container: Story<{
  isUsingContainer: boolean;
}> = ({ isUsingContainer }) => (
  <>
    {isUsingContainer ? (
      <ContainerComponent>
        <PlaceholderContent />
      </ContainerComponent>
    ) : null}
    {!isUsingContainer ? <PlaceholderContent /> : null}
  </>
);

Container.args = {
  isUsingContainer: true,
};
