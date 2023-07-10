export const transformDomain = (domain: string) => {
  if (domain.startsWith("www.")) {
    domain = domain.substring(4);
  }

  return domain.replace(/\./g, "-");
};

export const groupByDate = (data: any[], yColumn: string) => {
  return data.map((obj) => ({
    [yColumn]: obj.name,
    day: new Date(obj.time).toLocaleDateString(),
  }));
};

export const sortByDate = (data: any[]) => {
  return data.sort((a, b) => {
    const dateA = new Date(a.day);
    const dateB = new Date(b.day);

    if (dateA < dateB) {
      return -1;
    } else if (dateA > dateB) {
      return 1;
    } else {
      return 0;
    }
  });
};
