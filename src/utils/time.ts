import moment, { Moment } from "moment";

const defaultDateFormatter = "YYYY-MM-DD";
const defaultDateFormatter2 = "YYYY/MM/DD";
const defaultTimeFormatter = "HH:mm:ss";

/**
 * 今天 或 今天往前/往后 推一些天后，格式化后的字符串
 * @param days 往前往后推的天数 0今天 正数往后 负数往前
 * @param formatter 格式
 * @return 格式化后的日期字符串
 */
export function getSomeDaysFromToday(
  days: number = 0,
  formatter: string = defaultDateFormatter
): string {
  return moment().add(days, "days").format(formatter);
}

enum Month {
  JAR,
  FEB,
  MAR,
  APR,
  MAY,
  JUN,
  JUL,
  AUG,
  SEPT,
  OCT,
  NOV,
  DEC,
}

/**
 * 获取给定月份（0-11）的第一天格式化后的字符串
 * @param month
 * @param formatter
 * @return 格式化后的日期字符串
 */
export function getStartOfSomeMonth(
  month: Month = moment().month(),
  formatter: string = defaultDateFormatter
): string {
  return moment().month(month).startOf("month").format(formatter);
}

/**
 * 获取给定月份（0-11）的第一天格式化后的字符串
 * @param month
 * @param formatter
 * @return 格式化后的日期字符串
 */
export function getEndOfSomeMonth(
  month: Month = moment().month(),
  formatter: string = defaultDateFormatter
): string {
  return moment().month(month).endOf("month").format(formatter);
}

export const monthRanges = {
  一月: [moment().month(0).startOf("month"), moment().month(0).endOf("month")],
  二月: [moment().month(1).startOf("month"), moment().month(1).endOf("month")],
  三月: [moment().month(2).startOf("month"), moment().month(2).endOf("month")],
  四月: [moment().month(3).startOf("month"), moment().month(3).endOf("month")],
  五月: [moment().month(4).startOf("month"), moment().month(4).endOf("month")],
  六月: [moment().month(5).startOf("month"), moment().month(5).endOf("month")],
  七月: [moment().month(6).startOf("month"), moment().month(6).endOf("month")],
  八月: [moment().month(7).startOf("month"), moment().month(7).endOf("month")],
  九月: [moment().month(8).startOf("month"), moment().month(8).endOf("month")],
  十月: [moment().month(9).startOf("month"), moment().month(9).endOf("month")],
  十一月: [
    moment().month(10).startOf("month"),
    moment().month(10).endOf("month"),
  ],
  十二月: [
    moment().month(11).startOf("month"),
    moment().month(11).endOf("month"),
  ],
};

export function formatDate(
  date: any = new Date(),
  formatter: string = defaultDateFormatter
) {
  return moment(date).format(formatter);
}

export function formatDate2(
  date: any = new Date(),
  formatter: string = defaultDateFormatter2
) {
  return moment(date).format(formatter);
}

export function getDefaultStartTime(): Moment {
  return moment("00:00:00", defaultTimeFormatter);
}

export function getDefaultEndTime(): Moment {
  return moment("23:59:59", defaultTimeFormatter);
}

/**
 * 时间格式化，精确的时分秒 格式例：2016-5-16 20:09:30
 */
const formatNumber = (n: any) => {
  n = n.toString();
  return n[1] ? n : "0" + n;
};
export function formatTimeExact(stamp: number) {
  var date = new Date(stamp * 1000);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join("-") +
    " " +
    [hour, minute, second].map(formatNumber).join(":")
  );
}
