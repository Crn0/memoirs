import { RouterProvider, createMemoryRouter, defer } from "react-router-dom";
import { describe, it, expect, vi, beforeEach} from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../src/App";
import Posts from "../src/pages/Posts";
import mockData from "./mockData";

const mockLoader = vi.fn();

const routes = [{
    path: "/",
    element: <App />,
    children: [
        {
            index: true,
            loader: mockLoader,
            element: <Posts />,
        },
    ]
}];

beforeEach(() => {
    mockLoader.mockRestore();
});

describe("Blog post lists page", () => {
    it("renders a spinner when the data is fetching", async () => {
        const mockGetPosts = async () => {
            await new Promise(resolve => {
                setTimeout(resolve, 1000);
            });
        
            return new Promise((res, _) => {
                res(mockData.POSTS);
        
            });
        };

        mockLoader.mockImplementation(async () => {
            const promisePosts = mockGetPosts();
        
            return defer({data: promisePosts});
        });

        const router = createMemoryRouter(routes, {
            initialEntries: ["/"],
            initialIndex: 1,
        });

        render(<RouterProvider router={router} />);

        await waitFor(() => {
            expect(screen.getByTestId("spinner")).toBeInTheDocument();
        });
    });

    it("renders the blog posts on a successful fetch(e.g. status code 200)", async () => {
        mockLoader.mockImplementation(() => {
            const posts = new Promise((res, _) => {
                res(mockData.POSTS)
            })
            return defer({data: posts});
        });

        const router = createMemoryRouter(routes, {
            initialEntries: ["/"],
            initialIndex: 1,
        });

        render(<RouterProvider router={router} />);

        await waitFor(() => {
            expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
            expect(screen.getByText("John Doe")).toBeInTheDocument();
            expect(screen.getByText("Jul 26")).toBeInTheDocument();
            expect(screen.getByText("test data")).toBeInTheDocument();
        });
    });

    it("renders an alternate text on a successful fetch but there is no blog posts in the db", async () => {
        mockLoader.mockImplementation(() => {
            const posts = new Promise((res, _) => {
                res([])
            })
            return defer({data: posts});
        });

        const router = createMemoryRouter(routes, {
            initialEntries: ["/"],
            initialIndex: 1,
        });

        render(<RouterProvider router={router} />);

        await waitFor(() => {
            expect(screen.getByText("There are no posts.")).toBeInTheDocument();
        });
    });

    it("renders an error message on a unsuccessful fetch(e.g. status code greater than or equals to 400)", async () => {
        mockLoader.mockImplementation(() => {
            const error = new Promise((res, rej) => {
                rej({
                    error: {
                        message: "server error",
                        code: 503,
                    }
                });
            });

            return defer({ data:  error})
        });

        const router = createMemoryRouter(routes, {
            initialEntries: ["/"],
            initialIndex: 1,
        });

        render(<RouterProvider router={router} />);

        await waitFor(() => {
            expect(screen.getByText("server error")).toBeInTheDocument();
            expect(screen.getByText("503")).toBeInTheDocument();
        });
    });
});