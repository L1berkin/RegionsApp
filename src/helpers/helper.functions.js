export function toUpperCaseFirst(title) {
  if (!title[0]) {
    return title;
  }
  return title[0].toUpperCase() + title.substring(1);
}

export function normalizeRegionName(name = '', type = 0) {
  let normilizeName = name;
  if (type === 2) {
    // Добавляем район, если его нет
    const arr = name.split(' ').filter(el => el === 'район');
    if (arr.length === 0) {
      normilizeName = `${name} район`;
    }
    // Добавляем МО в начало, если его нет
  } else if (type === 3) {
    const arr = name.split(' ').filter(el => el === 'МО');
    if (arr.length === 0) {
      normilizeName = `МО ${name}`;
    }
  }

  return toUpperCaseFirst(normilizeName);
}

export function checkOnDuplicate(regions, type, name, parentName) {
  const normalName = normalizeRegionName(name, type);
  const normalParentName = parentName ? normalizeRegionName(parentName, type - 1) : null;

  const duplicateRegions = regions.filter(el => {
    if (parentName) {
      return el.name === normalName && el.parent.name === normalParentName;
    }

    return el.name === normalName;
  });

  return duplicateRegions.length !== 0;
}
