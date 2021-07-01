import db from "../asset/db.json";

//function viewResultUrl()
let depths = [];
const _selectedCount = {};

function setSelectedCount(id) {
  //console.log('set _selectedCount', _selectedCount)
  if (Object.prototype.hasOwnProperty.call(_selectedCount, id)) {
    const thisCount = _selectedCount[id];
    _selectedCount[id] = thisCount + 1;
  } else {
    _selectedCount[id] = 1;
  }
}

function initSelectedCount() {
  for (var variableKey in _selectedCount) {
    if (Object.prototype.hasOwnProperty.call(_selectedCount, variableKey)) {
      delete _selectedCount[variableKey];
    }
  }
}

function getSelectedCount(id) {
  //console.log('get _selectedCount', _selectedCount)
  if (!Object.prototype.hasOwnProperty.call(_selectedCount, id)) {
    return 0;
  }
  return _selectedCount[id];
}

function isResult(item, key, isRoot = false) {
  key = key.toLowerCase();
  const fields = ["name", "category", "content", "tags"];
  if (isRoot) {
    depths = [];
  }
  //
  // console.log(key, key.length);

  function makeUrl(propertyName) {
    //console.log('makeurl', isRoot)
    // console.log("make url search", propertyName, depths, key, isRoot);
    if (!isRoot) {
      return propertyName;
    }
    if (depths.length < 1) {
      return `${item.id}.${propertyName}.${key}`;
    }
    //related 의 경우에는 array type의 properties 가 숫자이므로 제거함
    const viewDepths = depths.filter((item) => isNaN(item));
    //const viewDepths = depths;
    return `${item.id}.${viewDepths.join(".")}.${propertyName}.${key}`;
  }

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
    // console.log('objKey', objKey, key, typeof item)
    //name, content, category 검색
    if (
      fields.indexOf(objKey) > -1 &&
      Object.prototype.hasOwnProperty.call(item, objKey) &&
      objKey !== "tags" &&
      item[objKey].toLowerCase().indexOf(key) > -1
    ) {
      return makeUrl(objKey);
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
      //console.log('tags search', objKey, depths, key,isRoot);
      return makeUrl(objKey);
    }

    // nest object searching
    if (fields.indexOf(objKey) < 0 && typeof value === "object") {
      // console.log("call recusive ", objKey, key, value, depths, depths[depths.length-1]);
      //const lastDepthItem = depths[depths.length-1];
      depths.push(objKey);
      const searchedField = isResult(value, key);
      if (searchedField) {
        //console.log('recursive search', searchedField, depths, key, isRoot);
        return makeUrl(searchedField);
      } else {
        depths.splice(-1, 1);
      }
    }
  }

  // console.log('return false', item.id);

  return false;
}

export default {
  filter(key) {
    const items = db;
    const result = items
      .filter((item) => {
        //depths = [];
        return isResult(item, key, true);
      })
      .map((it) => {
        //depths = [];
        const searchUrl = isResult(it, key, true);
        // console.log('searchUrl', searchUrl);
        return {
          id: it.id,
          view: `${it.id}.${it.name}.${it.category}`,
          url: searchUrl,
          count: getSelectedCount(it.id),
        };
      });
    return result;
  },
  isResult,
  setSelectedCount,
  getSelectedCount,
  initSelectedCount
};
