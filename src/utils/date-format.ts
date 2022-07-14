import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

dayjs.extend(utc)
dayjs.extend(timezone)

// default format pattern
const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss"
const userTimezone = dayjs.tz.guess()

export function formatUtcString(
  utcString: string,
  formatPattern: string = DATE_TIME_FORMAT
) {
  return dayjs.utc(utcString).tz(userTimezone).format(formatPattern)
}
