import search from "../service/search.js";

/* eslint-disable */

test("filter 메밀", () => {
  const results = search.filter("메밀");
  const resultIds = results.map((item) => item.id);
  console.log(resultIds);
  expect(resultIds).toContain(1);
  expect(resultIds).toContain(4);
});

test("filter 근처", () => {
  const results = search.filter("근처");
  const resultIds = results.map((item) => item.id);
  console.log(resultIds);
  expect(resultIds).toContain(3);
  expect(resultIds.length).toBe(1);
});

test("filter 자체", () => {
  const results = search.filter("자체");
  const resultIds = results.map((item) => item.id);
  console.log(resultIds);
  expect(resultIds).toContain(4);
  expect(resultIds.length).toBe(1);
});

test("filter 파이", () => {
  const results = search.filter("파이");
  const resultIds = results.map((item) => item.id);
  console.log(resultIds);
  expect(resultIds).toContain(2);
  expect(resultIds).toContain(3);
  expect(resultIds.length).toBe(2);
});

test("filter 드라이브", () => {
  const results = search.filter("드라이브");
  const resultIds = results.map((item) => item.id);
  console.log(resultIds);
  expect(resultIds).toContain(2);
  expect(resultIds.length).toBe(1);
});

test("filter Kayos", () => {
  const results = search.filter("Kayos");
  const resultIds = results.map((item) => item.id);
  console.log(resultIds);
  expect(resultIds).toContain(4);
  expect(resultIds.length).toBe(1);
});

test("filter 음식", () => {
  const results = search.filter("음식");
  const resultIds = results.map((item) => item.id);
  console.log(resultIds);
  expect(resultIds).toContain(4);
  expect(resultIds).toContain(1);
  expect(resultIds.length).toBe(2);
});

test("filter 슴슴", () => {
  const results = search.filter("슴슴");
  const resultIds = results.map((item) => item.id);
  console.log(resultIds);
  expect(resultIds).toContain(4);
  expect(resultIds.length).toBe(1);
});

test("검색어 글자수가 1 filter 음", () => {
  const results = search.filter("음");
  const resultIds = results.map((item) => item.id);
  console.log(resultIds);
  expect(results.length).toBe(0);
});

test("검색어 filter 감칠맛", () => {
  const results = search.filter("감칠맛");
  const resultIds = results.map((item) => item.id);
  console.log(resultIds);
  expect(resultIds).toContain(4);
  expect(results.length).toBe(1);
});

test("검색어 filter 특별시", () => {
  const results = search.filter("특별시");
  const resultIds = results.map((item) => item.id);
  console.log(resultIds);
  expect(resultIds).toContain(4);
  expect(resultIds).toContain(1);
  expect(results.length).toBe(2);
});

test("검색어 filter 너구리", () => {
  const results = search.filter("너구리");
  const resultIds = results.map((item) => item.id);
  console.log(resultIds);
  expect(resultIds).toContain(1);
  expect(results.length).toBe(1);
});

test("검색어 filter 호불호", () => {
  const results = search.filter("호불호");
  const resultIds = results.map((item) => item.id);
  console.log(resultIds);
  expect(resultIds).toContain(1);
  expect(results.length).toBe(1);
});

test("검색어 filter nope", () => {
  const results = search.filter("nope");
  const resultIds = results.map((item) => item.id);
  console.log(resultIds);
  expect(resultIds).toContain(2);
  expect(results.length).toBe(1);
});

test("검색어 filter 저트", () => {
  const results = search.filter("저트");
  const resultIds = results.map((item) => item.id);
  console.log(resultIds);
  expect(resultIds).toContain(3);
  expect(results.length).toBe(1);
});

test("검색어 filter 주소", () => {
  const results = search.filter("주소");
  const resultIds = results.map((item) => item.id);
  console.log(resultIds);
  expect(resultIds).toContain(1);
  expect(resultIds).toContain(2);
  expect(resultIds).toContain(4);
  expect(results.length).toBe(3);
});

test("검색어 filter 대기열", () => {
  const results = search.filter("대기열");
  const resultIds = results.map((item) => item.id);
  console.log(resultIds);
  expect(resultIds).toContain(4);
  expect(results.length).toBe(1);
});
