import search from "../service/search.js";

/* eslint-disable */

test("filter url 너구리", () => {
  const results = search.filter("너구리");
  const resultIds = results.map((item) => item.id);
  console.log(results[0].url);
  expect(resultIds).toContain(1);
  expect(resultIds.length).toBe(1);
  //expect('너구리').toBe('너구리')
  expect(results[0].url).toBe("1.reviewer.name.너구리");
});

test("filter url 인덴트", () => {
  const results = search.filter("인덴트");
  const resultIds = results.map((item) => item.id);
  console.log(results[0].url);
  expect(resultIds).toContain(1);
  expect(resultIds.length).toBe(2);
  expect(results[0].url).toBe("1.mall.name.인덴트");
});

test("filter url 양많음", () => {
  const results = search.filter("양많음");
  const resultIds = results.map((item) => item.id);
  console.log(results[0].url);
  expect(resultIds).toContain(1);
  expect(results[0].url).toBe("1.mall.tags.양많음");
});

test("filter url 호불호", () => {
  const results = search.filter("호불호");
  const resultIds = results.map((item) => item.id);
  console.log(results[0].url);
  expect(resultIds).toContain(1);
  expect(results[0].url).toBe("1.tags.호불호");
});

test("filter url 마샬라", () => {
  const results = search.filter("마샬라");
  const resultIds = results.map((item) => item.id);
  console.log(results[0].url);
  expect(resultIds).toContain(2);
  expect(results[0].url).toBe("2.name.마샬라");
});

test("filter url 음료", () => {
  const results = search.filter("음료");
  const resultIds = results.map((item) => item.id);
  console.log(results[0].url);
  expect(resultIds).toContain(2);
  expect(results[0].url).toBe("2.category.음료");
});

test("filter url 슴슴", () => {
  const results = search.filter("슴슴");
  const resultIds = results.map((item) => item.id);
  console.log(results[0].url);
  //expect(resultIds).toContain(4);
  expect(results[0].url).toBe("4.related.tags.슴슴");
});

test("filter url 막국수", () => {
  const results = search.filter("막국수");
  const resultIds = results.map((item) => item.id);
  console.log(results[0].url);
  //expect(resultIds).toContain(4);
  expect(results[0].url).toBe("4.tags.막국수");
});

test("filter url 자체", () => {
  const results = search.filter("자체");
  const resultIds = results.map((item) => item.id);
  console.log(results[0].url);
  //expect(resultIds).toContain(4);
  expect(results[0].url).toBe("4.parking.content.자체");
});

test("filter url 주소 last", () => {
  const results = search.filter("주소");
  const resultIds = results.map((item) => item.id);
  console.log(results);
  //expect(resultIds).toContain(4);
  expect(results[2].url).toBe("4.mall.location.name.주소");
});

test("filter url 주소 first", () => {
  const results = search.filter("주소");
  console.log(results[0].url);
  //expect(resultIds).toContain(4);
  expect(results[0].url).toBe("1.mall.location.name.주소");
});

test("filter url 민영주차장", () => {
  const results = search.filter("민영주차장");
  console.log(results[0].url);
  //expect(resultIds).toContain(4);
  expect(results[0].url).toBe("3.parking.content.민영주차장");
});

test("filter url indentcorp", () => {
  const results = search.filter("indentcorp");
  console.log(results[0].url);
  //expect(resultIds).toContain(4);
  expect(results[0].url).toBe("3.mall.location.content.indentcorp");
});
