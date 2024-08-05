import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";
import mockData from "./mockData";

let routes = [
  {
    path: "/",
    element: <App />,
    loader: () => {
      const { users } = mockData.USERS;

      return users[0];
    },
  },
];

const setup = (router) => {
  return {
    user: userEvent.setup(),
    ...render(<RouterProvider router={router} />),
  };
};

afterEach(() => {
  routes = [
    {
      path: "/",
      element: <App />,
      loader: () => {
        const { users } = mockData.USERS;

        return users[0];
      },
    },
  ];
});

describe("Header component", () => {
  it("renders the title link and theme switcher button", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
      initialIndex: 1,
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByRole("link", { name: "Memoirs" })).toBeInTheDocument();
      expect(screen.getByTestId("theme-switcher")).toBeInTheDocument();
    });
  });

  it("check if the theme button renders correctly when user click", async () => {
    routes[0].loader = null;

    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
      initialIndex: 1,
    });

    const { user } = setup(router);

    const button = screen.getByTestId("theme-switcher");
    const themeArray = ["light", "dark", "light", "dark", "light"];

    expect(screen.getByTestId("dark")).toBeInTheDocument();

    await act(async () => {
      await user.click(button);
    });

    expect(screen.getByTestId("light")).toBeInTheDocument();

    for (let i = 0; i < themeArray.length; i += 1) {
      await act(async () => {
        await user.click(button);

        expect(screen.getByTestId(`${themeArray[i]}`)).toBeInTheDocument();
      });
    }
  });

  it("renders the login and sign up link if the user is not authenticated", async () => {
    routes[0].loader = () => null;

    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
      initialIndex: 1,
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByRole("link", { name: "Sign-up" })).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Login" })).toBeInTheDocument();
    });
  });

  it("renders the profile and logout if the user is authenticated", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
      initialIndex: 1,
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByRole("link", { name: "Profile" })).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Logout" }),
      ).toBeInTheDocument();
    });
  });
});
