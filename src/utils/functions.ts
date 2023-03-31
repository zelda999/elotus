const toHoursAndMinutes = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return { hours, minutes };
};

const convertToDate = (dateString: string) => {
  const d = dateString ? dateString.split('-') : [];
  const dat = d[1] + '/' + d[2] + '/' + d[0];
  return dat;
};

export { toHoursAndMinutes, convertToDate };
