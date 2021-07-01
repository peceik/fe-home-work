import search from "../service/search.js";

/* eslint-disable */

test("id 1, 1번 선택", () => {
  search.initSelectedCount();
  search.setSelectedCount(1);

  expect(search.getSelectedCount(1)).toBe(1);
  expect(search.getSelectedCount(2)).toBe(0);
  expect(search.getSelectedCount(3)).toBe(0);
});

test("id 2, 2번 선택", () => {
  search.initSelectedCount();
  search.setSelectedCount(2);
  search.setSelectedCount(2);

  expect(search.getSelectedCount(2)).toBe(2);
  expect(search.getSelectedCount(1)).toBe(0);
  expect(search.getSelectedCount(3)).toBe(0);
});
