import { RouterProvider, createMemoryRouter, defer } from "react-router-dom";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";
import Post from "../src/pages/Post";
import mockData from "./mockData";

const postId = mockData.POSTS.posts[0]._id;
const mockRootLoader = vi.fn();
const mockLoader = vi.fn();

const setup = (router) => {
  return {
    user: userEvent.setup(),
    ...render(<RouterProvider router={router} />),
  };
};

const add = (formData) => {
  const mockUser = mockData.USERS.users[1].user;
  const mockComment = {
    author: {
      firstName: mockUser.firstName,
      lastName: mockUser.lastName,
      username: mockUser.username,
      _id: mockUser._id,
    },
    body: formData.get("body"),
    created_at: "2024-07-27T10:21:02.011Z",
    isDeleted: false,
    isReply: false,
    likes: {
      users: [],
      count: 0,
    },
    post: 42,
    replies: [],
    _id: 3,
  };
  const { comments } = mockData.COMMENTS;

  comments.push(mockComment);

  return comments;
};

const destroy = (formData) => {
  const commentId = Number(formData.get("comment-id"));
  const { comments } = mockData.COMMENTS;

  mockData.COMMENTS.comments = comments.filter(
    (comment) => comment._id !== commentId,
  );

  return {};
};

async function action({ request }) {
  try {
    const formData = await request.formData();
    const formId = formData.get("form-id");

    switch (formId) {
      case "ADD_COMMENT":
        return add(formData, request);

      case "DELETE_COMMENT":
        return destroy(formData);

      default:
        throw new Error("Invalid form id");
    }
  } catch (error) {
    return error;
  }
}

const routes = [
  {
    path: "/",
    loader: mockRootLoader,
    element: <App />,
    children: [
      {
        path: "posts/:postId",
        loader: mockLoader,
        action: action,
        element: <Post />,
      },
    ],
  },
];

beforeEach(() => {
  mockRootLoader.mockImplementation(() => null);
});

afterEach(() => {
  mockRootLoader.mockRestore();
  mockLoader.mockRestore();
});

describe("Blog post detail page", () => {
  it("renders a spinner when the data is fetching", async () => {
    const mockGetPost = async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });

      return new Promise((res, _) => {
        res(mockData.POSTS.posts[0]);
      });
    };

    mockLoader.mockImplementation(async () => {
      const promisePost = mockGetPost();

      return defer({ data: promisePost });
    });

    const router = createMemoryRouter(routes, {
      initialEntries: ["/", `/posts/${postId}`],
      initialIndex: 1,
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByTestId("spinner")).toBeInTheDocument();
    });
  });

  it("renders the blog post on a successful fetch(e.g. status code 200)", async () => {
    mockLoader.mockImplementation(() => {
      const post = new Promise((res, _) => {
        const { comments } = mockData.COMMENTS;

        res({
          comments,
          post: mockData.POSTS.posts[0],
        });
      });

      return defer({ data: post });
    });

    const router = createMemoryRouter(routes, {
      initialEntries: ["/", `/posts/${postId}`],
      initialIndex: 1,
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
      expect(
        screen.getByAltText("Cover of test data"),
      ).toBeInTheDocument();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Posted on Jul 26")).toBeInTheDocument();
      expect(screen.getByText("test data")).toBeInTheDocument();
      expect(screen.getByText("hello, i am test post")).toBeInTheDocument();
    });
  });

  it("renders an error message on a unsuccessful fetch(e.g. status code 404)", async () => {
    mockLoader.mockImplementation(() => {
      const error = new Promise((res, rej) => {
        rej({message: "post not found", code: 404});
      });

      return defer({ data: error });
    });

    const router = createMemoryRouter(routes, {
      initialEntries: ["/", `/posts/${postId}`],
      initialIndex: 1,
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.getByText("404")).toBeInTheDocument();
      expect(screen.getByText("post not found")).toBeInTheDocument();
    });
  });

  it("comment form will not render if user is not authenticated", async () => {
    mockLoader.mockImplementation(() => {
      const post = new Promise((res, _) => {
        const { comments } = mockData.COMMENTS;

        res({
          comments,
          post: mockData.POSTS.posts[0],
        });
      });

      return defer({ data: post });
    });

    const router = createMemoryRouter(routes, {
      initialEntries: ["/", `/posts/${postId}`],
      initialIndex: 1,
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(screen.queryByRole("form")).not.toBeInTheDocument();
    });
  });

  it("authenticated user can post an comment", async () => {
    mockRootLoader.mockImplementation(() => {
      return mockData.USERS.users[1];
    });

    mockLoader.mockImplementation(() => {
      const post = new Promise((res, _) => {
        const { comments } = mockData.COMMENTS;

        res({
          comments,
          post: mockData.POSTS.posts[0],
        });
      });

      return defer({ data: post });
    });

    const router = createMemoryRouter(routes, {
      initialEntries: ["/", `/posts/${postId}`],
      initialIndex: 1,
    });

    const { user } = setup(router);

    await waitFor(async () => {
      await user.type(screen.getByRole("textbox"), "Hello, world!");
      await user.click(screen.getByRole("button", { name: "Submit" }));
      await user.clear(screen.getByRole("textbox"));
    });

    await waitFor(() => {
      expect(screen.getByText("Hello, world!")).toBeInTheDocument();
    });
  });

  it("authenticated user can delete their comment", async () => {
    mockRootLoader.mockImplementation(() => {
      return mockData.USERS.users[1];
    });

    mockLoader.mockImplementation(() => {
      const post = new Promise((res, _) => {
        const { comments } = mockData.COMMENTS;

        res({
          comments,
          post: mockData.POSTS.posts[0],
        });
      });

      return defer({ data: post });
    });

    const router = createMemoryRouter(routes, {
      initialEntries: ["/", `/posts/${postId}`],
      initialIndex: 1,
    });

    const { user } = setup(router);

    await waitFor(async () => {
      await user.click(screen.getAllByRole("button", { name: "Delete" })[1]);
    });

    await waitFor(async () => {
      expect(screen.queryByText("Hello, world!")).not.toBeInTheDocument();
    });
  });
});
