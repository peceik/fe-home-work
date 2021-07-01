import db from "../asset/db.json";

function isResult(item, key) {
  key = key.toLowerCase();
  const fields = ["name", "category", "content", "tags"];
  // console.log(key, key.length);

  // search pre condition
  if (key.length < 2) {
    return false;
  }
  if (!item) {
    return false;
  }

  const entryKeys = Object.keys(item)
    .sort()
    .reverse();

  //console.log(entryKeys);

  // item.content, category, name
  //   const searched = fields.find((searchField) => {
  //     // console.log("item", item);

  //     if (!Object.prototype.hasOwnProperty.call(item, searchField)) {
  //       return false;
  //     }
  //     if (searchField === "tags") {
  //       return false;
  //     }
  //     return item[searchField].toLowerCase().indexOf(key) > -1;
  //   });

  //   if (searched) {
  //     return true;
  //   }

  //기 검색된 것 외에 내포된 경우
  for (const objKey of entryKeys) {
    const value = item[objKey];

    //name, content, category 검색
    if (
      fields.indexOf(objKey) > -1 &&
      Object.prototype.hasOwnProperty.call(item, objKey) &&
      objKey !== "tags" &&
      item[objKey].toLowerCase().indexOf(key) > -1
    ) {
      return objKey;
    }

    //tag 검색
    // item.tag
    if (
      objKey === "tags" &&
      Object.prototype.hasOwnProperty.call(item, "tags") &&
      item.tags.findIndex((it) => {
        return it.toLowerCase().indexOf(key) > -1;
      }) > -1
    ) {
      return objKey;
    }

    // nest object searching
    if (fields.indexOf(objKey) < 0 && typeof value === "object") {
      // console.log("call recusive ", objKey, key, item.id);
      if (isResult(value, key)) {
        return objKey;
      }
    }
  }

  // console.log('return false', item.id);

  return false;
}

export default {
  filter(key) {
    const items = db;
    const result = items.filter((item) => {
      return isResult(item, key);
    });
    return result;
  },
};
