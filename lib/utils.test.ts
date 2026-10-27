import { truncate } from "./utils";
import { describe, it, expect } from "vitest";

describe("truncate", () => {

    it("должна оставлять короткий текст без изменений", () => {
        const result = truncate("Привет", 10);
        expect(result).toBe("Привет");
    });
    
    it("Должна обрезать длинный текст и ставить многоточие", () => {
        const result = truncate("Привет, мир", 6);
        expect(result).toBe("Привет...");
    });
    
    it("должна возвращать пустую строку, если текст пустой", () => {
        const result = truncate("", 10);
        expect(result).toBe("");
    })
})