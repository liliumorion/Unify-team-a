import renderer from "react-test-renderer";

import UserListItem from "..";

jest.mock("@/lib/firebase", () => {
  return {
    app: {}, // Mock app object
    db: {}, // Mock db object
    storage: {}, // Mock storage object
    auth: {}, // Mock auth object
  };
});

it("renders correctly", () => {
  const mockCategories = [{ name: "name", stateKey: "stateKey" }];
  const mockStates = [{ name: "name", stateKey: "stateKey" }];
  const tree = renderer
    .create(<UserListItem categories={mockCategories} states={mockStates} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
