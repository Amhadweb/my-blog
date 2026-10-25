import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DeletePostButton from "./DeletePostButton";

const mockRefresh = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: mockRefresh,
    push: vi.fn(),
  }),
}));

global.confirm = () => true;

describe("DeletePostButton", () => {

    it("должен рендерить кнопку с текстом Удалить", () => {

        render(<DeletePostButton postId="123" />);

        const button = screen.getByText("Удалить");

        expect(button).toBeDefined();
        
    });

    it("должен вызывать API при клике", async () => {
     global.fetch = vi.fn(() => Promise.resolve({ ok: true})) as any;

     render(<DeletePostButton postId="123" />);

     const button = screen.getByText("Удалить");

     fireEvent.click(button);

     await new Promise((resolve) => setTimeout(resolve, 0));

     expect(fetch).toHaveBeenCalledWith("/api/posts/123", {
        method: "DELETE",
     });   

     expect(mockRefresh).toHaveBeenCalled();

    });
})