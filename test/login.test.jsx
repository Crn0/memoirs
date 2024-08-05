import { RouterProvider, createMemoryRouter, defer } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";
import Posts from "../src/pages/Posts";
import Login from "../src/pages/Login";
import mockData from "./mockData";
import localStorage from "../src/helpers/storage/localStorage";

const mockPostsLoader = vi.fn(() => {
  const posts = new Promise((res, _) => {
    res(mockData.POSTS);
  });

  return defer({ data: posts });
});
const mockLoginAction = vi.fn(async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const pwd = formData.get("password");
  const { user } = mockData.USERS.users[1];

  if (email !== user.email || pwd !== user.password) {
    return {
      error: {
        messages: "Invalid email or password",
      },
    };
  }
  return { user, token: crypto.randomUUID() };
});

let setup = (router) => {
  return {
    user: userEvent.setup(),
    ...render(<RouterProvider router={router} />),
  };
};

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        loader: mockPostsLoader,
        element: <Posts />,
      },
      {
        path: "login",
        action: mockLoginAction,
        element: <Login />,
      },
    ],
  },
];

beforeEach(() => {
  mockLoginAction.mockRestore();
  mockPostsLoader.mockRestore();
  localStorage.remove("token");
});

describe("Login form page", () => {
  it("renders the login form", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/", "/login"],
      initialIndex: 1,
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("button is disabled the email and password are empty", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/", "/login"],
      initialIndex: 1,
    });

    render(<RouterProvider router={router} />);

    expect(screen.getByLabelText("Email:").value).toBe("");
    expect(screen.getByLabelText("Password:").value).toBe("");
    expect(screen.getByRole("button", { name: "Login" })).toHaveAttribute(
      "disabled",
    );
  });

  it("renders an error message if the user send an invalid email", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/", "/login"],
      initialIndex: 1,
    });

    const { user } = setup(router);

    await user.type(screen.queryByLabelText("Email:"), "abcd@gmail.com");
    await user.type(screen.getByLabelText("Password:"), "1234");
    await user.click(screen.getByRole("button", { name: "Login" }));

    expect(screen.getByText(/Invalid email or password/)).toBeInTheDocument();
  });

  it("renders an error message if the user send an invalid password", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/", "/login"],
      initialIndex: 1,
    });

    const { user } = setup(router);

    await user.type(screen.queryByLabelText("Email:"), "janeD@gmail.com");
    await user.type(screen.getByLabelText("Password:"), "12345");
    await user.click(screen.getByRole("button", { name: "Login" }));

    expect(screen.getByText(/Invalid email or password/)).toBeInTheDocument();
  });

  it("redirect the user on blog posts page on successful login", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/", "/login"],
      initialIndex: 1,
    });

    const { user } = setup(router);

    await user.type(screen.getByLabelText("Email:"), "janeD@example.com");
    await user.type(screen.getByLabelText("Password:"), "1234");
    await user.click(screen.getByRole("button", { name: "Login" }));

    const { posts } = mockData.POSTS;

    posts.map((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
    });
  });
});
